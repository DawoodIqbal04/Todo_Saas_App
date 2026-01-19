import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, create_engine
from backend.src.main import app
from backend.src.core.session import get_db
from backend.src.models.task import Task, TaskBase
from backend.src.models.user import User # Only import User

# Setup a test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

def create_db_and_tables():
    Task.metadata.create_all(engine)
    User.metadata.create_all(engine) # Ensure User model tables are created

def override_get_db():
    with Session(engine) as session:
        yield session

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(name="client")
def test_client():
    with TestClient(app) as client:
        yield client

@pytest.fixture(name="session")
def session_fixture():
    create_db_and_tables()
    with Session(engine) as session:
        yield session
    Task.metadata.drop_all(engine)
    User.metadata.drop_all(engine)

@pytest.fixture(name="client_authenticated")
def client_authenticated_fixture(session: Session, client: TestClient):
    # Register User 1
    user1_email = "user1@example.com"
    user1_password = "p1"
    response = client.post(
        "/api/auth/signup",
        json={"email": user1_email, "password": user1_password}
    )
    if response.status_code != 201:
        print(f"Signup User 1 failed: {response.status_code} - {response.json()}")
    assert response.status_code == 201

    # Log in User 1
    response = client.post(
        "/api/auth/login",
        json={"email": user1_email, "password": user1_password}
    )
    assert response.status_code == 200
    user1_token = response.json()["access_token"]
    user1_id = response.json()["user_id"]

    # Register User 2
    user2_email = "user2@example.com"
    user2_password = "p2"
    response = client.post(
        "/api/auth/signup",
        json={"email": user2_email, "password": user2_password}
    )
    assert response.status_code == 201

    # Log in User 2
    response = client.post(
        "/api/auth/login",
        json={"email": user2_email, "password": user2_password}
    )
    assert response.status_code == 200
    user2_token = response.json()["access_token"]
    user2_id = response.json()["user_id"]

    return {
        "client": client,
        "user1_id": user1_id,
        "user1_token": user1_token,
        "user2_id": user2_id,
        "user2_token": user2_token
    }

def test_cross_user_task_access_get(client_authenticated: dict):
    client = client_authenticated["client"]
    user1_id = client_authenticated["user1_id"]
    user1_token = client_authenticated["user1_token"]
    user2_id = client_authenticated["user2_id"]
    user2_token = client_authenticated["user2_token"]

    # User 1 creates a task
    task_data = {"title": "User 1's Task", "description": "This is a task for user 1."}
    response = client.post(
        f"/api/{user1_id}/tasks",
        headers={"Authorization": f"Bearer {user1_token}"},
        json=task_data
    )
    assert response.status_code == 201
    user1_task_id = response.json()["id"]

    # User 2 tries to get User 1's task (should be 404 as not found for user 2)
    response = client.get(
        f"/api/{user2_id}/tasks/{user1_task_id}",
        headers={"Authorization": f"Bearer {user2_token}"}
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Task not found"

    # User 2 tries to get User 1's task with User 1's ID in path (should be 401 due to ID mismatch)
    response = client.get(
        f"/api/{user1_id}/tasks/{user1_task_id}",
        headers={"Authorization": f"Bearer {user2_token}"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "User ID mismatch. Cannot access resources of another user."

def test_cross_user_task_access_update(client_authenticated: dict):
    client = client_authenticated["client"]
    user1_id = client_authenticated["user1_id"]
    user1_token = client_authenticated["user1_token"]
    user2_id = client_authenticated["user2_id"]
    user2_token = client_authenticated["user2_token"]

    # User 1 creates a task
    task_data = {"title": "User 1's Task", "description": "This is a task for user 1."}
    response = client.post(
        f"/api/{user1_id}/tasks",
        headers={"Authorization": f"Bearer {user1_token}"},
        json=task_data
    )
    assert response.status_code == 201
    user1_task_id = response.json()["id"]

    # User 2 tries to update User 1's task (should be 404 as not found for user 2)
    update_data = {"title": "Updated by User 2"}
    response = client.put(
        f"/api/{user2_id}/tasks/{user1_task_id}",
        headers={"Authorization": f"Bearer {user2_token}"},
        json=update_data
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Task not found"

    # User 2 tries to update User 1's task with User 1's ID in path (should be 401 due to ID mismatch)
    response = client.put(
        f"/api/{user1_id}/tasks/{user1_task_id}",
        headers={"Authorization": f"Bearer {user2_token}"},
        json=update_data
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "User ID mismatch. Cannot access resources of another user."

def test_cross_user_task_access_delete(client_authenticated: dict):
    client = client_authenticated["client"]
    user1_id = client_authenticated["user1_id"]
    user1_token = client_authenticated["user1_token"]
    user2_id = client_authenticated["user2_id"]
    user2_token = client_authenticated["user2_token"]

    # User 1 creates a task
    task_data = {"title": "User 1's Task", "description": "This is a task for user 1."}
    response = client.post(
        f"/api/{user1_id}/tasks",
        headers={"Authorization": f"Bearer {user1_token}"},
        json=task_data
    )
    assert response.status_code == 201
    user1_task_id = response.json()["id"]

    # User 2 tries to delete User 1's task (should be 404 as not found for user 2)
    response = client.delete(
        f"/api/{user2_id}/tasks/{user1_task_id}",
        headers={"Authorization": f"Bearer {user2_token}"}
    )
    assert response.status_code == 404

    # User 2 tries to delete User 1's task with User 1's ID in path (should be 401 due to ID mismatch)
    response = client.delete(
        f"/api/{user1_id}/tasks/{user1_task_id}",
        headers={"Authorization": f"Bearer {user2_token}"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "User ID mismatch. Cannot access resources of another user."

