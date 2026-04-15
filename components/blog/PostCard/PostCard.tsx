import Link from "next/link";
import Card from "@/components/common/Card/Card";

type Post = {
  id: number;
  title: string;
  body: string;
  tags?: string[];
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <h2 className="text-md font-bold font-mono">{post.title}</h2>

      <p className="text-sm font-sans text-gray-600 mt-2">
        {post.body.slice(0, 100)}...
      </p>

      <div className="mt-3">
        <Link
          className="text-blue-600 text-sm font-sans"
          href={`/blog/${post.id}`}
        >
          Read more
        </Link>
      </div>
    </Card>
  );
}