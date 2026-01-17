"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-transparent">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-black dark:text-white"
        >
          <path d="M9 12h6" />
          <path d="M9 18h6" />
          <path d="M15 6H9" />
          <path d="M3 4.5a2.5 2.5 0 0 1 2.5-2.5h13A2.5 2.5 0 0 1 21 4.5V19a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19V4.5Z" />
        </svg>
        <span className="ml-2 text-lg font-semibold text-black dark:text-white">Todo App</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="/auth" className="text-sm font-medium hover:underline underline-offset-4 text-black dark:text-white" prefetch={false}>
          Login
        </Link>
        <Link
          href="/todo"
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
