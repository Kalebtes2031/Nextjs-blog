"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postsActions } from "@/store/slices/postsSlice";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar, Clock, Share2, Bookmark, User } from "lucide-react";

export default function PostDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selectedPost, loading, error } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (id) {
      // Ensuring ID is passed as a number as per your request
      dispatch(postsActions.fetchPostByIdRequest(Number(id)));
    }
  }, [id, dispatch]);

  // --- Professional Skeleton Loader ---
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded mb-6"></div>
        <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-10"></div>
        <div className="h-80 w-full bg-gray-100 rounded-3xl mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !selectedPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <Bookmark className="text-red-400" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        <p className="text-gray-500 mt-2">The article you're looking for might have been moved or deleted.</p>
        <button 
          onClick={() => router.back()}
          className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Sticky Header Actions */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="group flex items-center text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"><Share2 size={18} /></button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"><Bookmark size={18} /></button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-3xl mx-auto px-4 pt-16 pb-12">
        

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
          {selectedPost.title}
        </h1>
      </header>

      {/* Content Area */}
      <main className="max-w-3xl mx-auto px-4 pb-24">

        {/* Main Body */}
        <div className="prose prose-lg prose-indigo max-w-none">
          <p className="text-gray-800 leading-[1.8] whitespace-pre-wrap text-lg">
            {selectedPost.body}
          </p>
        </div>
      </main>
    </article>
  );
}