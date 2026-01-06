# Research: In-Memory CLI Todo App

## Project Structure

- **Decision**: A simple, separated structure will be used:
    - `main.py`: Entry point
    - `models.py`: Data models
    - `services.py`: Business logic
    - `cli.py`: CLI interaction
- **Rationale**: This structure is a standard and effective way to organize small Python applications. It provides a good balance of separation of concerns without being overly complex for a hackathon project. It also aligns with the "Clean Code & Architecture" principle in the constitution.
- **Alternatives considered**: A single-file application was considered but rejected as it would violate the "separation of concerns" principle and be harder to extend in the future.
