import React, { useState } from "react";
import { useTodos } from "../../context/TodoContext";
import { format } from "date-fns";

export default function TodoForm({ initial, onClose }) {
  const { addTodo, updateTodo } = useTodos();
  
  const [text, setText] = useState(initial?.text || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [date, setDate] = useState(
    initial?.date 
      ? format(new Date(initial.date), "yyyy-MM-dd") 
      : format(new Date(), "yyyy-MM-dd")
  );
  const [isImportant, setIsImportant] = useState(initial?.isImportant || false);
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) return setErr("Task name required.");
    if (!date) return setErr("Date required.");
    
    if (initial) {
      updateTodo(initial.id, { text, description, date, isImportant });
    } else {
      addTodo({ text, description, date, isImportant });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {initial ? "Edit Task" : "Add Task"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="task-name">
              Task Name
            </label>
            <input
              id="task-name"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter task name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="Enter description"
              rows="3"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Mark as important</span>
            </label>
          </div>
          
          {err && (
            <p className="text-red-500 mb-4 text-sm">
              {err}
            </p>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {initial ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
