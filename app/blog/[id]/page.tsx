import PostDetail from "@/components/blog/PostDetail/PostDetail";
import CommentSection from "@/components/blog/CommentSection/CommentSection";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    const post = await res.json();

    return {
      title: `${post.title} | Blog`,
      description: post.body?.slice(0, 150),
      openGraph: {
        title: post.title,
        description: post.body?.slice(0, 150),
        type: "article",
        url: `https://yourdomain.com/blog/${id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.body?.slice(0, 150),
      },
    };
  } catch (error) {
    return {
      title: "Blog Post | Blog",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch post data for JSON-LD (Search engine optimization)
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const post = await res.json();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.body?.slice(0, 150),
    author: {
      "@type": "Person",
      name: `User ${post.userId}`,
    },
    datePublished: new Date().toISOString(), // Mock date
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-20 pb-12">
        <PostDetail id={id} />
        <CommentSection postId={Number(id)} />
      </div>
    </>
  );
}