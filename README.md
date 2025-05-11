# React Todo App with Calendar & Theme Support

A feature-rich todo application built with React, offering task management, calendar integration, filtering, authentication, and theme customization—all with local storage persistence.

## ✨ Features

- 🔐 **User Authentication**
- ✅ **Todo CRUD operations**
- 📅 **Calendar View with `react-big-calendar`**
- 🗂️ **Filtered Views (Today, Upcoming, Important, Completed)**
- 🎨 **Theme Management (Default, Light, Dark)**
- 💾 **Local Storage Persistence**

---

## 📁 Project Structure & Key Files

### 🔐 Authentication
- **`src/components/auth/Login.jsx` & `SignUp.jsx`**
  - Handles login/signup forms and validation
  - Stores user data in local storage

### 📅 Calendar
- **`src/components/calendar/Calendar.jsx`**
  - Integrates `react-big-calendar` for visualizing todos
  - Maps todos to calendar events

### 🧭 Layout
- **`src/components/layout/Sidebar.jsx`**
  - Right sidebar with navigation:
    - Profile, Today, Upcoming, Important, Completed
  - Filters todos based on selected view

### 📝 Todos
- **`src/components/todo/TodoForm.jsx`**
  - Form for creating and editing todos (title, description, date, importance)
- **`src/components/todo/TodoItem.jsx`**
  - Individual todo item component
  - Supports marking done, editing, deleting todos

### 🌙 Theme Management
- **`src/context/ThemeContext.jsx`**
  - Manages and persists theme settings (`default`, `light`, `dark`)

### 📋 Todo State Management
- **`src/context/TodoContext.jsx`**
  - Manages global state for todos (CRUD and filtering)

### 💽 Local Storage
- **`src/hooks/useLocalStorage.js`**
  - Custom hook to handle local storage abstraction
- **`src/utils/localStorage.js`**
  - Utility functions for serialization/deserialization

### 📄 Main Page
- **`src/pages/TodoPage.jsx`**
  - Core application layout with sidebar, todos, and calendar

---

## 🧾 Data Structure

```json
{
  "users": [
    {
      "id": "user123",
      "username": "johndoe",
      "password": "hashedPassword123",
      "settings": {
        "theme": "default"
      }
    }
  ],
  "todos": [
    {
      "id": "todo123",
      "userId": "user123",
      "title": "Complete React project",
      "description": "Finish the todo app implementation with all features",
      "date": "2025-05-15T09:00:00.000Z",
      "isImportant": true,
      "isCompleted": false,
      "createdAt": "2025-05-11T05:30:00.000Z",
      "updatedAt": "2025-05-11T05:30:00.000Z"
    }
  ]
}
