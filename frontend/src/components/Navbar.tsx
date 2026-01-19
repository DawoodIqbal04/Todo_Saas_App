"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for authentication status, e.g., from local storage or a cookie
    const token = localStorage.getItem("token"); // Placeholder for actual auth check
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Perform logout actions, e.g., clear token, redirect
    localStorage.removeItem("token"); // Placeholder for actual logout
    setIsAuthenticated(false);
    router.push("/auth"); // Redirect to login page after logout
  };

  return (
    <header className="fixed right-50 z-99 rounded-full bg-none flex items-center h-20 w-[70%]">
      <div className=" mt-10 rounded-full border border-white/20 px-10 flex items-center justify-between w-full h-full backdrop-blur-xl">

      <div className="h-5 w-5 rounded-full bg-white"></div>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/auth" className="text-sm font-medium hover:bg-white/20 transition-all px-4 py-2 rounded underline-offset-4 text-black dark:text-white" prefetch={false}>
              Login
            </Link>
            <Link
              href="/auth" // Pointing to the main auth page
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
      </div>
    </header>
  );
}
