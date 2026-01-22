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
    <header className="fixed lg:right-50 z-99 rounded-full bg-none flex items-center h-20 lg:w-[70%] w-[40%]">
      <div className=" mt-10 rounded-full border border-white/20 px-10 flex items-center justify-between w-full h-full backdrop-blur-xl">
        <Link href={'/'} className="flex items-center gap-1">
          <div className="w-5 h-5 bg-white rounded-full"></div>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {isAuthenticated ? (
            <div className="relative group h-9 w-18 bg-white rounded overflow-hidden">
              <button
                onClick={handleLogout}
                className="relative z-10 cursor-pointer flex h-9 items-center transition-all justify-center w-18 py-2 text-sm text-black group-hover:text-white font-semibold"
              >
                Logout
              </button>
              <div className="absolute w-full h-full bg-gray-900 right-0 rounded-[50%] transition-all duration-250 bottom-[-100%] group-hover:rounded-none group-hover:bottom-0"></div>
              <div className="absolute w-full h-full bg-red-600 right-0 rounded-[50%] transition-all duration-500 bottom-[-200%] group-hover:rounded-none group-hover:bottom-0"></div>
            </div>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-sm font-medium hover:bg-white/20 transition-all px-4 py-2 rounded underline-offset-4 text-black dark:text-white"
                prefetch={false}
              >
                Login
              </Link>
              <div className="relative group h-9 w-18 bg-white rounded overflow-hidden">

              <Link
                href="/auth/signup"
                className="relative z-10 transition-all group-hover:text-white text-black font-semibold flex h-full items-center justify-center w-full py-2 text-sm"
                prefetch={false}
                >
                Sign Up
              </Link>
              <div className="absolute w-full h-full bg-gray-900 right-0 rounded-[50%] transition-all duration-250 bottom-[-100%] group-hover:rounded-none group-hover:bottom-0"></div>
              <div className="absolute w-full h-full bg-green-600 right-0 rounded-[50%] transition-all duration-500 bottom-[-200%] group-hover:rounded-none group-hover:bottom-0"></div>
                </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
