<!--
Sync Impact Report:
- Version change: 2.0.0 → 2.0.1
- List of modified principles:
  - All principles were restructured and refined for clarity and detail based on the new input.
- Added sections: 
  - Renamed and reorganized sections to be more explicit (e.g., "Authentication Model", "Database Requirements").
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (No changes needed)
  - ✅ .specify/templates/spec-template.md (No changes needed)
  - ✅ .specify/templates/tasks-template.md (No changes needed)
- Follow-up TODOs: None
-->
# Secure Multi-User Todo Application Constitution

## I. Objective
The primary objective is to upgrade the existing Todo application to support **secure, multi-user operation**. This involves persisting all task data in Neon Serverless PostgreSQL, implementing user authentication via Better Auth, securing the FastAPI backend with JWT verification, and ensuring each user can only access their own tasks.

## II. API Contract (MUST NOT CHANGE)
The following REST API endpoints MUST remain unaltered in their structure:
- `GET /api/{user_id}/tasks`
- `POST /api/{user_id}/tasks`
- `GET /api/{user_id}/tasks/{id}`
- `PUT /api/{user_id}/tasks/{id}`
- `DELETE /api/{user_id}/tasks/{id}`
- `PATCH /api/{user_id}/tasks/{id}/complete`

## III. Authentication Model (MANDATORY)

### Frontend (Next.js + Better Auth)
- Use **Better Auth** for user signup and sign-in.
- The **JWT plugin** in Better Auth MUST be enabled.
- JWTs will be issued upon successful authentication and MUST contain:
  - `user_id` (primary identifier)
  - `email` (optional)
  - An expiry timestamp (e.g., 7 days).
- The JWT MUST be sent with every API request in the `Authorization` header as a Bearer token.

### Backend (FastAPI)
- The backend MUST be treated as **stateless**.
- The backend MUST NOT call the frontend to validate users.
- The backend MUST verify the JWT on **every request**.

## IV. Shared Secret (CRITICAL)
- Both the frontend (for signing) and backend (for verification) MUST use the same secret key.
- This secret MUST be provided via the environment variable: `BETTER_AUTH_SECRET`.

## V. Database Requirements (Neon Serverless PostgreSQL)
- All task data MUST be stored in **Neon Serverless PostgreSQL**.
- A proper ORM layer (e.g., SQLModel) MUST be used for database interactions.
- Each task in the database MUST be linked to a user via a `user_id`.
- All database queries MUST always be scoped to the `user_id` of the authenticated user.

## VI. API Behavior After Auth
- All API endpoints require a **valid JWT**. Requests without a valid JWT MUST be rejected with a `401 Unauthorized` error.
- The backend MUST perform the following steps on every request:
  1. Extract the JWT from the `Authorization` header.
  2. Verify the JWT signature using the `BETTER_AUTH_SECRET`.
  3. Decode the JWT to extract the `user_id`.
  4. Compare the `user_id` from the JWT with the `{user_id}` in the URL path. Mismatches MUST be rejected with a `401 Unauthorized` error.
- All API responses MUST include **only the authenticated user’s data**.

## VII. Security Guarantees
The system MUST guarantee:
- **User Isolation**: Users can only see and manage their own tasks.
- **Stateless Backend**: The backend will not maintain session state between requests.
- **Token Expiry**: JWTs must have a defined expiration time.
- **No Cross-User Access**: Access control must be enforced at both the API gateway and database query levels.

## VIII. Quality & Architecture Rules
- Follow clean code principles and maintain a clear separation of concerns.
- Authentication and authorization logic MUST be centralized and not duplicated across routes.
- Code must be of production quality, ready for review by senior engineers.

## Governance
This constitution is the single source of truth for project-level decisions. All development, code reviews, and architectural discussions must align with these principles. Amendments require documented justification, review, and consensus.

**Version**: 2.0.1 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-26