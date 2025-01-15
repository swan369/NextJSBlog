export type Blog = {
  _id: string;
  title: string;
  detail: string;
  image_url: string;
  author: string;
  author_id: string;
  date: string;
};

export type Authors = {
  _id: string;
  name: string;
  email: string;
};

export type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};
