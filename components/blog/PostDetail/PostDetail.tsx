"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postsActions } from "@/store/slices/postsSlice";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar, Clock, Share2, Bookmark, User, Tag, ThumbsUp } from "lucide-react";
import { DetailSkeleton } from "../../common/Loader/Skeleton";

export default function PostDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selectedPost, loading, error } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (id) {
      dispatch(postsActions.fetchPostByIdRequest(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error || !selectedPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-full mb-4">
          <AlertCircle className="text-red-500 dark:text-red-400" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">The article you're looking for might have been moved or deleted.</p>
        <button 
          onClick={() => router.back()}
          className="mt-6 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <article className="h-auto font-sans bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Sticky Header Actions */}
      <nav className="sticky top-16 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="group flex items-center text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Stories
          </button>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-full transition-colors"><Share2 size={18} /></button>
            <button className="p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-full transition-colors"><Bookmark size={18} /></button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter mb-8">
          {selectedPost.title}
        </h1>

      </header>

      {/* Content Area */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-800 dark:text-gray-200 leading-[1.8] whitespace-pre-wrap text-xl mb-8">
            {selectedPost.body}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pb-12 border-b border-gray-100 dark:border-gray-800">
          {selectedPost.tags?.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </main>
    </article>
  );
}

import { AlertCircle } from "lucide-react";