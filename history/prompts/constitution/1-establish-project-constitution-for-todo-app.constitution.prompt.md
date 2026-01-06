---
id: 1
title: Establish Project Constitution for Todo App
stage: constitution
date: 2026-01-06
surface: agent
model: gemini-cli
feature: none
branch: main
user: unspecified
command: /sp.constitution
labels: [constitution, setup]
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

/sp.constitution You are an expert Python software engineer and system designer.

Your task is to design and implement a clean, maintainable, in-memory
command-line Todo application using Python 3.13+ and UV for execution.

OBJECTIVE
Build a fully functional console-based Todo app that stores all data in memory
(no database, no file persistence) and demonstrates core CRUD functionality.

MANDATORY FEATURES (Basic Level – All Required)
1. Add a task with:
   - Unique ID
   - Title
   - Description
   - Completion status (default: incomplete)
2. View/List all tasks with clear status indicators (Completed / Incomplete)
3. Update an existing task’s title and/or description
4. Delete a task by its ID
5. Mark a task as complete or incomplete

TECHNICAL CONSTRAINTS
- Python 3.13+
- UV for running the application
- Console/CLI only (no GUI, no web)
- In-memory storage only (data resets on restart)

ARCHITECTURAL & CODE QUALITY RULES
- Follow clean code principles (readability, small functions, clear naming)
- Use proper Python project structure (separation of concerns)
- Avoid unnecessary complexity or premature abstractions
- Handle invalid input gracefully (non-existent IDs, empty fields, etc.)
- Code must be easy to extend for future phases

DELIVERABLE EXPECTATION
Produce a working console application that clearly demonstrates:
- Adding tasks
- Listing tasks with status
- Updating tasks
- Deleting tasks by ID
- Toggling completion state

OUTPUT STYLE
- Clear CLI prompts and messages
- Minimal but professional user experience
- Well-structured, idiomatic Python code

Act as if this project will be reviewed by senior engineers in a hackathon setting.

## Response snapshot

Constitution v1.0.0 created and saved to `.specify/memory/constitution.md`.

## Outcome

- ✅ Impact: Established the foundational principles and constraints for the project.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - Modified: `.specify/memory/constitution.md`
  - Created: `history/prompts/constitution/1-establish-project-constitution-for-todo-app.constitution.prompt.md`
- 🔁 Next prompts: The next logical step is to create a feature specification based on this constitution using `/sp.specify`.
- 🧠 Reflection: The constitution provides a clear and solid foundation for the project. It will serve as a guiding document for all subsequent development activities.

## Evaluation notes (flywheel)

- Failure modes observed: The initial attempt to use a shell script to create the PHR failed due to an incorrect path.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Ensure shell script paths are correctly resolved in the future.
