import React from "react";

export default function HomePage({ goLogin, goSignUp }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">Listo</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Organize your life with tasks, calendar, and themes. Simple, secure, and beautiful.
        </p>
        <div className="flex gap-4">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            onClick={goLogin}
          >
            Log In
          </button>
          <button
            className="bg-white border border-indigo-600 text-indigo-700 px-6 py-2 rounded hover:bg-indigo-50 transition"
            onClick={goSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
