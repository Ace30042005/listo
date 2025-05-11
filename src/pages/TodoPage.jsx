import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import TodoList from "../components/todo/TodoList";
import TodoForm from "../components/todo/TodoForm";
import Calendar from "../components/calendar/Calendar";
import Profile from "../components/layout/Profile";

export default function TodoPage({ goHome }) {
  const { user } = useAuth();
  const [view, setView] = useState("today");
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Sidebar user={user} view={view} setView={setView} />
      <main className="flex-1 overflow-y-auto p-6">
        {view === "profile" ? (
          <Profile goHome={goHome} />
        ) : view === "calendar" ? (
          <Calendar />
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold capitalize">
                {view} Tasks
              </h1>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Add Task
              </button>
            </div>
            <TodoList filter={view} onEdit={handleEditTodo} />
            {showForm && (
              <TodoForm initial={editingTodo} onClose={handleCloseForm} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
