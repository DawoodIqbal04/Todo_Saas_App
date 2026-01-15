---
id: 2
title: Create Implementation Plan for Full-Stack Todo App
stage: plan
date: 2026-01-15
surface: agent
model: gemini-pro
feature: 002-full-stack-todo-app
branch: 002-full-stack-todo-app
user: unknown
command: /sp.plan
labels: [plan, full-stack]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
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

/sp.plan 

Create a detailed, execution-ready plan for **Phase II** of the project:
converting an existing **Phase I Python CLI Todo application** into a **modern,
full-stack, multi-user web application** using the specified tech stack.

The plan must clearly reflect the migration from a CLI-based, in-memory system
to a web-based, persistent, authenticated architecture.

---

## PLANNING OBJECTIVE

Produce a structured, step-by-step plan that:
- Reuses the conceptual logic of the CLI Todo app
- Refactors it into backend services and REST APIs
- Introduces authentication, persistence, and a frontend UI
- Ensures security, scalability, and clean architecture

---

## CONSTRAINTS & CONTEXT

- Phase I CLI app already exists and is functionally complete
- Phase II must not re-implement logic blindly; it must **evolve** it
- All features must be multi-user and authentication-protected
- Backend must remain stateless (JWT-based auth)

---

## STEP-BY-STEP PLAN

### 1. Phase I Analysis & Extraction
- Review existing CLI app logic and data structures
- Identify reusable components:
  - Task entity
  - CRUD operations
  - Completion toggling
- Separate business logic from CLI-specific input/output

---

### 2. Backend Foundation Setup (FastAPI)
- Initialize FastAPI project structure
- Configure environment variables:
  - `DATABASE_URL`
  - `BETTER_AUTH_SECRET`
- Set up application entry point and routing structure

---

### 3. Database & ORM Integration
- Configure Neon Serverless PostgreSQL connection
- Integrate SQLModel
- Define database-backed `Task` model
- Implement database session management
- Apply schema creation / migrations strategy

---

### 4. Authentication Architecture (JWT)
- Define JWT verification dependency/middleware
- Implement:
  - Token extraction from `Authorization` header
  - Signature verification using shared secret
  - Token decoding and user identity extraction
- Enforce user ID matching between JWT and route params

---

### 5. Refactor CLI Logic into Services
- Convert in-memory task logic into database services
- Implement service functions:
  - Create task
  - List tasks (by user)
  - Get task by ID (scoped)
  - Update task
  - Delete task
  - Toggle completion
- Ensure every query is filtered by authenticated user ID

---

### 6. REST API Implementation
- Implement REST endpoints exactly as specified:
GET /api/{user_id}/tasks
POST /api/{user_id}/tasks
GET /api/{user_id}/tasks/{id}
PUT /api/{user_id}/tasks/{id}
DELETE /api/{user_id}/tasks/{id}
PATCH /api/{user_id}/tasks/{id}/complete
- Protect all routes with JWT authentication
- Return consistent, structured JSON responses

---

### 7. Frontend Foundation Setup (Next.js)
- Initialize Next.js 16+ App Router project
- Configure environment variables for Better Auth
- Establish basic layout and routing structure

---

### 8. Better Auth Configuration
- Integrate Better Auth in frontend
- Enable JWT plugin
- Configure shared secret alignment with backend
- Implement signup and signin flows
- Verify JWT issuance on authentication

---

### 9. Frontend API Client Integration
- Create centralized API client
- Automatically attach JWT token to all requests
- Handle 401 errors globally (redirect to login)
- Ensure `{user_id}` in API paths matches authenticated user

---

### 10. UI Implementation
- Build task list UI with status indicators
- Implement task creation form
- Implement task edit/update UI
- Implement delete and toggle completion actions
- Ensure responsive design

---

### 11. Security Enforcement & Validation
- Validate backend rejects:
- Missing JWT
- Invalid JWT
- User ID mismatches
- Confirm users cannot access others’ tasks
- Test token expiry behavior

---

### 12. End-to-End Testing
- Test full authentication flow
- Verify all CRUD operations
- Validate data persistence across sessions
- Confirm frontend and backend sync correctly

---

### 13. Cleanup & Production Readiness
- Remove any remaining CLI-only code
- Refactor for clarity and maintainability
- Add minimal documentation
- Prepare project for hackathon demo and review

---

## FINAL OUTCOME

A fully functional Phase II system that:
- Successfully transforms a CLI Todo app into a web application
- Supports multiple authenticated users
- Uses JWT-secured REST APIs
- Persists data in Neon PostgreSQL
- Meets all hackathon and evaluation requirements

The plan must be immediately actionable and suitable for future phase
expansion.

## Response snapshot

I have created the implementation plan for the "Full-Stack Todo App" feature.
The plan is located at: `specs/002-full-stack-todo-app/plan.md`
Phase 0 outputs:
- `specs/002-full-stack-todo-app/research.md`
Phase 1 outputs:
- `specs/002-full-stack-todo-app/data-model.md`
- `specs/002-full-stack-todo-app/contracts/openapi.yaml`
- `specs/002-full-stack-todo-app/quickstart.md`
- `GEMINI.md` was updated with new technologies.

## Outcome

- ✅ Impact: A detailed implementation plan has been created.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - `specs/002-full-stack-todo-app/plan.md` was updated.
  - `specs/002-full-stack-todo-app/research.md` was created.
  - `specs/002-full-stack-todo-app/data-model.md` was created.
  - `specs/002-full-stack-todo-app/contracts/openapi.yaml` was created.
  - `specs/002-full-stack-todo-app/quickstart.md` was created.
  - `GEMINI.md` was updated.
- 🔁 Next prompts: The next step is to break down the plan into tasks.
- 🧠 Reflection: The planning process involved extracting information from various sources and consolidating it into a structured plan. The `setup-plan.ps1` script and manual file creation were used to manage artifacts.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
