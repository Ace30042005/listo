import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { user, updateUser } = useAuth();
  
  const getInitialTheme = () => {
    // First check if user has a saved theme preference
    if (user?.settings?.theme) {
      return user.settings.theme;
    }
    
    // Otherwise use system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme changes to DOM and save to user settings if logged in
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // If user is logged in, save theme preference to user settings
    if (user) {
      updateUser({
        settings: {
          ...(user.settings || {}),
          theme
        }
      });
    }
    
    // Store theme in localStorage for persistence
    localStorage.setItem("todo-theme", theme);
  }, [theme, user]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
