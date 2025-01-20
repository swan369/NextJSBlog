import { fetchAllBlogs } from "../lib/fetch";
import { fetchSearchedBlogs } from "../lib/fetch";
import { Blog } from "../lib/definitions";
import { ListBlogClient } from "./listBlogClient";
// can't use Provider in an async function
// as children of app. Best to receive data as props. It is inefficient to receive searchParams/params as child.

// separate the fetch (a server function) and pass down blogs, and create separate logic to use onClick on a client component, and then access provider.tsx
export async function ListBlogs({ query }: { query: string }) {
  console.log("query", query);

  let blogs: Blog[] | null = [];

  if (query === "") blogs = (await fetchAllBlogs()) as Blog[];
  else {
    blogs = (await fetchSearchedBlogs(query)) as Blog[] | null;
  }

  // console.log("all blogs:", allBlogs);

  return (
    <>
      {/* <main className="h-screen gap-20 p-20 justify-center grid-cols-1 sm:grid-cols-2 grid"> */}
      <main className="min-h-screen p-8">
        <ListBlogClient blogs={blogs} />
      </main>
    </>
  );
}
