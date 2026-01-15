from sqlmodel import create_engine, SQLModel, Session
from contextvars import ContextVar
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise EnvironmentError("DATABASE_URL not set in environment variables.")

engine = create_engine(DATABASE_URL)

# Optional: ContextVar for managing session within request context (e.g., FastAPI dependency)
current_session: ContextVar[Session] = ContextVar('current_session', default=None)

def get_db():
    db = Session(engine)
    current_session.set(db)
    try:
        yield db
    finally:
        db.close()
        current_session.set(None)

def get_current_db_session():
    db = current_session.get()
    if db is None:
        raise RuntimeError("Database session not available in current context.")
    return db
