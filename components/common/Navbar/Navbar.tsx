"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/authSlice";

import Button from "../Button/Button";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(authActions.logout());
  };

  return (
    <nav className="flex justify-between items-center p-4 px-12 font-sans bg-primary border-b">
      {/* LEFT SIDE */}
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-sm font-medium">
              {user?.username}
            </span>

            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}