import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/TodoContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TodoPage from "./pages/TodoPage";

const PAGES = {
  HOME: "home",
  LOGIN: "login",
  SIGNUP: "signup",
  TODO: "todo",
};

function MainApp() {
  const { user } = useAuth();
  const [page, setPage] = useState(PAGES.HOME);

  useEffect(() => {
    if (user) setPage(PAGES.TODO);
    else setPage(PAGES.HOME);
  }, [user]);

  return (
    <>
      {page === PAGES.HOME && <HomePage goLogin={() => setPage(PAGES.LOGIN)} goSignUp={() => setPage(PAGES.SIGNUP)} />}
      {page === PAGES.LOGIN && <LoginPage goHome={() => setPage(PAGES.HOME)} />}
      {page === PAGES.SIGNUP && <SignUpPage goHome={() => setPage(PAGES.HOME)} />}
      {page === PAGES.TODO && <TodoPage goHome={() => setPage(PAGES.HOME)} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TodoProvider>
          <MainApp />
        </TodoProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
