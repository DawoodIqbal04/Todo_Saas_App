# Tasks: In-Memory CLI Todo App

This document breaks down the implementation of the In-Memory CLI Todo App into actionable tasks, ordered by dependency.

## Phase 1: Setup

- [X] T001 Create the initial project directory structure in `todo_app/`
- [X] T002 Create empty Python files: `todo_app/main.py`, `todo_app/models.py`, `todo_app/services.py`, `todo_app/cli.py`
- [X] T003 Initialize the project with `uv` by creating a `pyproject.toml` file

## Phase 2: Foundational

- [X] T004 [P] Define the `Task` data class in `todo_app/models.py`
- [X] T005 Implement the `TaskService` class in `todo_app/services.py` with an in-memory dictionary for storage

## Phase 3: User Story 1 - Add a Task

**Goal**: As a user, I want to add a new task with a title and description.
**Independent Test**: Run the 'add' command and see the new task when listing all tasks.

- [X] T006 [US1] Implement the `add_task` method in the `TaskService` in `todo_app/services.py`
- [X] T007 [US1] Implement the `add` command in the `CLI` class in `todo_app/cli.py` to get user input and call the service

## Phase 4: User Story 2 - View All Tasks

**Goal**: As a user, I want to see a list of all my tasks.
**Independent Test**: Run the 'list' command and see all tasks that have been added.

- [X] T008 [US2] Implement the `get_all_tasks` method in the `TaskService` in `todo_app/services.py`
- [X] T009 [US2] Implement the `list` command in the `CLI` class in `todo_app/cli.py` to display the tasks

## Phase 5: User Story 3 - Update a Task

**Goal**: As a user, I want to update the title and/or description of an existing task.
**Independent Test**: Run the 'update' command and see the changes reflected when listing the tasks.

- [X] T010 [US3] Implement the `get_task_by_id` and `update_task` methods in the `TaskService` in `todo_app/services.py`
- [X] T011 [US3] Implement the `update` command in the `CLI` class in `todo_app/cli.py`

## Phase 6: User Story 4 - Delete a Task

**Goal**: As a user, I want to delete a task by its ID.
**Independent Test**: Run the 'delete' command and the task is no longer present when listing tasks.

- [X] T012 [US4] Implement the `delete_task` method in the `TaskService` in `todo_app/services.py`
- [X] T013 [US4] Implement the `delete` command in the `CLI` class in `todo_app/cli.py`

## Phase 7: User Story 5 - Mark Task Completion

**Goal**: As a user, I want to mark a task as complete or incomplete.
**Independent Test**: Run the 'complete' or 'incomplete' command and see the status change when listing tasks.

- [X] T014 [US5] Implement the `toggle_task_status` method in the `TaskService` in `todo_app/services.py`
- [X] T015 [US5] Implement the `complete` and `incomplete` commands in the `CLI` class in `todo_app/cli.py`

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T016 Implement the main application loop and menu in `todo_app/main.py` and `todo_app/cli.py`
- [X] T017 Implement error handling for invalid commands and non-existent IDs in `todo_app/cli.py`
- [ ] T018 Review and refactor the code for clarity, consistency, and adherence to the constitution
- [ ] T019 Manually test all features as described in the `quickstart.md`

## Dependencies

- **US2** depends on **US1**
- **US3**, **US4**, **US5** depend on **US2** (to see the result of the action)

## Parallel Execution Examples

- **Within Foundational**: `T004` and `T005` can be worked on in parallel.
- **Across User Stories**: Once the foundational phase is complete, user stories `US3`, `US4`, and `US5` are largely independent and could be worked on in parallel, although they all modify the same `services.py` and `cli.py` files, which would require careful merging.

## Implementation Strategy

The suggested implementation strategy is to follow the phases in order, starting with the setup and foundational tasks. Then, implement each user story one by one, as this will allow for incremental delivery and testing of features. The MVP (Minimum Viable Product) would be the completion of User Stories 1 and 2, which provide the core functionality of adding and viewing tasks.