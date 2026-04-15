export const metadata = {
  title: "Blog Page",
  description: "List of all blog posts",
};

import PostList from "@/components/blog/PostList/PostList";

export default function Page() {
  return <PostList />;
}