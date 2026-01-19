"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Listen for storage events from other tabs
    window.addEventListener("storage", handleAuthChange);

    // Listen for custom auth-change event from same tab
    window.addEventListener("auth-change", handleAuthChange);

    // Initial check
    handleAuthChange();

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("auth-change"));
    router.push("/auth");
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
              href="/auth/signup"
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
