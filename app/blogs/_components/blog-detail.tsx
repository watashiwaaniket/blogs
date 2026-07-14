import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { BlogPost } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-utils";
import { ShareNoteButton } from "./share-note-button";
import { SocialMenuButton } from "./social-menu-button";

type BlogDetailProps = {
  post: BlogPost;
  showBackButton?: boolean;
};

export function BlogDetail({ post, showBackButton = false }: BlogDetailProps) {
  return (
    <article className="flex h-full min-h-0 flex-col bg-white">
      <header className="shrink-0 border-b border-black/[0.06] px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-start gap-3">
          {showBackButton && (
            <Link
              href="/blogs"
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#007aff] transition-[transform,background-color] duration-150 active:scale-[0.96] hover:bg-[#ebebed] md:hidden"
              aria-label="Back to notes"
            >
              <svg
                aria-hidden
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          )}

          <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
            <h1 className="min-w-0 text-[28px] font-bold leading-tight tracking-tight text-[#1d1d1f] text-balance md:text-[34px]">
              {post.title}
            </h1>

            <div className="flex shrink-0 items-center gap-3 pt-1 md:pt-2">
              <time
                dateTime={post.date}
                className="hidden text-[13px] tabular-nums text-[#86868b] sm:block"
              >
                {formatBlogDate(post.date, "long")}
              </time>
              <div className="relative flex items-center rounded-full bg-[#f5f5f7] p-0.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                <ShareNoteButton title={post.title} slug={post.slug} />
                <div
                  aria-hidden
                  className="mx-0.5 h-4 w-px bg-black/[0.08]"
                />
                <SocialMenuButton />
              </div>
            </div>
          </div>
        </div>

        <time
          dateTime={post.date}
          className="mt-1 block text-[13px] tabular-nums text-[#86868b] sm:hidden"
        >
          {formatBlogDate(post.date, "long")}
        </time>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
        <div className="prose-notes mx-auto max-w-2xl">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
