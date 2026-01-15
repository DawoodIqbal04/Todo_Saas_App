---
id: 3
title: Generate Tasks for Full-Stack Todo App
stage: tasks
date: 2026-01-15
surface: agent
model: gemini-pro
feature: 002-full-stack-todo-app
branch: 002-full-stack-todo-app
user: unknown
command: /sp.tasks
labels: [tasks, full-stack]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-full-stack-todo-app/tasks.md
 - specs/002-full-stack-todo-app/plan.md
 - specs/002-full-stack-todo-app/research.md
 - specs/002-full-stack-todo-app/data-model.md
 - specs/002-full-stack-todo-app/contracts/openapi.yaml
 - specs/002-full-stack-todo-app/quickstart.md
 - GEMINI.md
tests:
 - none
---

## Prompt

/sp.tasks

Create a detailed, execution-ready plan for **Phase II** of the project:
converting an existing **Phase I Python CLI Todo application** into a **modern,
full-stack, multi-user web application** using the specified architecture and tech stack. The tasks must be concrete, execution-focused, and directly map to the given requirements, API contract, and security model. --- ## TASK OBJECTIVE Break Phase II into atomic development tasks that, when completed in sequence, will result in a secure, production-ready, full-stack Todo application with authentication, persistence, and user isolation. --- ## CONTEXT & CONSTRAINTS - Phase I CLI app already exists and works - CLI logic must be **refactored**, not discarded - Backend must be **stateless and JWT-secured** - REST API contract must remain unchanged - Every task must enforce multi-user isolation --- ## ACTIONABLE TASKS ### 1. Analyze & Prepare for Migration - Review existing CLI Todo app codebase - Identify reusable business logic (task CRUD, completion toggle) - Remove or isolate CLI-specific input/output logic - Document mapping from CLI logic → backend services --- ### 2. Backend Project Setup (FastAPI) - Initialize FastAPI project structure - Create core folders (`models`, `schemas`, `services`, `routes`, `core`) - Configure environment variable loading - Set up application entry point --- ### 3. Database Configuration (Neon + SQLModel) - Configure Neon PostgreSQL connection string - Integrate SQLModel with FastAPI - Implement database session management - Verify database connectivity --- ### 4. Define Persistent Task Model - Create SQLModel `Task` model with: - ID - User ID - Title - Description - Completed status - Timestamps - Ensure user ID is indexed - Prepare schema creation or migration logic --- ### 5. JWT Authentication Integration (FastAPI) - Implement JWT verification dependency/middleware - Extract token from `Authorization` header - Verify token using `BETTER_AUTH_SECRET` - Decode token to extract authenticated user ID - Handle expired or invalid tokens gracefully --- ### 6. User Identity Enforcement - Implement logic to compare JWT user ID with `{user_id}` path parameter - Reject mismatches with `401 Unauthorized` - Centralize this check to avoid duplication --- ### 7. Refactor CLI Logic into Backend Services - Convert in-memory CRUD logic into database-backed services - Implement service functions: - Create task (user-scoped) - List tasks by user - Retrieve single task by ID and user - Update task - Delete task - Toggle completion - Ensure every query filters by authenticated user ID --- ### 8. Implement REST API Endpoints - Create API routes matching the exact contract: GET /api/{user_id}/tasks POST /api/{user_id}/tasks GET /api/{user_id}/tasks/{id} PUT /api/{user_id}/tasks/{id} DELETE /api/{user_id}/tasks/{id} PATCH /api/{user_id}/tasks/{id}/complete - Attach JWT authentication dependency to all routes - Return consistent, structured JSON responses - Handle `404`, `400`, and `401` errors correctly --- ### 9. Frontend Project Setup (Next.js) - Initialize Next.js 16+ project using App Router - Configure environment variables - Set up base layout and routing structure --- ### 10. Better Auth Configuration (Frontend) - Install and configure Better Auth - Enable JWT plugin - Configure shared JWT secret - Implement signup and signin flows - Verify JWT issuance on successful login --- ### 11. Frontend API Client Implementation - Create centralized API client utility - Automatically attach JWT token to every request - Inject authenticated user ID into API paths - Handle global `401 Unauthorized` responses --- ### 12. Frontend UI Implementation - Build authenticated task list page - Implement task creation form - Implement task edit/update UI - Implement delete task functionality - Implement toggle completion action - Display task completion status clearly - Ensure responsive design --- ### 13. End-to-End Authentication Validation - Verify frontend sends JWT with every API request - Confirm backend rejects requests without tokens - Validate token expiry behavior - Confirm user ID mismatch is rejected --- ### 14. Multi-User Data Isolation Testing - Create multiple users - Verify each user sees only their own tasks - Attempt cross-user access and confirm failure - Validate database-level isolation via queries --- ### 15. Cleanup & Refactoring - Remove remaining CLI-only artifacts - Refactor for clarity and maintainability - Ensure clean separation of concerns - Add minimal inline documentation --- ### 16. Final Verification & Demo Readiness - Test all CRUD operations end-to-end - Confirm data persistence across sessions - Verify API contract compliance - Prepare project for hackathon review and demo --- ## COMPLETION CRITERIA Phase II is complete when: - CLI app logic is fully migrated to web architecture - All APIs are JWT-secured - Users are authenticated and isolated - Data persists in Neon PostgreSQL - Frontend and backend work seamlessly together - Project meets hackathon evaluation standards The task list must be executable without ambiguity and suitable for professional review.

## Response snapshot

I have generated the implementation tasks for the "Full-Stack Todo App" feature.
The tasks are documented in: `specs/002-full-stack-todo-app/tasks.md`
This includes phases for setup, foundational backend, authentication, CRUD operations (backend and frontend), security, and final verification.

## Outcome

- ✅ Impact: A detailed, actionable task list has been generated.
- 🧪 Tests: No tests were run.
- 📁 Files:
  - `specs/002-full-stack-todo-app/tasks.md` was created.
  - (Implicitly, `plan.md`, `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`, `GEMINI.md` were used/updated in this process)
- 🔁 Next prompts: The next step would be to begin implementation or further analysis.
- 🧠 Reflection: The task generation process successfully broke down the plan into granular, ordered steps, adhering to the specified format and organizing tasks by user story and phase.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
