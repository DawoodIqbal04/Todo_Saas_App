from typing import Optional
from sqlmodel import Session, select
from ..models.user import User, UserRegister
from passlib.context import CryptContext
from fastapi import HTTPException # Add this import

# Password hashing context
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    statement = select(User).where(User.email == email)
    return db.exec(statement).first()

def create_user(db: Session, user_register: UserRegister) -> User:
    try:
        print("Hashing password...")
        hashed_password = get_password_hash(user_register.password)
        print("Password hashed. Creating user object...")
        user = User(email=user_register.email, hashed_password=hashed_password, fullname=user_register.fullname)
        print(f"User object created: {user}")
        db.add(user)
        print("User added to session.")
        db.commit()
        print("Session committed.")
        db.refresh(user)
        print("User refreshed.")
        return user
    except Exception as e:
        print(f"Error creating user: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error while creating user.")
