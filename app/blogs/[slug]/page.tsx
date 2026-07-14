import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import { BlogDetail } from "../_components/blog-detail";

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
