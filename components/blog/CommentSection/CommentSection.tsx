"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { commentsActions } from "@/store/slices/commentsSlice";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button/Button";
import { MessageSquare, Send, Loader2 } from "lucide-react";

export default function CommentSection({ postId }: { postId: number }) {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comments);
  
  // Using the professional useAuth hook
  const { user, isAuthenticated } = useAuth();
  
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(commentsActions.fetchCommentsRequest(postId));
  }, [postId, dispatch]);

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(
      commentsActions.addCommentRequest({
        postId,
        body: text,
      })
    );
    setText("");
  };

  return (
    <div className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-16 max-w-3xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <MessageSquare size={20} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Discussion <span className="text-gray-400 dark:text-gray-500 font-medium ml-1">({comments.length})</span>
          </h3>
        </div>
        
      </div>

      {/* Input Section */}
      {isAuthenticated ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 mb-12 border border-gray-100 dark:border-gray-800 shadow-sm transition-all focus-within:shadow-xl focus-within:shadow-blue-500/5 focus-within:border-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex-shrink-0 flex items-center justify-center text-white font-black text-sm shadow-lg">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 resize-none py-2 h-24 text-lg font-medium"
                placeholder="Share your architectural perspective..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-50 dark:border-gray-800/50">
                <Button 
                  onClick={handleAdd} 
                  className="!px-8 !py-2.5 rounded-full flex items-center gap-2"
                  disabled={!text.trim() || loading}
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 mb-12 border-2 border-dashed border-gray-100 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">Please login to join the discussion.</p>
          <Button variant="secondary" onClick={() => (window.location.href = "/login")}>
            Sign In to Comment
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && comments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <p className="text-sm font-bold tracking-widest uppercase">Fetching conversation...</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((c) => (
          <div 
            key={c.id} 
            className="group flex gap-5 p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
          >
            {/* Avatar */}
            <div className="h-12 w-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center text-gray-500 dark:text-gray-400 font-black text-sm transition-transform group-hover:scale-110">
              {c.user.username.charAt(0).toUpperCase()}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-black text-gray-900 dark:text-white text-sm">
                    {c.user.username}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Expert Contributor
                  </span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-md font-medium">
                {c.body}
              </p>
              
              <div className="flex gap-6 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline">Reply</button>
                <button className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">Flag</button>
              </div>
            </div>
          </div>
        ))}

        {!loading && comments.length === 0 && (
          <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-900/20 rounded-3xl border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
              <MessageSquare size={24} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold">No thoughts shared yet.</p>
            <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Be the one to start this professional dialogue.</p>
          </div>
        )}
      </div>
    </div>
  );
}