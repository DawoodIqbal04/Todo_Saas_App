from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("BETTER_AUTH_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRY_DAYS", "7")) * 24 * 60 # Default to 7 days * 24 hours * 60 minutes

if not SECRET_KEY:
    raise EnvironmentError("BETTER_AUTH_SECRET not set in environment variables.")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token") # Assuming a token endpoint might exist, though not specified for creation

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user_id(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub") # 'sub' is standard for subject (user ID)
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception
    except Exception as e:
        print(f"Unexpected error during token validation: {e}")
        raise credentials_exception

async def verify_user_id_match(path_user_id: str, current_user_id: str = Depends(get_current_user_id)):
    """
    Verifies that the user ID from the JWT matches the user ID in the path.
    """
    if path_user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID mismatch. Cannot access resources of another user.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user_id

