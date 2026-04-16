import Link from "next/link";
import Card from "@/components/common/Card/Card";
import { memo } from "react";
import { ChevronRight } from "lucide-react";

type Post = {
  id: number;
  title: string;
  body: string;
  tags?: string[];
};

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex flex-col h-full border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-900 overflow-hidden group">
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-xl font-bold font-mono text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3.5rem]">
          {post.title}
        </h2>

        <p className="text-sm text-gray-600 font-sans dark:text-gray-400 mt-3 line-clamp-3 flex-grow">
          {post.body}
        </p>

        <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
          <Link
            className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 group/link"
            href={`/blog/${post.id}`}
          >
            Read more
            <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex gap-1">
            {post.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default memo(PostCard);