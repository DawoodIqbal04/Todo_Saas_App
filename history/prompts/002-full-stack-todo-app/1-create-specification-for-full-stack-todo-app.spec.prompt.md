---
id: 1
title: Create Specification for Full-Stack Todo App
stage: spec
date: 2026-01-15
surface: agent
model: gemini-pro
feature: 002-full-stack-todo-app
branch: 001-cli-todo-app
user: unknown
command: /sp.specify
labels: [spec, full-stack]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-full-stack-todo-app/spec.md
 - specs/002-full-stack-todo-app/checklists/requirements.md
tests:
 - none
---

## Prompt

/sp.specify

Define clear, unambiguous technical specifications for **Phase II** of the Todo application, which evolves an existing Phase I Python CLI Todo app into a modern, secure, full-stack, multi-user web application. The specifications must be precise, implementation-oriented, and directly traceable to the given requirements, tech stack, and API contract.
---
## 1. SYSTEM OVERVIEW
The system consists of:
- A **Next.js frontend** responsible for UI and authentication
- A **FastAPI backend** providing RESTful APIs
- A **Neon Serverless PostgreSQL database** for persistent storage
- **JWT-based authentication** using Better Auth

All user actions must be authenticated and scoped strictly to the requesting user.
---
## 2. FRONTEND SPECIFICATION (Next.js 16+)
### 2.1 Framework & Routing
- Use Next.js 16+ with **App Router**
- Implement route-based pages for:
  - Authentication (Sign up / Sign in)
  - Task list
  - Task creation
  - Task update/view

### 2.2 Authentication (Better Auth)
- Configure Better Auth to:
  - Handle user signup and signin
  - Issue **JWT tokens** on successful authentication
  - Set JWT expiry (e.g., 7 days)
- JWT must include:
  - User ID (primary identifier)
  - User email (optional)
  - Expiry timestamp

### 2.3 API Client Behavior
- All API requests to FastAPI must:
  - Include `Authorization: Bearer <JWT>`
  - Use the authenticated user’s ID in the URL path
- Requests without JWT must be blocked at the client level where possible

### 2.4 UI Requirements
- Responsive layout for desktop and mobile
- Clear task status indicators (complete/incomplete)
- Immediate UI feedback on create, update, delete, and toggle actions
- Graceful error handling for auth and API failures
---
## 3. BACKEND SPECIFICATION (FastAPI)
### 3.1 Framework & Structure
- Use FastAPI with modular structure:
  - `models/`
  - `schemas/`
  - `services/`
  - `routes/`
  - `core/` (auth, config, database)

### 3.2 Authentication & JWT Verification
- Implement JWT verification middleware/dependency that:
  - Extracts token from `Authorization` header
  - Verifies token signature using `BETTER_AUTH_SECRET`
  - Decodes token to extract user ID
  - Rejects invalid or expired tokens with `401 Unauthorized`

### 3.3 User Validation Rule
- For every request:
  - JWT user ID **must match** `{user_id}` path parameter
  - Mismatch results in `401 Unauthorized`
  - Backend must never trust frontend-provided user ID alone
---
## 4. API SPECIFICATION
### 4.1 Endpoint Contract (Mandatory)
GET /api/{user_id}/tasks
POST /api/{user_id}/tasks
GET /api/{user_id}/tasks/{id}
PUT /api/{user_id}/tasks/{id}
DELETE /api/{user_id}/tasks/{id}
PATCH /api/{user_id}/tasks/{id}/complete

### 4.2 Endpoint Behavior
- All endpoints require valid JWT
- All database queries must filter by:
  - `task.user_id == authenticated_user_id`
- Attempts to access another user’s task return `404` or `401`
---
## 5. DATABASE SPECIFICATION (Neon PostgreSQL)
### 5.1 ORM
- Use **SQLModel** as ORM

### 5.2 Task Model
- Table: `tasks`
- Fields:
  - `id` (UUID or integer, primary key)
  - `user_id` (string, indexed)
  - `title` (string, required)
  - `description` (text, optional)
  - `completed` (boolean, default: false)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

### 5.3 Data Integrity
- Each task must belong to exactly one user
- User ID is derived from JWT, not client input
---
## 6. DATA FLOW SPECIFICATION
1. User authenticates via frontend
2. Better Auth issues JWT
3. Frontend stores session and JWT
4. Frontend sends API request with JWT
5. FastAPI verifies JWT
6. Backend extracts user ID
7. Backend validates path user ID
8. Database query filtered by user ID
9. Response returned to frontend
---
## 7. ERROR HANDLING SPECIFICATION
- `401 Unauthorized`:
  - Missing JWT
  - Invalid or expired JWT
  - User ID mismatch
- `404 Not Found`:
  - Task does not exist for that user
- `400 Bad Request`:
  - Invalid payload
- Errors must return structured JSON responses
---
## 8. SECURITY REQUIREMENTS
- Stateless backend (JWT only)
- No session sharing between frontend and backend
- No cross-user data exposure
- Secrets stored only in environment variables
- HTTPS assumed in production
---
## 9. MIGRATION FROM PHASE I (CLI)
- Reuse logical concepts from CLI app:
  - Task entity
  - CRUD operations
- Refactor CLI logic into:
  - Database-backed services
  - RESTful endpoints
- CLI-specific input/output must not exist in Phase II
---
## 10. NON-FUNCTIONAL REQUIREMENTS
- Clean, readable, and maintainable code
- Clear separation of concerns
- Production-quality structure
- Ready for extension in future phases
---
## 11. ACCEPTANCE CRITERIA
Phase II is complete when:
- Users can authenticate securely
- Each user sees only their own tasks
- All CRUD endpoints function correctly
- Frontend and backend communicate via JWT-secured APIs
- Data persists in Neon PostgreSQL
- System meets hackathon evaluation standards

## Response snapshot

I have created the specification for the new feature "full-stack-todo-app".
The specification is located at: `specs/002-full-stack-todo-app/spec.md`
The checklist for the specification is at: `specs/002-full-stack-todo-app/checklists/requirements.md`

## Outcome

- ✅ Impact: The specification for the new feature has been created.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - `specs/002-full-stack-todo-app/spec.md` was created.
  - `specs/002-full-stack-todo-app/checklists/requirements.md` was created.
- 🔁 Next prompts: The next step is to create a plan for the new feature.
- 🧠 Reflection: The process of creating the specification was successful, although I had to manually create the files and directories due to issues with the `create-new-feature.ps1` script.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-new-feature.ps1` script was failing with a strange error.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
