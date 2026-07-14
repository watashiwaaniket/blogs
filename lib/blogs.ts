import "server-only";

import { blogPosts } from "./generated-blogs";
import type { BlogPost } from "./blog-types";

export type { BlogPost, BlogGroup } from "./blog-types";
export { formatBlogDate, groupBlogsByDate } from "./blog-utils";

export function getAllBlogs(): BlogPost[] {
  return blogPosts;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((blog) => blog.slug === slug);
}
