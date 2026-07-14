import { getAllBlogs } from "@/lib/blogs";
import { NotesBackground } from "./_components/notes-background";
import { NotesShell } from "./_components/notes-shell";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllBlogs();

  return (
    <NotesBackground>
      <NotesShell posts={posts}>{children}</NotesShell>
    </NotesBackground>
  );
}
