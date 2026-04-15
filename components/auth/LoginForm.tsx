"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(authActions.loginRequest({ username, password }));
  };

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <form className="w-96 p-6 border rounded-lg shadow font-mono" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        className="w-full p-2 border mb-3 rounded-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full p-2 border mb-3 rounded-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ErrorMessage message={error || ""} />

      <Button type="submit" loading={loading}>
        Login
      </Button>
    </form>
  );
}