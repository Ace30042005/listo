import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();

const TODOS_KEY = "todo-tasks";

function getTodos() {
  return JSON.parse(localStorage.getItem(TODOS_KEY) || "[]");
}

function setTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function TodoProvider({ children }) {
  const { user } = useAuth();
  const [todos, setTodosState] = useState([]);

  useEffect(() => {
    if (user) {
      setTodosState(getTodos().filter(t => t.userId === user.id));
    }
  }, [user]);

  const addTodo = (todo) => {
    const allTodos = getTodos();
    const newTodo = {
      ...todo,
      id: String(Date.now()),
      userId: user.id,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [...allTodos, newTodo];
    setTodos(updated);
    setTodosState(updated.filter(t => t.userId === user.id));
  };

  const updateTodo = (id, updates) => {
    const allTodos = getTodos();
    const idx = allTodos.findIndex(t => t.id === id && t.userId === user.id);
    
    if (idx !== -1) {
      allTodos[idx] = { 
        ...allTodos[idx], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      setTodos(allTodos);
      setTodosState(allTodos.filter(t => t.userId === user.id));
    }
  };

  const deleteTodo = (id) => {
    const allTodos = getTodos();
    const updated = allTodos.filter(t => !(t.id === id && t.userId === user.id));
    
    setTodos(updated);
    setTodosState(updated.filter(t => t.userId === user.id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
