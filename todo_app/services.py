from .models import Task
import random
import string

class TaskService:
    def __init__(self):
        self._tasks = {}

    def _generate_id(self) -> str:
        characters = string.ascii_letters + string.digits
        while True:
            new_id = ''.join(random.choice(characters) for _ in range(4))
            if new_id not in self._tasks:
                return new_id

    def add_task(self, title: str, description: str = "") -> Task:
        if not title:
            raise ValueError("Title cannot be empty.")
        new_id = self._generate_id()
        task = Task(id=new_id, title=title, description=description)
        self._tasks[task.id] = task
        return task

    def get_all_tasks(self) -> list[Task]:
        return list(self._tasks.values())

    def get_task_by_id(self, task_id: str) -> Task | None:
        return self._tasks.get(task_id)

    def update_task(self, task_id: str, title: str, description: str) -> Task | None:
        task = self.get_task_by_id(task_id)
        if task:
            if title:
                task.title = title
            if description is not None:
                task.description = description
            return task
        return None

    def delete_task(self, task_id: str) -> bool:
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

    def toggle_task_status(self, task_id: str, completed: bool) -> Task | None:
        task = self.get_task_by_id(task_id)
        if task:
            task.completed = completed
            return task
        return None
