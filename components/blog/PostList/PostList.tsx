"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postsActions } from "@/store/slices/postsSlice";
import PostCard from "../PostCard/PostCard";
import { Loader2, AlertCircle } from "lucide-react"; 

export default function PostList() {
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasMore } = useAppSelector(
    (state) => state.posts
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(postsActions.fetchPostsRequest({ page }));
  }, [page, dispatch]);

  const loadMore = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  return (
    <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Blog
        </h1>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center">
          <AlertCircle className="text-red-500 mr-3" size={20} />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Responsive Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="transition-transform duration-300 hover:-translate-y-1">
            <PostCard post={post} />
          </div>
        ))}

        {/* Loading Skeletons */}
        {loading && 
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-64 w-full" />
          ))
        }
      </div>

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">No posts found.</p>
        </div>
      )}

      {/* Load More Action */}
      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex font-sans items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-900 hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Loading...
              </>
            ) : (
              "Load More Stories"
            )}
          </button>
        </div>
      )}
    </section>
  );
}