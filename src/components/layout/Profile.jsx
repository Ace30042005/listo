import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Profile({ goHome }) {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const [username, setUsername] = useState(user?.username || "");
  const [msg, setMsg] = useState("");

  const handleSave = () => {
    if (username.length < 3) return setMsg("Username too short.");
    updateUser({ username });
    setMsg("Saved!");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setMsg("Theme updated!");
  };

  const handleLogout = () => {
    logout();
    if (goHome) goHome(); // Ensure navigation to home
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Profile Settings</h2>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Theme Preference</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => handleThemeChange("light")}
            className={`px-4 py-2 rounded-md transition-colors ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`px-4 py-2 rounded-md transition-colors ${
              theme === "dark"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
            }`}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
      {msg && (
        <p className="mt-3 text-sm text-green-600 dark:text-green-400">
          {msg}
        </p>
      )}
    </div>
  );
}
