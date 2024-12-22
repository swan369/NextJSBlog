import { fetchAllBlogs } from "../lib/fetch";
import Image from "next/image";
import { fetchSearchedBlogs } from "../lib/fetch";

//test1

export async function ListAllBlogs({ query }: { query: string }) {
  let blogs = [];

  if (query === "") blogs = await fetchAllBlogs();
  else blogs = await fetchSearchedBlogs(query);

  // console.log("all blogs:", allBlogs);

  const listBlogs = blogs.map((blog) => {
    return (
      <>
        <div
          key={blog._id}
          className="md-20 rounded shadow-lg bg-gray-200 md:w-60 md:h-40 w-30"
        >
          {blog.imageurl ? (
            <Image
              className="block w-full h-full object-cover rounded-lg"
              src={blog.imageurl}
              alt="an image"
              width={50}
              height={50}
              // unoptimized
            />
          ) : (
            <div>No image</div>
          )}
          <div className="font-medium text-rose-800">{blog.title}</div>
        </div>
      </>
    );
  });

  return (
    <>
      <main className="w-1/2 p-6 md:px-10 h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {listBlogs}
      </main>
    </>
  );
}
