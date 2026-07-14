export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  preview: string;
  content: string;
};

export type BlogGroup = {
  label: string;
  posts: BlogPost[];
};
