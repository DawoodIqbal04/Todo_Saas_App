"use client";

import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  const handleAuth = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        setUserId(data.user_id);
        setMessage(`${endpoint} successful!`);
      } else {
        setMessage(data.detail || `Failed to ${endpoint}`);
      }
    } catch (error) {
      setMessage(`Error during ${endpoint}: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSignup = () => handleAuth("signup");
  const handleLogin = () => handleAuth("login");
  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setMessage("Logged out successfully.");
    setTasks([]);
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
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-16 px-8 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-8">
          Todo App
        </h1>

        {!token ? (
          <div className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded text-white"
            />
            <button onClick={handleSignup} className="p-2 bg-blue-500 text-white rounded">
              Sign Up
            </button>
            <button onClick={handleLogin} className="p-2 bg-green-500 text-white rounded">
              Log In
            </button>
            {message && <p className="text-sm text-red-500 dark:text-red-300">{message}</p>}
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <p className="text-lg text-white dark:text-zinc-50">Welcome, User {userId}!</p>
            <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
              Log Out
            </button>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-white dark:text-zinc-50">Create New Task</h2>
              <input
                type="text"
                placeholder="Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="p-2 border rounded text-white w-full mt-2"
              />
              <textarea
                placeholder="Description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="p-2 border rounded text-white w-full mt-2"
              />
              <button onClick={createTask} className="p-2 bg-blue-500 text-white rounded mt-2">
                Add Task
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-white dark:text-zinc-50 mt-8">Your Tasks</h2>
            <ul className="list-disc pl-5">
              {tasks.map((task) => (
                <li key={task.id} className="text-white dark:text-zinc-50 mb-2">
                  <span className={task.completed ? "line-through" : ""}>{task.title}</span> - {task.description}
                  <button onClick={() => updateTask(task.id, task.completed)} className="ml-2 p-1 text-xs bg-yellow-500 text-white rounded">
                    Toggle
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="ml-2 p-1 text-xs bg-red-500 text-white rounded">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}