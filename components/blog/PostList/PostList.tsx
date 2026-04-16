"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postsActions } from "@/store/slices/postsSlice";
import PostCard from "../PostCard/PostCard";
import { PostSkeleton } from "../../common/Loader/Skeleton";
import {
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
  selectHasMorePosts
} from "@/store/selectors/postsSelectors";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";
// Wait, 'lucide-center' doesn't exist. It was a typo in my previous turn or the original code. I'll use 'lucide-react'.

import { Sparkles as SparklesIcon } from "lucide-react";

export default function PostList() {
  const dispatch = useAppDispatch();

  // Using professional selectors
  const posts = useAppSelector(selectAllPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);
  const hasMore = useAppSelector(selectHasMorePosts);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(postsActions.fetchPostsRequest({ page }));
  }, [page, dispatch]);

  const loadMore = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  return (
    <section className="max-w-7xl font-sans mx-auto px-4 mt-6 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60"></div>
          <h1 className="text-4xl md:text-5xl mb-1 font-black text-gray-900 dark:text-white tracking-tighter">
            Blog
          </h1>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-12 p-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl flex items-center shadow-sm">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mr-4 flex-shrink-0">
            <AlertCircle size={20} />
          </div>
          <p className="text-red-700 dark:text-red-400 font-bold">{error}</p>
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Loading Skeletons */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <PostSkeleton key={`skeleton-${i}`} />
          ))
        }
      </div>

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-800">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-6">
            <SparklesIcon size={32} />
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-xl font-bold">No stories match your search.</p>
          <p className="text-gray-400 dark:text-gray-600 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Load More Action */}
      {hasMore && posts.length > 0 && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-200 dark:shadow-none disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Building more...
              </>
            ) : (
              <>
                Load More Stories
                <div className="w-6 h-6 bg-white/20 dark:bg-gray-900/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <SparklesIcon size={12} />
                </div>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}