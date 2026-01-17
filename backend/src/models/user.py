from typing import Optional
from sqlmodel import Field, SQLModel
from uuid import UUID, uuid4

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    fullname: str

class User(UserBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str

class UserRegister(UserBase):
    password: str
    fullname: str

class UserCreate(UserBase):
    hashed_password: str
