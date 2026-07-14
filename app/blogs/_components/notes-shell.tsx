"use client";

import { usePathname } from "next/navigation";
import type { BlogPost } from "@/lib/blog-types";
import { BlogSidebar } from "./blog-sidebar";

type NotesShellProps = {
  posts: BlogPost[];
  children: React.ReactNode;
};

function EmptyDetail() {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center bg-white px-8 text-center">
      <div className="max-w-sm">
        <p className="text-[17px] font-medium text-[#1d1d1f]">Select a note</p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#86868b] text-pretty">
          Choose a note from the list to read it here.
        </p>
      </div>
    </div>
  );
}

export function NotesShell({ posts, children }: NotesShellProps) {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/blogs/")
    ? pathname.split("/blogs/")[1]?.split("/")[0]
    : undefined;
  const isDetailView = Boolean(activeSlug);
  const showSidebar = !isDetailView;
  const showDetailOnMobile = isDetailView;

  return (
    <div className="notes-app mx-auto flex h-dvh w-full max-w-6xl overflow-hidden bg-[#f5f5f7] shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:my-4 md:h-[calc(100dvh-2rem)] md:rounded-2xl md:border md:border-black/[0.06]">
      <div
        className={`${
          showSidebar ? "flex" : "hidden"
        } h-full w-full shrink-0 flex-col border-r border-black/[0.06] md:flex md:w-[min(100%,320px)] lg:w-[340px]`}
      >
        <BlogSidebar posts={posts} activeSlug={activeSlug} />
      </div>

      <main
        className={`${
          showDetailOnMobile ? "flex" : "hidden"
        } h-full min-w-0 flex-1 flex-col md:flex`}
      >
        {isDetailView ? children : <EmptyDetail />}
      </main>
    </div>
  );
}
