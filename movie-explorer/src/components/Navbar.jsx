import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 fixed w-full z-10">
      <h1 className="text-2xl font-bold">Movie Explorer</h1>
      <div>
        <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition">
          Login
        </button>
      </div>
    </nav>
  );
}