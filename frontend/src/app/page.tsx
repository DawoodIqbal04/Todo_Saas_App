"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div className="flex flex-col min-h-[120dvh] bg-white dark:bg-black">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-transparent">
          {/* Animated rounded gradient blobs behind content */}
          <div className="blobs-wrapper" aria-hidden>
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
            <div className="blob blob-4" />
            <div className="blob blob-5" />
            <div className="blob blob-6" />
          </div>

          <div className="container px-4 md:px-6 hero-content">
            <div className="flex flex-col items-center mt-10 space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex flex-col gap-1">
                <h1 className="text-3xl py-2 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Organize Your Bussy Life <br/> With Our Todo App</h1>
                </div>
                <p className="mx-auto max-w-175 text-gray-200 md:text-xl">
                  A simple, yet powerful todo app to help you stay organized and productive.
                </p>
              </div>
              <div className="relative h-10 w-40 group overflow-hidden bg-white rounded-md ">
                <Link
                  href="/todo"
                  className="relative group-hover:text-white transition-all z-10 flex h-10 items-center justify-center w-40 text-sm font-medium text-black"
                  prefetch={false}
                >
                  Get Started For Free
                </Link>
                <div className="absolute w-full h-full bg-black/90 right-0 rounded-[50%] transition-all duration-250 bottom-[-100%] group-hover:rounded-none group-hover:bottom-0"></div>
                <div className="absolute w-full h-full bg-orange-500 right-0 rounded-[50%] transition-all duration-500 bottom-[-200%] group-hover:rounded-none group-hover:bottom-0"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-50 w-full py-12 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 mb-10 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Get Organized</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our todo app is packed with features to help you be more productive and stay on top of your tasks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-5 bg-white/5 p-10 border border-white/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                  <h3 className="text-xl font-bold">Easy to Use</h3>
                </div>
                <p className="text-gray-500 dark:text-white">
                  A simple and intuitive interface that let you navigate easily througout the app.
                </p>
              </div>
              <div className="grid gap-5 bg-white/5 p-10 border border-white/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3 className="text-xl font-bold">Stay Organized</h3>
                </div>
                <p className="text-gray-500 dark:text-white">
                  Create, edit, and delete tasks with ease to keep your life in order.
                </p>
              </div>
              <div className="grid gap-5 bg-white/5 p-10 border border-white/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <h3 className="text-xl font-bold">Secure</h3>
                </div>
                <p className="text-gray-500 dark:text-white">
                  Your data is safe and secure with our robust authentication system.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}