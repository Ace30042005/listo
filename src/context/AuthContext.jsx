import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const USERS_KEY = "todo-users";
const CURRENT_USER_KEY = "todo-current-user";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const login = (username, password) => {
    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);
    
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const signup = (username, password) => {
    const users = getUsers();
    
    if (users.some(u => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }
    
    const newUser = {
      id: String(Date.now()),
      username,
      password,
      settings: {
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    const users = getUsers();
    const index = users.findIndex(u => u.id === user.id);
    
    if (index !== -1) {
      // Create updated user with nested settings properly merged
      const updatedUser = { 
        ...users[index],
        ...(updates.settings ? { 
          settings: { 
            ...users[index].settings, 
            ...updates.settings 
          } 
        } : {}),
        ...updates
      };
      
      users[index] = updatedUser;
      setUsers(users);
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
