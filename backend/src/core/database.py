from sqlmodel import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise EnvironmentError("DATABASE_URL not set in environment variables.")

# Configure the SQLAlchemy engine
# Use connect_args={"check_same_thread": False} for SQLite, but not needed for PostgreSQL
engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    """Creates database tables based on SQLModel metadata."""
    # SQLModel.metadata.create_all(engine) is the standard way to create tables
    # This function should be called once during application startup or migration
    print("Running database creation logic...")
    # In a real application, you might want to use Alembic for migrations
    # For simplicity here, we assume direct table creation might be acceptable for prototype
    # Example: SQLModel.metadata.create_all(engine)
    # This call should be placed where application startup is managed, e.g., in main.py or a startup script.
    pass # Placeholder: Actual table creation logic needs to be integrated into app startup

