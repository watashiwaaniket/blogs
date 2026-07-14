import type { BlogGroup, BlogPost } from "./blog-types";

export function buildPreview(content: string): string {
  const plain = content
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plain.length > 120 ? `${plain.slice(0, 120)}…` : plain;
}

export function groupBlogsByDate(posts: BlogPost[]): BlogGroup[] {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const recent: BlogPost[] = [];
  const byMonth = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const date = new Date(post.date);

    if (date >= thirtyDaysAgo) {
      recent.push(post);
      continue;
    }

    const label = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const existing = byMonth.get(label) ?? [];
    existing.push(post);
    byMonth.set(label, existing);
  }

  const groups: BlogGroup[] = [];

  if (recent.length > 0) {
    groups.push({ label: "Previous 30 Days", posts: recent });
  }

  for (const [label, monthPosts] of byMonth) {
    groups.push({ label, posts: monthPosts });
  }

  return groups;
}

export function formatBlogDate(date: string, style: "short" | "long" = "short") {
  const parsed = new Date(date);

  if (style === "long") {
    return parsed.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}
