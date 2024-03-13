"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div className="">
      <header className="sticky top-0 bg-blue-700 w-screen flex justify-between items-center p-4">
        <Link href="/">
          <h1 className="text-3xl text-white font-bold">
            <span className="bg-red-600 p-2">Kenya</span>
            <span className="text-black">Plus</span>
          </h1>
        </Link>
        <div className="text-xl font-bold hidden md:ml-auto md:mr-4 md:flex space-x-4 items-center">
          {/* Menu items for larger screens */}
          <Link href="/">
            <span className="text-white hover:underline">Home</span>
          </Link>
          <Link href="/login">
            <span className="text-white hover:underline">Login</span>
          </Link>
        </div>
        <div className="flex space-x-4 mr-2">
          {/* Hamburger menu button for small screens */}
          <button onClick={toggleSidebar} className="md:hidden">
            <svg
              className="w-6 h-6 text-white cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-blue-500 text-white p-4 w-1/2 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex flex-col space-y-4 text-center text-white text-3xl">
          <button
            className="ml-auto text-blue-800 hover:underline"
            onClick={closeSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-10 h-10 font-bold text-white text-3xl"
            >
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
          </button>
          <Link className="hover:bg-blue-200 rounded-r-full p-1 text-white" href="/">
            <span className="text-white">Home</span>
          </Link>
          <Link className="hover:bg-blue-200 rounded-r-full p-1" href="/login">
            <span className="hover:underline">Login</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
