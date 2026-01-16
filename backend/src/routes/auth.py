from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlmodel import Session
from datetime import timedelta
import os

from backend.src.core.auth import create_access_token
from backend.src.core.session import get_db
from backend.src.models.user import UserRegister
from backend.src.services.user_service import get_user_by_email, create_user, verify_password

router = APIRouter()



@router.post("/signup", response_model=dict, status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserRegister = Body(...),
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )
    
    new_user = create_user(db, user_data)
    
    access_token_expires = timedelta(days=int(os.getenv("JWT_EXPIRY_DAYS", "7")))
    access_token = create_access_token(
        data={"sub": str(new_user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user_id": str(new_user.id)}

@router.post("/login", response_model=dict)
async def login(
    user_data: UserRegister = Body(...),
    db: Session = Depends(get_db)
):
    user = get_user_by_email(db, user_data.email)
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(days=int(os.getenv("JWT_EXPIRY_DAYS", "7")))
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "user_id": str(user.id)}
