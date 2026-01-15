from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime # Import datetime for TaskBase, Task models

from backend.src.core.auth import get_current_user_id, verify_user_id_match # Dependency to verify user ID match
from backend.src.core.session import get_db # Database session provider
from backend.src.models.task import Task, TaskBase # Task model
from backend.src.services.task_service import TaskService # Assuming TaskService will be implemented

router = APIRouter()

# --- Task Routes ---

@router.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_input: TaskBase, # Use TaskBase for input as it doesn't require ID or timestamps
    user_id: str = Depends(verify_user_id_match), # Verify user ID from token matches path parameter
    db: Session = Depends(get_db)
):
    """
    Create a new task for the authenticated user.
    """
    task_service = TaskService(db=db)
    try:
        db_task = task_service.create_task(task_input, user_id)
        return db_task
    except HTTPException as e: # Re-raise specific HTTPExceptions from service
        raise e
    except Exception as e:
        print(f"Unexpected error during task creation: {e}") # Log error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during task creation.",
        )

@router.get("/tasks", response_model=List[Task])
async def get_all_tasks(
    user_id: str = Depends(verify_user_id_match), # Verify user ID from token matches path parameter
    db: Session = Depends(get_db)
):
    """
    Get all tasks for the authenticated user.
    """
    task_service = TaskService(db=db)
    try:
        tasks = task_service.get_tasks_by_user(user_id)
        return tasks
    except SQLAlchemyError as e:
        print(f"Database error retrieving tasks: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error retrieving tasks.",
        )
    except Exception as e:
        print(f"Unexpected error retrieving tasks: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred retrieving tasks.",
        )

@router.get("/tasks/{id}", response_model=Task)
async def get_task(
    id: int,
    user_id: str = Depends(verify_user_id_match), # Verify user ID from token matches path parameter
    db: Session = Depends(get_db)
):
    """
    Get a specific task by ID for the authenticated user.
    """
    task_service = TaskService(db=db)
    try:
        task = task_service.get_task_by_id_and_user(task_id=id, user_id=user_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found for this user.",
            )
        return task
    except SQLAlchemyError as e:
        print(f"Database error retrieving task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error retrieving task.",
        )
    except Exception as e:
        print(f"Unexpected error retrieving task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred retrieving task.",
        )

@router.put("/tasks/{id}", response_model=Task)
async def update_task(
    id: int,
    task_update: TaskBase, # Use TaskBase for update input, assuming it contains fields to update
    user_id: str = Depends(verify_user_id_match), # Verify user ID from token matches path parameter
    db: Session = Depends(get_db)
):
    """
    Update an existing task for the authenticated user.
    """
    task_service = TaskService(db=db)
    try:
        updated_task = task_service.update_task(task_id=id, user_id=user_id, task_data=task_update)
        if not updated_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found for this user.",
            )
        return updated_task
    except SQLAlchemyError as e:
        print(f"Database error updating task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error updating task.",
        )
    except Exception as e:
        print(f"Unexpected error updating task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred updating task.",
        )

@router.delete("/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    id: int,
    user_id: str = Depends(verify_user_id_match), # Verify user ID from token matches path parameter
    db: Session = Depends(get_db)
):
    """
    Delete a task for the authenticated user.
    """
    task_service = TaskService(db=db)
    try:
        deleted = task_service.delete_task(task_id=id, user_id=user_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found for this user.",
            )
        # No content to return on successful deletion (204)
    except SQLAlchemyError as e:
        print(f"Database error deleting task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error deleting task.",
        )
    except Exception as e:
        print(f"Unexpected error deleting task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred deleting task.",
        )

@router.patch("/tasks/{id}/complete", response_model=Task)
async def toggle_task_completion(
    id: int,
    user_id: str = Depends(verify_user_id_match), # Verify user ID from token matches path parameter
    db: Session = Depends(get_db)
):
    """
    Toggle the completion status of a task for the authenticated user.
    """
    task_service = TaskService(db=db)
    try:
        updated_task = task_service.toggle_task_completion(task_id=id, user_id=user_id)
        if not updated_task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found for this user.",
            )
        return updated_task
    except SQLAlchemyError as e:
        print(f"Database error toggling completion for task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error toggling task completion.",
        )
    except Exception as e:
        print(f"Unexpected error toggling completion for task {id} for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred toggling task completion.",
        )
