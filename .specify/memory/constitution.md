<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → Core CRUD Functionality
  - [PRINCIPLE_2_NAME] → Technical Stack & Constraints
  - [PRINCIPLE_3_NAME] → Code Quality & Architecture
  - [PRINCIPLE_4_NAME] → User Experience (UX)
  - [PRINCIPLE_5_NAME] → Development Workflow
- Added sections: None
- Removed sections: [SECTION_2_NAME], [SECTION_3_NAME]
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (No changes needed)
  - ✅ .specify/templates/spec-template.md (No changes needed)
  - ✅ .specify/templates/tasks-template.md (No changes needed)
- Follow-up TODOs: None
-->
# In-Memory Command-Line Todo Application Constitution

## Core Principles

### I. Core CRUD Functionality
A task must have a unique ID, title, description, and a completion status (defaulting to incomplete). The application MUST support the following operations:
- **Add:** Create a new task.
- **View/List:** Display all tasks with their status.
- **Update:** Modify an existing task's title and/or description.
- **Delete:** Remove a task by its ID.
- **Toggle:** Mark a task as complete or incomplete.

### II. Technical Stack & Constraints
- **Language:** Python 3.13+
- **Runner:** UV must be used for execution.
- **Interface:** The application is a command-line/console application only. No graphical or web interfaces are permitted.
- **Data Storage:** All data MUST be stored in-memory. Data is lost upon application restart, and no file or database persistence should be implemented.

### III. Code Quality & Architecture
- **Clean Code:** The codebase MUST adhere to clean code principles, including readability, small and focused functions, and clear, descriptive naming conventions.
- **Project Structure:** A proper Python project structure MUST be used to ensure separation of concerns.
- **Simplicity:** Avoid unnecessary complexity and premature abstractions. Follow the "You Ain't Gonna Need It" (YAGNI) principle.
- **Error Handling:** The application MUST gracefully handle invalid user input, such as non-existent IDs or empty fields.
- **Extensibility:** The code MUST be structured in a way that is easy to extend for future feature additions.

### IV. User Experience (UX)
- **Clarity:** All command-line prompts and messages directed to the user MUST be clear and unambiguous.
- **Professionalism:** The user experience should be minimal but professional, providing a straightforward and efficient interface.

### V. Development Workflow
The project MUST be developed and maintained to a high standard, as if it were being reviewed by senior engineers in a hackathon. This principle emphasizes code clarity, thoughtful design, and robust implementation over rapid, un-tested feature delivery.

## Governance
This constitution is the single source of truth for project-level decisions. All development, code reviews, and architectural discussions must align with these principles. Amendments require documented justification, review, and consensus.

**Version**: 1.0.0 | **Ratified**: 2026-01-06 | **Last Amended**: 2026-01-06