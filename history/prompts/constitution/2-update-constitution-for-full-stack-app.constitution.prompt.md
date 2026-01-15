---
id: 2
title: Update Constitution for Full-Stack App
stage: constitution
date: 2026-01-15
surface: agent
model: gemini-pro
feature: 001-cli-todo-app
branch: 001-cli-todo-app
user: unknown
command: /sp.constitution
labels: [constitution, architecture]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution

You are a senior full-stack software architect and Python/TypeScript engineer
with expertise in FastAPI, Next.js App Router, SQLModel, PostgreSQL, and modern
JWT-based authentication systems.

## CONTEXT
Phase I of this project is a completed **in-memory Python CLI Todo application**
implementing full CRUD functionality.  
Phase II requires **converting and evolving** that CLI app into a **modern,
full-stack, multi-user web application** while preserving core Todo behavior and
extending it with persistence, authentication, and a web UI.

The CLI app logic should be treated as the conceptual foundation and refactored
appropriately for a web-based architecture.

## OBJECTIVE
Design and implement a secure, scalable, full-stack Todo application with:
- A RESTful FastAPI backend
- A responsive Next.js frontend
- Multi-user support with strict data isolation
- Persistent storage using Neon Serverless PostgreSQL
- Authentication using Better Auth with JWT verification

## FUNCTIONAL REQUIREMENTS
- Users can sign up and sign in via Better Auth
- Each authenticated user can:
  - Create tasks
  - View all their tasks
  - View a single task
  - Update tasks
  - Delete tasks
  - Toggle task completion
- Users must **only access their own tasks**

## API CONTRACT (MUST BE PRESERVED)
GET /api/{user_id}/tasks
POST /api/{user_id}/tasks
GET /api/{user_id}/tasks/{id}
PUT /api/{user_id}/tasks/{id}
DELETE /api/{user_id}/tasks/{id}
PATCH /api/{user_id}/tasks/{id}/complete

## AUTHENTICATION & SECURITY (CRITICAL)
- Better Auth runs on the Next.js frontend
- Better Auth **must issue JWT tokens**
- Frontend must attach JWT tokens to all API requests using:
Authorization: Bearer <token>
- FastAPI backend must:
- Verify JWT signature using a shared secret
- Decode JWT to extract authenticated user identity
- Match JWT user ID with `{user_id}` in the request path
- Reject mismatches with `401 Unauthorized`
- JWT secret must be shared via environment variable:
BETTER_AUTH_SECRET

## TECH STACK (MANDATORY)
### Frontend
- Next.js 16+ (App Router)
- Better Auth (JWT enabled)
- Responsive UI

### Backend
- Python FastAPI
- SQLModel ORM
- JWT verification middleware
- RESTful architecture

### Database
- Neon Serverless PostgreSQL
- Tasks linked to authenticated users via user ID

## ARCHITECTURAL RULES
- Treat the CLI app as a logical prototype; refactor its logic into:
- Models
- Services
- API routes
- Enforce task ownership at **every** database query
- Keep backend stateless (JWT-based auth only)
- Follow clean code and separation of concerns
- Design for extensibility for future phases

## API BEHAVIOR REQUIREMENTS
- All endpoints require valid JWT authentication
- Requests without valid tokens return `401 Unauthorized`
- All responses must be scoped to the authenticated user
- No cross-user data access is permitted

## QUALITY & REVIEW STANDARD
- Code must be production-grade and hackathon-ready
- Clear project structure for both frontend and backend
- Security-first mindset
- Readable, maintainable, and well-organized code

## OUTPUT EXPECTATION
Deliver a fully working system that:
- Successfully converts the CLI Todo app into a full-stack web application
- Supports multiple users securely
- Demonstrates authentication, persistence, and RESTful APIs
- Is suitable for evaluation by senior engineers

## Response snapshot

I have updated the constitution to version 2.0.0, aligning it with the new requirements for a full-stack web application. The updated constitution includes principles for functional requirements, API contract, authentication and security, tech stack, architectural rules, API behavior, and quality standards.

## Outcome

- ✅ Impact: The project constitution has been updated to reflect the new requirements for a full-stack Todo application.
- 🧪 Tests: No tests were run.
- 📁 Files: .specify/memory/constitution.md was modified.
- 🔁 Next prompts: The next step is to create a specification for the new feature.
- 🧠 Reflection: The constitution was successfully updated to reflect the new requirements. The process of extracting the information from the user's prompt and updating the constitution was straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
