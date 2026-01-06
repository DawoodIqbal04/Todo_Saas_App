# Data Model: Task

This document defines the data model for the `Task` entity.

## Entity: Task

Represents a single todo item in the application.

### Fields

| Field         | Type    | Description                                     | Constraints              | Default Value |
|---------------|---------|-------------------------------------------------|--------------------------|---------------|
| `id`          | `UUID`  | A unique identifier for the task.               | Required, auto-generated | N/A           |
| `title`       | `str`   | A short, descriptive title for the task.        | Required, non-empty      | N/A           |
| `description` | `str`   | A more detailed description of the task.        | Optional                 | "" (empty string) |
| `completed`   | `bool`  | The completion status of the task.              | Required                 | `False`       |

### Relationships

None. The `Task` entity is self-contained.

### State Transitions

A `Task` can be in one of two states:
- `incomplete` (`completed=False`)
- `complete` (`completed=True`)

The state can be transitioned from `incomplete` to `complete` and vice-versa.
