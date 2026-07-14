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
      className={`block rounded-lg px-3 py-2.5 transition-colors duration-150 active:scale-[0.98] ${
        isActive
          ? "bg-[#fff3b0] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
          : "hover:bg-black/[0.04]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="truncate text-[15px] font-semibold text-[#1d1d1f]">
          {post.title}
        </h3>
        <time
          dateTime={post.date}
          className="shrink-0 text-[13px] tabular-nums text-[#86868b]"
        >
          {formatBlogDate(post.date)}
        </time>
      </div>
      <p className="mt-0.5 truncate text-[13px] leading-snug text-[#86868b]">
        {post.preview}
      </p>
    </Link>
  );
}
