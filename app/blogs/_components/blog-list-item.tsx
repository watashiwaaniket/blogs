import Link from "next/link";
import type { BlogPost } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-utils";

type BlogListItemProps = {
  post: BlogPost;
  isActive: boolean;
};

export function BlogListItem({ post, isActive }: BlogListItemProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`notes-list-item block rounded-lg px-3 py-2.5 transition-colors duration-150 active:scale-[0.98] ${
        isActive ? "notes-list-item-active" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="truncate text-[15px] font-semibold">{post.title}</h3>
        <time dateTime={post.date} className="notes-muted shrink-0 text-[13px] tabular-nums">
          {formatBlogDate(post.date)}
        </time>
      </div>
      <p className="notes-muted mt-0.5 truncate text-[13px] leading-snug">
        {post.preview}
      </p>
    </Link>
  );
}
