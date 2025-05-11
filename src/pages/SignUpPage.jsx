import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage({ goHome }) {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 3) return setErr("Username too short.");
    if (password.length < 4) return setErr("Password too short.");
    const res = signup(username, password);
    if (!res.success) setErr(res.message);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Sign Up</h2>
        {err && <div className="mb-4 text-red-500">{err}</div>}
        <input
          className="block w-full mb-4 px-4 py-2 border rounded bg-gray-50"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="block w-full mb-6 px-4 py-2 border rounded bg-gray-50"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Sign Up</button>
        <button type="button" className="w-full mt-3 text-indigo-600 hover:underline" onClick={goHome}>Back</button>
      </form>
    </div>
  );
}
