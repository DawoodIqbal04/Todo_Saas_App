from typing import List, Optional
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, status # Import HTTPException and status
from datetime import datetime # Import datetime for TaskBase, Task models

from backend.src.models.task import Task, TaskBase # Assuming Task and TaskBase models are defined

class TaskService:
    def __init__(self, db: Session):
        self.db = db

    def create_task(self, task_data: TaskBase, user_id: str) -> Task:
        """
        Creates a new task associated with a user ID.
        """
        try:
            task_dict = task_data.dict()
            task_dict["user_id"] = user_id
            db_task = Task.model_validate(task_dict)
            
            self.db.add(db_task)
            self.db.commit()
            self.db.refresh(db_task)
            return db_task
        except SQLAlchemyError as e:
            self.db.rollback()
            print(f"Database error during task creation: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error during task creation.",
            )
        except Exception as e:
            self.db.rollback()
            print(f"Unexpected error during task creation: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred during task creation.",
            )

    def get_tasks_by_user(self, user_id: str) -> List[Task]:
        """
        Retrieves all tasks belonging to a specific user.
        """
        try:
            statement = select(Task).where(Task.user_id == user_id)
            tasks = self.db.exec(statement).all()
            return tasks
        except SQLAlchemyError as e:
            self.db.rollback()
            print(f"Database error retrieving tasks for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error retrieving tasks.",
            )
        except Exception as e:
            self.db.rollback()
            print(f"Unexpected error retrieving tasks for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred retrieving tasks.",
            )

    def get_task_by_id_and_user(self, task_id: int, user_id: str) -> Optional[Task]:
        """
        Retrieves a specific task by its ID and associates it with a user ID.
        Ensures user owns the task.
        """
        try:
            statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
            task = self.db.exec(statement).first()
            return task
        except SQLAlchemyError as e:
            self.db.rollback()
            print(f"Database error retrieving task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error retrieving task.",
            )
        except Exception as e:
            self.db.rollback()
            print(f"Unexpected error retrieving task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred retrieving task.",
            )

    def update_task(self, task_id: int, user_id: str, task_data: TaskBase) -> Optional[Task]:
        """
        Updates an existing task for a specific user.
        """
        try:
            task = self.get_task_by_id_and_user(task_id=task_id, user_id=user_id)
            if not task:
                return None # Task not found or not owned by user

            update_data = task_data.dict(exclude_unset=True) # Only update fields that are provided
            for key, value in update_data.items():
                setattr(task, key, value)
            
            task.updated_at = datetime.utcnow() # Update timestamp

            self.db.add(task)
            self.db.commit()
            self.db.refresh(task)
            return task
        except SQLAlchemyError as e:
            self.db.rollback()
            print(f"Database error updating task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error updating task.",
            )
        except Exception as e:
            self.db.rollback()
            print(f"Unexpected error updating task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred updating task.",
            )

    def delete_task(self, task_id: int, user_id: str) -> bool:
        """
        Deletes a task for a specific user. Returns True if deleted, False if not found.
        """
        try:
            task = self.get_task_by_id_and_user(task_id=task_id, user_id=user_id)
            if not task:
                return False # Task not found or not owned by user

            self.db.delete(task)
            self.db.commit()
            return True
        except SQLAlchemyError as e:
            self.db.rollback()
            print(f"Database error deleting task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error deleting task.",
            )
        except Exception as e:
            self.db.rollback()
            print(f"Unexpected error deleting task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred deleting task.",
            )

    def toggle_task_completion(self, task_id: int, user_id: str) -> Optional[Task]:
        """
        Toggles the completion status of a task for a specific user.
        """
        try:
            task = self.get_task_by_id_and_user(task_id=task_id, user_id=user_id)
            if not task:
                return None # Task not found or not owned by user

            task.completed = not task.completed # Flip the completion status
            task.updated_at = datetime.utcnow()

            self.db.add(task)
            self.db.commit()
            self.db.refresh(task)
            return task
        except SQLAlchemyError as e:
            self.db.rollback()
            print(f"Database error toggling completion for task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error toggling task completion.",
            )
        except Exception as e:
            self.db.rollback()
            print(f"Unexpected error toggling completion for task {task_id} for user {user_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred toggling task completion.",
            )