"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToggleSwitch from "@/components/ToggleSwitch";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function TodoPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const router = useRouter();

  const API_URL = process.env.VERCEL_ENV ? "/api" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api");

  const fetchTasks = async () => {
    if (!token || !userId) return;
    try {
      const response = await fetch(`${API_URL}/${userId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        setMessage("Failed to fetch tasks.");
      }
    } catch (error) {
      setMessage(`Error fetching tasks: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const createTask = async () => {
    if (!token || !userId) return;
    try {
      const response = await fetch(`${API_URL}/${userId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDescription }),
      });
      if (response.ok) {
        setNewTaskTitle("");
        setNewTaskDescription("");
        fetchTasks();
      } else {
        setMessage("Failed to create task.");
      }
    } catch (error) {
      setMessage(`Error creating task: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  const toggleTask = async (taskId: number, completed: boolean) => {
    if (!token || !userId) return;
    try {
      const response = await fetch(`${API_URL}/${userId}/tasks/${taskId}/complete`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchTasks();
      } else {
        setMessage("Failed to update task.");
      }
    } catch (error) {
      setMessage(`Error updating task: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleUpdateTask = async () => {
    if (!token || !userId || !editingTask) return;
    try {
      const response = await fetch(`${API_URL}/${userId}/tasks/${editingTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editingTask.title, description: editingTask.description }),
      });
      if (response.ok) {
        setEditingTask(null);
        fetchTasks();
      } else {
        setMessage("Failed to update task.");
      }
    } catch (error) {
      setMessage(`Error updating task: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const deleteTask = async (taskId: number) => {
    if (!token || !userId) return;
    try {
      const response = await fetch(`${API_URL}/${userId}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchTasks();
      } else {
        setMessage("Failed to delete task.");
      }
    } catch (error) {
      setMessage(`Error deleting task: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedFullname = localStorage.getItem("fullname");
    if (storedToken && storedUserId && storedFullname) {
      setToken(storedToken);
      setUserId(storedUserId);
      setFullname(storedFullname);
    } else {
      router.push("/auth");
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black pt-30">
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold text-black uppercase dark:text-white">Welcome Back {fullname || userId} 👋</h1>
          </div>
          <div className="grid gap-6">
            <div className="bg-gray-100 dark:bg-white/15 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Create New Task</h2>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="p-2 border rounded bg-white dark:bg-white/20 text-black dark:text-white w-full"
                />
                <textarea
                  placeholder="Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="p-2 border rounded bg-white dark:bg-white/20 text-black dark:text-white w-full"
                />
                <div className="relative w-full h-10 group overflow-hidden rounded bg-white">

                <button onClick={createTask} className="relatve z-50 transition-all group-hover:text-white font-semibold w-full h-full text-black">
                  Add Task
                </button>
                <div className="absolute transition-all w-full h-full bg-black right-0 rounded-[50%] duration-250 bottom-[-100%] group-hover:rounded-none group-hover:bottom-0 pointer-events-none"></div>
              <div className="absolute w-full h-full bg-orange-500 right-0 rounded-[50%] transition-all duration-500 bottom-[-200%] group-hover:rounded-none group-hover:bottom-0 pointer-events-none"></div>
              <div className="absolute w-full h-full bg-green-600 right-0 rounded-[50%] transition-all duration-750 bottom-[-400%] group-hover:rounded-none group-hover:bottom-0 pointer-events-none"></div>
              <div className="absolute w-full h-full bg-red-600 right-0 rounded-[50%] transition-all duration-1000 bottom-[-400%] group-hover:rounded-none group-hover:bottom-0 pointer-events-none"></div>
              <div className="absolute flex items-center justify-center text-white font-semibold transition-all w-full h-full bg-blue-500 right-0 rounded-[50%] duration-1250 pointer-events-none bottom-[-300%] group-hover:rounded-none group-hover:bottom-0">Add Task</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-white/20 border border-white/70 rounded-lg px-6 pb-4 pt-8">
              <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Your Tasks</h2>
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between bg-white dark:bg-white/25 border border-white p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <ToggleSwitch
                        checked={task.completed}
                        onChange={() => toggleTask(task.id, task.completed)}
                      />
                      <div>
                        <p className={`font-semibold ${task.completed ? "line-through text-red-500" : "text-black dark:text-black"}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-white">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingTask(task)} className="border border-white/60 rounded-full p-2 text-blue-500 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="border border-white/60 rounded-full p-2 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Edit Task</h2>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Title"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white w-full"
              />
              <textarea
                placeholder="Description"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white w-full"
              />
              <div className="flex justify-end gap-4">
                <button onClick={() => setEditingTask(null)} className="px-4 py-2 bg-gray-300 text-black rounded-md">
                  Cancel
                </button>
                <button onClick={handleUpdateTask} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}