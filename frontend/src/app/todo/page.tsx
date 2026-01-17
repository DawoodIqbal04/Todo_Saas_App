"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullname");
    setToken(null);
    setUserId(null);
    setFullname(null);
    router.push("/auth");
  };

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
  
  const updateTask = async (taskId: number, completed: boolean) => {
    if (!token || !userId) return;
    try {
      const response = await fetch(`${API_URL}/${userId}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black dark:text-white">Welcome, {fullname || userId}!</h1>
            <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
              Log Out
            </button>
          </div>
          <div className="grid gap-6">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Create New Task</h2>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white w-full"
                />
                <textarea
                  placeholder="Description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white w-full"
                />
                <button onClick={createTask} className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md">
                  Add Task
                </button>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Your Tasks</h2>
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => updateTask(task.id, task.completed)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="p-2 text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}