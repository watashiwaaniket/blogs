"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blog-types";
import { groupBlogsByDate } from "@/lib/blog-utils";
import { BlogListItem } from "./blog-list-item";
import { ThemeToggle } from "./theme-toggle";

type BlogSidebarProps = {
  posts: BlogPost[];
  activeSlug?: string;
};

export function BlogSidebar({ posts, activeSlug }: BlogSidebarProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalized) ||
        post.preview.toLowerCase().includes(normalized),
    );
  }, [posts, query]);

  const groups = groupBlogsByDate(filteredPosts);

  return (
    <aside className="notes-sidebar-bg flex h-full min-h-0 flex-col">
      <header className="notes-border-b shrink-0 px-4 pb-3 pt-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="notes-text text-[22px] font-bold tracking-tight text-balance">
            Notes
          </h1>
          <div className="flex items-center gap-2.5">
            <span className="notes-muted text-[13px] tabular-nums">
              {posts.length} {posts.length === 1 ? "note" : "notes"}
            </span>
            <ThemeToggle />
          </div>
        </div>
        <label className="relative mt-3 block">
          <span className="sr-only">Search notes</span>
          <svg
            aria-hidden
            className="notes-muted pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="notes-search-input w-full rounded-lg py-2 pl-9 pr-3 text-[15px] shadow-[0_1px_2px_var(--notes-shadow-sm)] transition-[box-shadow,border-color] duration-150"
          />
        </label>
      </header>

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
        {groups.length === 0 ? (
          <p className="notes-muted px-3 py-8 text-center text-[15px]">
            No notes found
          </p>
        ) : (
          groups.map((group) => (
            <section key={group.label} className="mb-4">
              <h2 className="notes-muted px-3 pb-1 text-[13px] font-semibold uppercase tracking-wide">
                {group.label}
              </h2>
              <ul className="space-y-0.5">
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <BlogListItem
                      post={post}
                      isActive={post.slug === activeSlug}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </nav>
    </aside>
  );
}
