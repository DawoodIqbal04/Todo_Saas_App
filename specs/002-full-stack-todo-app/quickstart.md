# Quickstart Guide: Full-Stack Todo App

This guide provides the essential steps to get the Full-Stack Todo application running.

## Prerequisites

-   **Backend**: Python 3.13+, Poetry (or pip/venv)
-   **Frontend**: Node.js LTS, npm/yarn
-   **Database**: Neon Serverless PostgreSQL account

## Backend Setup

1.  **Navigate to Backend Directory**:
    ```bash
    cd backend
    ```

2.  **Install Dependencies**:
    ```bash
    # Using Poetry (recommended)
    poetry install

    # Or using pip
    python -m venv .venv
    source .venv/bin/activate # On Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    ```

3.  **Set Environment Variables**:
    Create a `.env` file in the `backend/` directory with the following:
    ```dotenv
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db_name>?sslmode=require"
    BETTER_AUTH_SECRET="your_super_secret_key_for_jwt_signing"
    JWT_EXPIRY_DAYS=7
    ```
    *Replace placeholders with your actual Neon connection details and a strong JWT secret.*

4.  **Run Backend Server**:
    ```bash
    uvicorn src.main:app --reload
    ```
    The backend will typically run on `http://127.0.0.1:8000`.

## Frontend Setup

1.  **Navigate to Frontend Directory**:
    ```bash
    cd ../frontend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Environment Variables**:
    Create a `.env.local` file in the `frontend/` directory with:
    ```dotenv
    NEXT_PUBLIC_API_URL="http://127.0.0.1:8000/api" # Backend API base URL
    BETTER_AUTH_SECRET="your_super_secret_key_for_jwt_signing" # Must match backend secret
    JWT_COOKIE_SECRET="your_secret_for_cookie_signing" # For Next.js cookie security
    JWT_EXPIRY_DAYS=7
    ```
    *Ensure `BETTER_AUTH_SECRET` matches the backend's.*

4.  **Run Frontend Development Server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will typically run on `http://localhost:3000`.

## Workflow

1.  **Sign Up/In**: Use the frontend to sign up or log in via Better Auth.
2.  **Create Tasks**: Add new tasks using the UI.
3.  **Manage Tasks**: View, update, delete, and toggle completion status of your tasks.
4.  **User Isolation**: Verify that you can only see and manage your own tasks.

## Next Steps

-   Deploy the application to Neon and a hosting platform (e.g., Vercel for frontend, Render for backend).
-   Implement additional features as outlined in the specifications.