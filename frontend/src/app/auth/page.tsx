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

  const API_URL = process.env.VERCEL_ENV ? "/api" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api");

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
        <div className="w-full max-w-md bg-gray-100 dark:bg-white/10 border backdrop-blur-xl border-white/50 rounded-lg shadow-lg p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">Welcome Back 👋</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to log in.</p>
          </div>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-white/50 bg-white dark:bg-white/15 px-3 py-2 text-sm   text-black dark:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-white/50 bg-white dark:bg-white/15 px-3 py-2 text-sm   text-black dark:text-white"
            />
            <div className="relative rounded overflow-hidden h-10 w-full bg-white group">

            <button
              onClick={handleLogin}
              className="relative z-10 cursor-pointer flex items-center justify-center group-hover:text-white text-black text-sm font-semibold h-10 w-full "
              >
              Log In
            </button>
            <div className="absolute transition-all w-full h-full bg-black right-0 rounded-[50%] duration-250 bottom-[-100%] group-hover:rounded-none group-hover:bottom-0"></div>
              <div className="absolute w-full h-full bg-green-600 right-0 rounded-[50%] transition-all duration-500 bottom-[-200%] group-hover:rounded-none group-hover:bottom-0"></div>
              </div>
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
