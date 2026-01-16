from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from backend.src.core.auth import verify_user_id_match
from backend.src.core.session import get_db
from backend.src.models.task import Task, TaskBase
from backend.src.services.task_service import TaskService

router = APIRouter()

@router.post("/{user_id}/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_input: TaskBase,
    current_user_id: str = Depends(verify_user_id_match),
    db: Session = Depends(get_db)
):
    task_service = TaskService(db=db)
    return task_service.create_task(task_input, current_user_id)

@router.get("/{user_id}/tasks", response_model=List[Task])
async def get_all_tasks(
    user_id: str,
    current_user_id: str = Depends(verify_user_id_match),
    db: Session = Depends(get_db)
):
    task_service = TaskService(db=db)
    return task_service.get_tasks_by_user(current_user_id)

@router.get("/{user_id}/tasks/{id}", response_model=Task)
async def get_task(
    user_id: str,
    id: int,
    current_user_id: str = Depends(verify_user_id_match),
    db: Session = Depends(get_db)
):
    task_service = TaskService(db=db)
    task = task_service.get_task_by_id_and_user(task_id=id, user_id=current_user_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@router.put("/{user_id}/tasks/{id}", response_model=Task)
async def update_task(
    user_id: str,
    id: int,
    task_update: TaskBase,
    current_user_id: str = Depends(verify_user_id_match),
    db: Session = Depends(get_db)
):
    task_service = TaskService(db=db)
    updated_task = task_service.update_task(task_id=id, user_id=current_user_id, task_data=task_update)
    if not updated_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return updated_task

@router.delete("/{user_id}/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    id: int,
    current_user_id: str = Depends(verify_user_id_match),
    db: Session = Depends(get_db)
):
    task_service = TaskService(db=db)
    deleted = task_service.delete_task(task_id=id, user_id=current_user_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

@router.patch("/{user_id}/tasks/{id}/complete", response_model=Task)
async def toggle_task_completion(
    user_id: str,
    id: int,
    current_user_id: str = Depends(verify_user_id_match),
    db: Session = Depends(get_db)
):
    task_service = TaskService(db=db)
    updated_task = task_service.toggle_task_completion(task_id=id, user_id=current_user_id)
    if not updated_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return updated_task
