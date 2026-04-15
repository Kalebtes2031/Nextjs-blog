"use client";

import { useState } from "react";

import Button from "@/components/common/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ username, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-96 p-6 border rounded-lg shadow font-mono "
    >
      <h2 className="text-xl font-bold mb-4">Signup</h2>

      <input
        className="w-full p-2 border mb-3 rounded-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full p-2 border mb-3 rounded-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 border mb-3 rounded-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ErrorMessage message={error} />

      <Button type="submit" variant="success">
        Create Account
      </Button>
    </form>
  );
}