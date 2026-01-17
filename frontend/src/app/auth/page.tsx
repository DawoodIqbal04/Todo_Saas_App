"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Assuming Navbar is used here
import Footer from "@/components/Footer"; // Assuming Footer is used here

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState(""); // New state for fullname
  const [message, setMessage] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  const handleAuth = async (endpoint: string) => {
    try {
      const payload = endpoint === "signup" ? { email, password, fullname } : { email, password }; // Include fullname for signup
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("fullname", data.fullname); // Store fullname
                router.push("/todo");
      } else {
        setMessage(data.detail || `Failed to ${endpoint}`);
      }
    } catch (error) {
      setMessage(`Error during ${endpoint}: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSignup = () => handleAuth("signup");
  const handleLogin = () => handleAuth("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
              router.push("/todo");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar /> {/* Add Navbar */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">Welcome</h1>
            <p className="text-gray-500 dark:text-gray-400">Login or create an account to get started.</p>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black dark:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black dark:text-white"
            />
            <input // New input field for fullname
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black dark:text-white"
            />
            <button
              onClick={handleLogin}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Sign Up
            </button>
            {message && <p className="text-sm text-red-500 dark:text-red-300 text-center mt-4">{message}</p>}
          </div>
        </div>
      </main>
      <Footer /> {/* Add Footer */}
    </div>
  );
}
