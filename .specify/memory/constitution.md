<!--
Sync Impact Report:
- Version change: 1.0.0 → 2.0.0
- List of modified principles:
  - Core CRUD Functionality → Functional Requirements
  - Technical Stack & Constraints → API Contract
  - Code Quality & Architecture → Authentication & Security
  - User Experience (UX) → Tech Stack
  - Development Workflow → Architectural Rules
- Added sections: 
  - API Behavior Requirements
  - Quality & Review Standard
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (No changes needed)
  - ✅ .specify/templates/spec-template.md (No changes needed)
  - ✅ .specify/templates/tasks-template.md (No changes needed)
- Follow-up TODOs: None
-->
# Full-Stack Todo Application Constitution

## Core Principles

### I. Functional Requirements
- Users can sign up and sign in via Better Auth
- Each authenticated user can:
  - Create tasks
  - View all their tasks
  - View a single task
  - Update tasks
  - Delete tasks
  - Toggle task completion
- Users must **only access their own tasks**

### II. API Contract (MUST BE PRESERVED)
- GET /api/{user_id}/tasks
- POST /api/{user_id}/tasks
- GET /api/{user_id}/tasks/{id}
- PUT /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH /api/{user_id}/tasks/{id}/complete

### III. Authentication & Security (CRITICAL)
- Better Auth runs on the Next.js frontend
- Better Auth **must issue JWT tokens**
- Frontend must attach JWT tokens to all API requests using:
`Authorization: Bearer <token>`
- FastAPI backend must:
- Verify JWT signature using a shared secret
- Decode JWT to extract authenticated user identity
- Match JWT user ID with `{user_id}` in the request path
- Reject mismatches with `401 Unauthorized`
- JWT secret must be shared via environment variable:
`BETTER_AUTH_SECRET`

### IV. Tech Stack (MANDATORY)
#### Frontend
- Next.js 16+ (App Router)
- Better Auth (JWT enabled)
- Responsive UI

#### Backend
- Python FastAPI
- SQLModel ORM
- JWT verification middleware
- RESTful architecture

#### Database
- Neon Serverless PostgreSQL
- Tasks linked to authenticated users via user ID

### V. Architectural Rules
- Treat the CLI app as a logical prototype; refactor its logic into:
- Models
- Services
- API routes
- Enforce task ownership at **every** database query
- Keep backend stateless (JWT-based auth only)
- Follow clean code and separation of concerns
- Design for extensibility for future phases

### VI. API Behavior Requirements
- All endpoints require valid JWT authentication
- Requests without valid tokens return `401 Unauthorized`
- All responses must be scoped to the authenticated user
- No cross-user data access is permitted

### VII. Quality & Review Standard
- Code must be production-grade and hackathon-ready
- Clear project structure for both frontend and backend
- Security-first mindset
- Readable, maintainable, and well-organized code

## Governance
This constitution is the single source of truth for project-level decisions. All development, code reviews, and architectural discussions must align with these principles. Amendments require documented justification, review, and consensus.

**Version**: 2.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-15
