import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { buildPreview } from "./blog-utils";
import type { BlogPost } from "./blog-types";

export type { BlogPost, BlogGroup } from "./blog-types";
export { formatBlogDate, groupBlogsByDate } from "./blog-utils";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function parseBlogFile(filename: string): BlogPost {
  const slug = slugFromFilename(filename);
  const raw = fs.readFileSync(path.join(BLOGS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: (data.slug as string | undefined) ?? slug,
    title: (data.title as string | undefined) ?? slug,
    date: (data.date as string | undefined) ?? new Date().toISOString(),
    preview: buildPreview(content),
    content: content.trim(),
  };
}

export function getAllBlogs(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parseBlogFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((blog) => blog.slug === slug);
}
