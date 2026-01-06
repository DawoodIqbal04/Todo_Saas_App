from .services import TaskService

class CLI:
    def __init__(self):
        self._service = TaskService()

    def _display_menu(self):
        print("\n--- Todo App ---")
        print("1. Add a new task")
        print("2. List all tasks")
        print("3. Update a task")
        print("4. Delete a task")
        print("5. Mark a task as complete")
        print("6. Mark a task as incomplete")
        print("7. Exit")
        print("----------------")

    def run(self):
        while True:
            self._display_menu()
            choice = input("Enter your choice: ")
            if choice == "1":
                self._add_task()
            elif choice == "2":
                self._list_tasks()
            elif choice == "3":
                self._update_task()
            elif choice == "4":
                self._delete_task()
            elif choice == "5":
                self._toggle_status(completed=True)
            elif choice == "6":
                self._toggle_status(completed=False)
            elif choice == "7":
                print("Goodbye!")
                break
            else:
                print("Invalid choice. Please try again.")

    def _add_task(self):
        title = input("Enter title: ")
        description = input("Enter description (optional): ")
        try:
            task = self._service.add_task(title, description)
            print(f"Task '{task.title}' added with ID: {task.id}")
        except ValueError as e:
            print(f"Error: {e}")

    def _list_tasks(self):
        tasks = self._service.get_all_tasks()
        if not tasks:
            print("No tasks found.")
            return
        for task in tasks:
            status = "✓" if task.completed else "✗"
            print(f"[{status}] {task.id} - {task.title}: {task.description}")

    def _update_task(self):
        try:
            task_id = input("Enter task ID to update: ")
            task = self._service.get_task_by_id(task_id)
            if not task:
                print("Task not found.")
                return

            print(f"Updating task: {task.title}")
            new_title = input(f"Enter new title (or press enter to keep '{task.title}'): ")
            new_description = input(f"Enter new description (or press enter to keep '{task.description}'): ")

            updated_task = self._service.update_task(task.id, new_title or task.title, new_description or task.description)
            print(f"Task '{updated_task.title}' updated.")

        except Exception as e:
            print(f"An error occurred: {e}")


    def _delete_task(self):
        task_id = input("Enter task ID to delete: ")
        if self._service.delete_task(task_id):
            print("Task deleted successfully.")
        else:
            print("Task not found.")

    def _toggle_status(self, completed: bool):
        task_id = input(f"Enter task ID to mark as {'complete' if completed else 'incomplete'}: ")
        task = self._service.toggle_task_status(task_id, completed)
        if task:
            print(f"Task '{task.title}' marked as {'complete' if completed else 'incomplete'}.")
        else:
            print("Task not found.")
