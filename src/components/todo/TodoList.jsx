import React from "react";
import { useTodos } from "../../context/TodoContext";
import TodoItem from "./TodoItem";
import { isToday, isFuture, parseISO } from "date-fns";

export default function TodoList({ filter, onEdit }) {
  const { todos } = useTodos();
  
  let filtered = todos;
  
  if (filter === "today") {
    filtered = todos.filter(
      (t) => !t.isCompleted && isToday(parseISO(t.date))
    );
  } else if (filter === "upcoming") {
    filtered = todos.filter(
      (t) => !t.isCompleted && isFuture(parseISO(t.date)) && !isToday(parseISO(t.date))
    );
  } else if (filter === "important") {
    filtered = todos.filter((t) => !t.isCompleted && t.isImportant);
  } else if (filter === "completed") {
    filtered = todos.filter((t) => t.isCompleted);
  }

  return (
    <div className="py-4">
      {filtered.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
        </div>
      ) : (
        filtered.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
        ))
      )}
    </div>
  );
}
