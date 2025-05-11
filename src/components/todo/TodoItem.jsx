import React from "react";
import { useTodos } from "../../context/TodoContext";
import { format, parseISO } from "date-fns";

export default function TodoItem({ todo, onEdit }) {
  const { updateTodo, deleteTodo } = useTodos();

  return (
    <div className={`mb-3 p-4 rounded-lg border ${
      todo.isCompleted 
        ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        : todo.isImportant
          ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => updateTodo(todo.id, { isCompleted: !todo.isCompleted })}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <div>
            <h3 className={`font-medium ${
              todo.isCompleted 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {todo.text} {todo.isImportant && !todo.isCompleted && "⭐"}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${
                todo.isCompleted 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {todo.description}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {format(parseISO(todo.date), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            aria-label="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
