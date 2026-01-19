"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("fullname", data.fullname);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent("auth-change"));
        router.push("/todo");
      } else {
        setMessage(data.detail || "Failed to login");
      }
    } catch (error) {
      setMessage(`Error during login: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/todo");
    }
  }, [router]);

  return (
    <div className="flex pt-30 flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to log in.</p>
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
            <button
              onClick={handleLogin}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
            >
              Log In
            </button>
            {message && <p className="text-sm text-red-500 dark:text-red-300 text-center mt-4">{message}</p>}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
