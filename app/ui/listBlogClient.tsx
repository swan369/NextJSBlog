"use client";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "../lib/definitions";
import { useSearch } from "../lib/provider";

export function ListBlogClient(props: { blogs: Blog[] | null }) {
  const { setSearchQuery } = useSearch();
  const blogs = props.blogs;
  const listBlogs =
    blogs && blogs.length > 0 ? (
      blogs.map((blog) => {
        return (
          // key at root of JSX structure, remove unnecessary fragments
          <Link href={`/${blog._id}/detail`} key={blog._id}>
            <div
              className="rounded shadow-lg bg-gray-200 sm:h-96 sm:w-96 h-64 and w-48"
              onClick={() => setSearchQuery("")}
            >
              {/* {blog.image_url ? ( */}
              <Image
                className="block w-full h-full object-cover rounded-lg"
                src={`/images/${blog._id}`}
                alt="an image"
                width={50}
                height={50}
                // unoptimized
                priority={true}
              />

              {/* <div>No image</div> */}

              <div className="font-medium text-rose-800">{blog.title}</div>
            </div>
          </Link>
        );
      })
    ) : (
      <h1>no blogs found</h1>
    );

  return <>{listBlogs}</>;
}
