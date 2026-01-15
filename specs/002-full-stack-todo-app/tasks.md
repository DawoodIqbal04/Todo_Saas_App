# Implementation Tasks: Full-Stack Todo App

**Branch**: `002-full-stack-todo-app` | **Date**: 2026-01-15 | **Plan**: D:\IT Tech\Age of AGENTIC AI\Agentic Projects\GIAIC_Hackathon_02\specs\002-full-stack-todo-app\plan.md
**Spec**: D:\IT Tech\Age of AGENTIC AI\Agentic Projects\GIAIC_Hackathon_02\specs\002-full-stack-todo-app\spec.md

## Summary

A set of ordered, actionable tasks to evolve the Phase I CLI Todo app into a secure, full-stack web application, covering backend API development, frontend UI, authentication, persistence, and user data isolation.

## Total Tasks: 28
## Tasks per User Story:
- **Auth**: 5 tasks
- **Backend CRUD (Create, View All, View Single, Update, Delete, Toggle)**: 18 tasks
- **Security (Data Isolation)**: 3 tasks
- **Frontend UI**: 2 tasks
- **Setup/Foundation**: 5 tasks

## Dependencies & Order

Tasks are organized into phases reflecting a logical, incremental build order. Foundational tasks must precede user story tasks. User stories themselves are not strictly ordered, but priority is implied by their typical implementation flow (Auth first, then basic CRUD, then advanced features).

## Parallel Opportunities

Parallelizable tasks are marked with `[P]` where they involve independent components (e.g., backend API routes vs. frontend components, or different backend services).

## Implementation Strategy

**MVP First**: Focus on completing core authentication and basic CRUD (Create, View All, Toggle) functionalities first, then iterate on Update, Delete, and UI refinements.

## Phases

### Phase 1: Setup & Project Initialization

- [ ] T001 Setup backend project structure (`backend/src/`, `backend/tests/`, etc.)
- [ ] T002 Setup frontend project structure (`frontend/src/`, `frontend/tests/`, etc.)
- [ ] T003 Configure backend environment variables (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `JWT_EXPIRY_DAYS`) in `backend/.env`
- [ ] T004 Configure frontend environment variables (`NEXT_PUBLIC_API_URL`, `BETTER_AUTH_SECRET`, `JWT_COOKIE_SECRET`, `JWT_EXPIRY_DAYS`) in `frontend/.env.local`
- [ ] T005 Verify backend and frontend project initialization and basic configuration.

### Phase 2: Foundational Backend & Auth

- [ ] T006 Configure Neon PostgreSQL connection and integrate SQLModel in `backend/src/core/database.py`
- [ ] T007 Define persistent `Task` model using SQLModel in `backend/src/models/task.py`
- [ ] T008 Implement database session management in `backend/src/core/session.py`
- [ ] T009 Implement JWT verification dependency/middleware in `backend/src/core/auth.py`
- [ ] T010 Implement user ID matching logic between JWT and route parameters in `backend/src/core/auth.py`

### Phase 3: User Story 1 - Authentication Flow

- [ ] T011 [US1] Implement `POST /api/{user_id}/signup` endpoint in `backend/src/routes/auth.py`
- [ ] [P] T012 [US1] Implement `POST /api/{user_id}/login` endpoint in `backend/src/routes/auth.py`
- [ ] [P] T013 [US1] Configure Better Auth in Next.js frontend for signup/signin flows in `frontend/src/app/auth/`
- [ ] [P] T014 [US1] Implement JWT issuance on successful authentication via Better Auth in frontend
- [ ] [P] T015 [US1] Implement frontend logic to store JWT and handle session management

### Phase 4: User Story 2 - Backend CRUD (Create, View All)

- [ ] T016 [US2] Implement `POST /api/{user_id}/tasks` endpoint in `backend/src/routes/tasks.py`
- [ ] [P] T017 [US2] Implement task creation service logic in `backend/src/services/task_service.py`
- [ ] [P] T018 [US3] Implement `GET /api/{user_id}/tasks` endpoint in `backend/src/routes/tasks.py`
- [ ] [P] T019 [US3] Implement list tasks service logic (user-scoped) in `backend/src/services/task_service.py`

### Phase 5: User Story 4, 5, 6 - Backend CRUD (View Single, Update, Delete)

- [ ] T020 [US4] Implement `GET /api/{user_id}/tasks/{id}` endpoint in `backend/src/routes/tasks.py`
- [ ] [P] T021 [US4] Implement get task by ID service logic (user-scoped) in `backend/src/services/task_service.py`
- [ ] [P] T022 [US5] Implement `PUT /api/{user_id}/tasks/{id}` endpoint in `backend/src/routes/tasks.py`
- [ ] [P] T023 [US5] Implement update task service logic in `backend/src/services/task_service.py`
- [ ] [P] T024 [US6] Implement `DELETE /api/{user_id}/tasks/{id}` endpoint in `backend/src/routes/tasks.py`
- [ ] [P] T025 [US6] Implement delete task service logic in `backend/src/services/task_service.py`

### Phase 6: User Story 7 - Backend CRUD (Toggle Completion)

- [ ] T026 [US7] Implement `PATCH /api/{user_id}/tasks/{id}/complete` endpoint in `backend/src/routes/tasks.py`
- [ ] T027 [US7] Implement toggle completion service logic in `backend/src/services/task_service.py`

### Phase 7: User Story 8 - Security & Data Isolation

- [ ] T028 [US8] Enforce user ID matching across all backend service calls and API routes
- [ ] [P] T029 [US8] Implement backend logic to return `404` or `401` for attempts to access unauthorized tasks
- [ ] [P] T030 [US8] Test cross-user access attempts via API and service layers

### Phase 8: Frontend API Integration & UI

- [ ] T031 [P] Implement frontend API client utility to attach JWT and user ID in `frontend/src/services/api.ts`
- [ ] [P] T032 [P] [US1, US3, US4, US5, US6, US7] Build authenticated task list UI, creation, edit, delete, and toggle completion functionality in `frontend/src/app/`

### Phase 9: Final Verification & Cleanup

- [ ] T033 [P] Test full authentication flow (signup, login, logout)
- [ ] [P] T034 [P] Verify all CRUD operations work correctly from frontend to backend
- [ ] [P] T035 [P] Confirm data persistence across sessions
- [ ] T036 Remove any remaining CLI-specific code or artifacts from the codebase
- [ ] T037 Refactor for clarity, maintainability, and adherence to clean code principles
- [ ] T038 Add minimal inline documentation where necessary
- [ ] T039 Prepare project for hackathon demo and review

## Task Generation Rules

**CRITICAL**: Tasks MUST be organized by user story to enable independent implementation and testing.

**Tests are OPTIONAL**: Only generate test tasks if explicitly requested in the feature specification or if user requests TDD approach.

### Checklist Format (REQUIRED)

Every task MUST strictly follow this format:

```text
- [ ] [TaskID] [P?] [Story?] Description with file path
```

**Format Components**:

1.  **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2.  **Task ID**: Sequential number (T001, T002, T003...) in execution order
3.  **[P] marker**: Include ONLY if task is parallelizable (different files, no dependencies on incomplete tasks)
4.  **[Story] label**: REQUIRED for user story phase tasks only
    -   Format: [US1], [US2], [US3], etc. (maps to user stories from spec.md)
    -   Setup phase: NO story label
    -   Foundational phase: NO story label
    -   User Story phases: MUST have story label
    -   Polish phase: NO story label
5.  **Description**: Clear action with exact file path

**Examples**:

-   ✅ CORRECT: `- [ ] T001 Create project structure per implementation plan`
-   ✅ CORRECT: `- [ ] T005 [P] Implement authentication middleware in src/middleware/auth.py`
-   ✅ CORRECT: `- [ ] T012 [P] [US1] Create User model in src/models/user.py`
-   ✅ CORRECT: `- [ ] T014 [US1] Implement UserService in src/services/user_service.py`
-   ❌ WRONG: `- [ ] Create User model` (missing ID and Story label)
-   ❌ WRONG: `T001 [US1] Create model` (missing checkbox)
-   ❌ WRONG: `- [ ] [US1] Create User model` (missing Task ID)
-   ❌ WRONG: `- [ ] T001 [US1] Create model` (missing file path)

### Task Organization

1.  **From User Stories (spec.md)** - PRIMARY ORGANIZATION:
    *   Each user story (P1, P2, P3...) gets its own phase
    *   Map all related components to their story:
        *   Models needed for that story
        *   Services needed for that story
        *   Endpoints/UI needed for that story
        *   If tests requested: Tests specific to that story
    *   Mark story dependencies (most stories should be independent)

2.  **From Contracts**:
    *   Map each contract/endpoint → to the user story it serves
    *   If tests requested: Each contract → contract test task [P] before implementation in that story's phase

3.  **From Data Model**:
    *   Map each entity to the user story(ies) that need it
    *   If entity serves multiple stories: Put in earliest story or Setup phase
    *   Relationships → service layer tasks in appropriate story phase

4.  **From Setup/Infrastructure**:
    *   Shared infrastructure → Setup phase (Phase 1)
    *   Foundational/blocking tasks → Foundational phase (Phase 2)
    *   Story-specific setup → within that story's phase

### Phase Structure

-   **Phase 1**: Setup (project initialization)
-   **Phase 2**: Foundational (blocking prerequisites - MUST complete before user stories)
-   **Phase 3+**: User Stories in priority order (P1, P2, P3...)
    *   Within each story: Tests (if requested) → Models → Services → Endpoints → Integration
    *   Each phase should be a complete, independently testable increment
-   **Final Phase**: Polish & Cross-Cutting Concerns

---

## COMPLETION CRITERIA

Phase II is complete when:
- CLI app logic is fully migrated to web architecture
- All APIs are JWT-secured
- Users are authenticated and isolated
- Data persists in Neon PostgreSQL
- Frontend and backend work seamlessly together
- Project meets hackathon evaluation standards

The task list must be executable without ambiguity and suitable for professional review.
