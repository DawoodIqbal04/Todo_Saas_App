---
id: 3
title: Refine Constitution for Auth and Persistence
stage: constitution
date: 2026-01-26
surface: agent
model: Gemini
feature: auth-and-persistence
branch: 002-full-stack-todo-app
user: "lenovo"
command: /sp.constitution
labels: [constitution, security, database]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:
- "none"
---

## Prompt

/sp.constitution 
You are a senior full-stack engineer and system architect with deep expertise in
Next.js, FastAPI, JWT-based authentication, and PostgreSQL-backed systems.

Your responsibility is to **add authentication and persistence** to an existing
Todo application **without changing the existing REST API contract**, while
ensuring strict multi-user security and clean architecture.


## CONTEXT

The project already contains:
- A working Todo application with defined REST API endpoints
- A FastAPI backend
- A Next.js frontend

This phase introduces:
- **Authentication using Better Auth**
- **Persistent storage using Neon Serverless PostgreSQL**
- **JWT-based request verification**
- **Strict user-level data isolation**

The existing API endpoints **must remain unchanged**.

---

## OBJECTIVE

Upgrade the system to support **secure, multi-user operation** by:
- Persisting all task data in Neon Serverless PostgreSQL
- Implementing user authentication via Better Auth on the frontend
- Securing the FastAPI backend using JWT verification
- Ensuring each user can only access their own tasks

---

## AUTHENTICATION MODEL (MANDATORY)

### Frontend (Next.js + Better Auth)
- Use **Better Auth** for user signup and signin
- Enable the **JWT plugin** in Better Auth
- Issue JWT tokens upon successful authentication
- JWT must contain:
  - User ID (primary identifier)
  - Optional email
  - Expiry timestamp
- JWT must be sent with every API request using:
Authorization: Bearer <JWT>

### Backend (FastAPI)
- Treat the backend as **stateless**
- Do not call the frontend to validate users
- Verify JWT on **every request**
- Decode JWT to extract authenticated user identity


## SHARED SECRET (CRITICAL)

- Both frontend and backend **must use the same secret key**
- Secret must be provided via environment variable:
BETTER_AUTH_SECRET
- This secret is used for:
- JWT signing (frontend)
- JWT verification (backend)

---

## DATABASE REQUIREMENTS (Neon Serverless PostgreSQL)

- All task data must be stored in **Neon Serverless PostgreSQL**
- Use a proper ORM layer (e.g., SQLModel)
- Each task must be linked to a user via `user_id`
- Database queries must always be scoped to the authenticated user


## API CONTRACT (MUST NOT CHANGE)

The following endpoints must remain exactly the same:

GET /api/{user_id}/tasks
POST /api/{user_id}/tasks
GET /api/{user_id}/tasks/{id}
PUT /api/{user_id}/tasks/{id}
DELETE /api/{user_id}/tasks/{id}
PATCH /api/{user_id}/tasks/{id}/complete


## API BEHAVIOR AFTER AUTH

- All endpoints require a **valid JWT**
- Requests without JWT return `401 Unauthorized`
- Backend must:
  - Extract JWT from `Authorization` header
  - Verify JWT signature using `BETTER_AUTH_SECRET`
  - Decode JWT to extract user ID
  - Compare JWT user ID with `{user_id}` in the URL
  - Reject mismatches with `401 Unauthorized`
- All responses must include **only the authenticated user’s data**


## REQUIRED SYSTEM CHANGES

### Better Auth Configuration
- Enable JWT issuance
- Configure token expiry (e.g., 7 days)

### Frontend API Client
- Automatically attach JWT to every API request
- Never allow unauthenticated API calls

### FastAPI Backend
- Add JWT verification middleware or dependency
- Centralize authentication logic
- Enforce task ownership on every operation

### Database Layer
- Persist all tasks in Neon PostgreSQL
- Filter all queries by authenticated `user_id`


## SECURITY GUARANTEES

The system must guarantee:
- **User Isolation**: Users only see their own tasks
- **Stateless Backend**: No shared sessions or callbacks
- **Token Expiry**: JWTs expire automatically
- **No Cross-User Access**: Enforced at API and DB layers


## QUALITY & ARCHITECTURE RULES

- Follow clean code principles
- Maintain separation of concerns
- Avoid duplicating auth logic across routes
- Keep authentication enforcement centralized
- Write production-grade, hackathon-review-ready code


## FINAL EXPECTATION

Deliver a system where:
- Authentication is handled by Better Auth
- Authorization is enforced by FastAPI via JWTs
- Data is persisted in Neon Serverless PostgreSQL
- REST API endpoints remain unchanged
- Every request is secure, scoped, and verifiable

Act as if this system will be reviewed by senior engineers with a strong focus
on **security, correctness, and architectural clarity**.

## Response snapshot

The project constitution has been updated to version 2.0.1 to refine the principles for authentication and data persistence. The document was restructured for clarity, but no dependent templates required changes.

## Outcome

- ✅ Impact: The constitution was updated successfully.
- 🧪 Tests: No tests were run.
- 📁 Files: .specify/memory/constitution.md was modified.
- 🔁 Next prompts: None
- 🧠 Reflection: The user's input was a detailed spec, not a direct set of principles. I was able to extract the principles and merge them into the existing constitution, treating it as a refinement (patch update).

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
