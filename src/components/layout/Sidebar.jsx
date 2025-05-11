import React from "react";
import { useTheme } from "../../context/ThemeContext";

const NAV = [
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "important", label: "Important" },
  { key: "completed", label: "Completed" },
  { key: "calendar", label: "Calendar" },
  // Profile is NOT in this list
];

export default function Sidebar({ user, view, setView }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Listo</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Welcome,</p>
          <p className="font-medium text-gray-800 dark:text-white">{user.username}</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setView(item.key)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                    view === item.key
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Profile button at the bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setView("profile")}
          className={`w-full px-3 py-2 text-left rounded-md transition-colors flex items-center ${
            view === "profile"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <span className="mr-2">👤</span> Profile
        </button>
      </div>
    </div>
  );
}
