from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from datetime import timedelta
import os

from backend.src.core.auth import create_access_token, get_current_user_id, verify_user_id_match # Assuming create_access_token will be implemented
from backend.src.core.session import get_db
from backend.src.models.user import UserCreate, User # Assuming User model will be created
from backend.src.services.user_service import get_user_by_email, create_user # Assuming user_service exists

router = APIRouter()

# Placeholder for JWT secret and expiry, though these should ideally be loaded from env
# For simplicity in this placeholder, hardcoded, but actual implementation must use env vars
# BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
# JWT_EXPIRY_DAYS = int(os.getenv("JWT_EXPIRY_DAYS", "7"))

# --- Authentication Endpoints ---

# NOTE: The API contract provided in spec.md does NOT include signup/login endpoints.
# However, functional requirements state users can sign up/in.
# Creating placeholder endpoints here. Actual implementation might differ based on Better Auth integration.

@router.post("/signup", response_model=dict, status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserCreate, # Assuming a Pydantic model UserCreate exists for input
    db: Session = Depends(get_db)
):
    """
    User registration endpoint.
    Creates a new user and returns a JWT token.
    """
    # Check if user already exists
    existing_user = get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    # Create user (requires hashing password, which is not yet implemented)
    # For now, just creating a placeholder user object
    new_user = create_user(db, user_data) # This service function needs to be implemented

    # Create JWT token (This function needs implementation)
    # For now, returning a placeholder token
    access_token_expires = timedelta(days=int(os.getenv("JWT_EXPIRY_DAYS", "7")))
    fake_access_token = create_access_token(
        data={"sub": str(new_user.id)}, expires_delta=access_token_expires
    ) # create_access_token needs to be implemented

    return {"access_token": fake_access_token, "token_type": "bearer", "user_id": str(new_user.id)}

@router.post("/login", response_model=dict)
async def login(
    user_data: UserCreate, # Using same model for simplicity, often a Login model is used
    db: Session = Depends(get_db)
):
    """
    User login endpoint.
    Verifies credentials and returns a JWT token.
    """
    user = get_user_by_email(db, user_data.email)
    if not user or not verify_password(user_data.password, user.hashed_password): # verify_password needs implementation
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create JWT token
    access_token_expires = timedelta(days=int(os.getenv("JWT_EXPIRY_DAYS", "7")))
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    ) # create_access_token needs to be implemented

    return {"access_token": access_token, "token_type": "bearer", "user_id": str(user.id)}

# --- Placeholder functions/models - these need actual implementation ---

# Mock User model for demonstration
class User:
    def __init__(self, id: int, email: str, hashed_password: str):
        self.id = id
        self.email = email
        self.hashed_password = hashed_password

# Mock UserCreate model for input
class UserCreate:
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password

# Mock service functions (need actual implementation)
def get_user_by_email(db: Session, email: str) -> Optional[User]:
    # In a real app, query the database for the user by email
    print(f"Mock: Getting user by email: {email}")
    # Return a dummy user for testing if needed, but actual app should query DB
    return None 

def create_user(db: Session, user_data: UserCreate) -> User:
    # In a real app, hash password and save user to DB
    print(f"Mock: Creating user: {user_data.email}")
    # Return a dummy user object
    new_id = 1 # Placeholder ID
    return User(id=new_id, email=user_data.email, hashed_password="hashed_password_placeholder")

# Mock password verification
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # In a real app, compare plain_password with hashed_password using a secure method
    print(f"Mock: Verifying password for {plain_password}")
    return True # Always true for mock

# Mock token creation function (requires python-jose or similar)
def create_access_token(data: dict, expires_delta: timedelta) -> str:
    # In a real app, use jwt.encode with SECRET_KEY, ALGORITHM, and expiry
    print(f"Mock: Creating access token for data: {data} with expiry: {expires_delta}")
    # Return a dummy token
    return "fake-jwt-token"
