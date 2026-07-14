import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { BlogDetail } from "../_components/blog-detail";

export function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} showBackButton />;
}
