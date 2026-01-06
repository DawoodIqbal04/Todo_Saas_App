from dataclasses import dataclass

@dataclass
class Task:
    title: str
    id: str
    description: str = ""
    completed: bool = False
