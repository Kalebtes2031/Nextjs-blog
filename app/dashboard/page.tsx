"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.posts);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="p-6 font-sans mt-12">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">Welcome {user?.username}</p>

      <div className="mt-6">
        <h2 className="font-bold">Total Posts: {posts.length}</h2>
      </div>
    </div>
  );
}