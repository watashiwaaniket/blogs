import { getAllBlogs } from "@/lib/blogs";
import { siteConfig } from "@/lib/site-config";
import { NotesBackground } from "./_components/notes-background";
import { NotesShell } from "./_components/notes-shell";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllBlogs();

  return (
    <>
      {siteConfig.backgroundImage && (
        <link
          rel="preload"
          as="image"
          href={siteConfig.backgroundImage}
          type="image/webp"
          fetchPriority="high"
        />
      )}
      <NotesBackground>
        <NotesShell posts={posts}>{children}</NotesShell>
      </NotesBackground>
    </>
  );
}
