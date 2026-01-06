# Implementation Plan: In-Memory CLI Todo App

**Feature Branch**: `001-cli-todo-app`  
**Created**: 2026-01-06  
**Status**: Draft  

## Phase 0: Outline & Research

No major research is required for this phase. The technology stack is defined, and the application is a simple CLI. The primary decisions are around project structure, which are outlined in the constitution and this plan.

A `research.md` file has been created to formalize this, but it will be minimal.

## Phase 1: Design & Contracts

### 1. Project Setup
- **Action**: Initialize the project using `uv`.
- **Action**: Create the directory structure within the `todo_app` folder:
    ```
    todo_app/
    ├── __init__.py
    ├── main.py         # Main entry point for the CLI application
    ├── models.py       # Data model for Task
    ├── services.py     # Business logic for task management
    └── cli.py          # CLI interaction logic
    ```
- **Rationale**: This structure separates concerns, making the application easier to understand, maintain, and extend.

### 2. Data Modeling
- **File**: `data-model.md` will be created to document the `Task` model.
- **Action**: Define the `Task` class in `models.py`.
    - `id`: `UUID` (generated via `uuid.uuid4()`)
    - `title`: `str`
    - `description`: `str`
    - `completed`: `bool` (default: `False`)
- **Rationale**: Using `UUID` for IDs ensures uniqueness without requiring a central counter. A class provides a clear structure for the task data.

### 3. Core Functionality Implementation
- **File**: `services.py`
- **Action**: Implement the `TaskService` class to handle all business logic.
    - `add_task(title, description)`: Creates a new task and stores it in an in-memory dictionary.
    - `get_all_tasks()`: Returns a list of all tasks.
    - `get_task_by_id(task_id)`: Retrieves a single task by its ID.
    - `update_task(task_id, title, description)`: Updates an existing task.
    - `delete_task(task_id)`: Deletes a task by its ID.
    - `toggle_task_status(task_id, completed)`: Marks a task as complete or incomplete.
- **Rationale**: This service class encapsulates all the logic for managing tasks, keeping it separate from the CLI.

### 4. CLI Interaction Flow
- **File**: `cli.py`
- **Action**: Implement the `CLI` class.
    - A main loop will prompt the user for commands: `add`, `list`, `update`, `delete`, `complete`, `incomplete`, `exit`.
    - Input from the user will be parsed to call the appropriate methods in the `TaskService`.
    - Clear and concise messages will be printed to the console for success and error scenarios.
- **Rationale**: This class is the user-facing part of the application. It should be simple and intuitive.

### 5. Main Entry Point
- **File**: `main.py`
- **Action**: This file will initialize the `TaskService` and the `CLI`, and start the main CLI loop.
- **Rationale**: This keeps the application's entry point clean and simple.

### 6. Error Handling & Edge Cases
- **Action**: Implement `try-except` blocks in `cli.py` to catch errors from the `services.py` (e.g., `TaskNotFound`).
- **Action**: Add input validation in `cli.py` to handle invalid commands or incorrect arguments.
- **Rationale**: This ensures the application is robust and does not crash on invalid user input.

### 7. Testing & Validation
- **Action**: Manually test each command and scenario outlined in the feature specification.
- **Rationale**: Manual testing is sufficient for this small-scale hackathon project to ensure all requirements are met.

## Phase 2: Implementation

This phase involves writing the code as per the design outlined in Phase 1.

## Phase 3: Pre-release

This phase is not in scope for the initial hackathon deliverable.

## Constitution Check

- **[I. Core CRUD Functionality]**: The plan directly addresses all CRUD operations.
- **[II. Technical Stack & Constraints]**: The plan adheres to Python 3.13+, UV, CLI-only, and in-memory storage.
- **[III. Code Quality & Architecture]**: The proposed project structure ensures separation of concerns, and the plan emphasizes clean code and simplicity.
- **[IV. User Experience (UX)]**: The CLI design focuses on clarity and ease of use.
- **[V. Development Workflow]**: The plan is structured to produce a high-quality deliverable suitable for review.

All gates passed. The plan is consistent with the project constitution.