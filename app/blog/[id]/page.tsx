export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await res.json();

  return {
    title: post.title,
    description: post.body?.slice(0, 150),
  };
}

import PostDetail from "@/components/blog/PostDetail/PostDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PostDetail id={id} />;
}