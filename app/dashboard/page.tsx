"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { selectAllPosts } from "@/store/selectors/postsSelectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const posts = useAppSelector(selectAllPosts);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="p-6 font-sans mt-12 bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          Admin <span className="text-blue-600">Dashboard</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          Welcome back, <span className="text-gray-900 dark:text-white font-bold">{user?.username}</span>
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/50">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              Active Management
            </h2>
            <div className="text-4xl font-black text-gray-900 dark:text-white">
              {posts.length} <span className="text-lg font-bold text-gray-400">Posts</span>
            </div>
          </div>
          
          <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
              System Status
            </h2>
            <div className="text-4xl font-black text-green-600 dark:text-green-500">
              Live
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}