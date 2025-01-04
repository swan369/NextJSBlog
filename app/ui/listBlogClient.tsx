"use client";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "../lib/definitions";
import { useSearch } from "../lib/provider";

export function ListBlogClient(props: { blogs: Blog[] }) {
  const { setSearchQuery } = useSearch();
  const blogs = props.blogs;
  const listBlogs = blogs.map((blog) => {
    return (
      // key at root of JSX structure, remove unnecessary fragments
      <Link href={`/${blog._id}/detail`} key={blog._id}>
        <div
          className="md-20 rounded shadow-lg bg-gray-200 md:w-60 md:h-40 w-30"
          onClick={() => setSearchQuery("")}
        >
          {blog.image_url ? (
            <Image
              className="block w-full h-full object-cover rounded-lg"
              src={blog.image_url}
              alt="an image"
              width={50}
              height={50}
              // unoptimized
              priority={true}
            />
          ) : (
            <div>No image</div>
          )}
          <div className="font-medium text-rose-800">{blog.title}</div>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="w-1/2 p-6 md:px-10 h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {listBlogs}
      </div>
    </>
  );
}
