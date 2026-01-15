# Data Model: Task

## Entity: Task

Represents a single to-do item for a user.

### Fields
- **id**: Unique identifier for the task (UUID or integer, primary key).
- **user_id**: Identifier linking the task to its owner (string, indexed).
- **title**: A brief description of the task (string, required).
- **description**: A more detailed explanation of the task (text, optional).
- **completed**: Status indicating if the task is done (boolean, defaults to `false`).
- **created_at**: Timestamp of task creation (timestamp).
- **updated_at**: Timestamp of last task modification (timestamp).

### Data Integrity
- Each task must belong to exactly one user.
- `user_id` will be derived from the authenticated user's JWT.
