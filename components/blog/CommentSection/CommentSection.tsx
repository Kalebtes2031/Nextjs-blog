"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { commentsActions } from "@/store/slices/commentsSlice";
import Button from "@/components/common/Button/Button";
import { MessageSquare, Send, User, Loader2 } from "lucide-react";

export default function CommentSection({ postId }: { postId: number }) {
  const dispatch = useAppDispatch();
  const { comments, loading } = useAppSelector((state) => state.comments);
  const { user } = useAppSelector((state) => state.auth);
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
    <div className="mt-16 font-sans border-t border-gray-100 pt-10 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare size={22} className="text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">
          Discussion ({comments.length})
        </h3>
      </div>

      {/* Input Section */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-10 border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/40">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <textarea
              className="w-full px-2 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 resize-none py-2 h-20 text-sm"
              placeholder="Join the conversation..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex flex-row justify-end mt-2 pt-2 border-t border-gray-200/50">
              <Button 
                onClick={handleAdd} 
                variant="primary"
                showSendIcon = {true}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && comments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <Loader2 className="animate-spin mb-2" size={24} />
          <p className="text-sm">Fetching comments...</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div 
            key={c.id} 
            className="group flex gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-colors"
          >
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 uppercase font-bold text-xs">
              {c.user.username.charAt(0)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-900 text-sm">
                  @{c.user.username}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {c.body}
              </p>
              
              {/* Comment Actions (Purely Visual) */}
              <div className="flex gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs text-gray-400 hover:text-indigo-600 font-medium">Reply</button>
                <button className="text-xs text-gray-400 hover:text-red-500 font-medium">Report</button>
              </div>
            </div>
          </div>
        ))}

        {!loading && comments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}