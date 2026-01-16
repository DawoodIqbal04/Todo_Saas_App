from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

password = "p1"
try:
    hashed_password = pwd_context.hash(password)
    print(f"Hashed password for '{password}': {hashed_password}")
except ValueError as e:
    print(f"Error hashing password: {e}")
