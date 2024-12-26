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
  test: string;
};

// {
//     _id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
//     title: "The Rise of JavaScript Frameworks",
//     detail:
//       "An in-depth look at the most popular JavaScript frameworks in 2024 and their features.",
//     imageURL: "https://example.com/images/javascript-frameworks.jpg",
//     author: "Sarah Johnson",
//     author_Id: "410544b2-4001-4271-9855-fec4b6a6442a",
//     createdAt: new Date("2024-01-15T10:00:00Z"),
//     updatedAt: new Date("2024-01-15T12:00:00Z"),
//   },
