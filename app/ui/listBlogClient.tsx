"use client";

import Image from "next/image";
import Link from "next/link";
import { Blog } from "../lib/definitions";
import { useSearch } from "../lib/provider";

export function ListBlogClient({ blogs }: { blogs: Blog[] | null }) {
  const { setSearchQuery } = useSearch();

  if (!blogs || blogs.length === 0) {
    return <h1 className="text-center text-gray-500">No blogs found</h1>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Link
          href={`/${blog._id}/detail`}
          key={blog._id}
          className="block rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          onClick={() => setSearchQuery("")}
        >
          <div className="relative w-full h-48">
            <Image
              className="rounded-t-lg object-cover"
              src={`/images/${blog._id}`}
              alt={blog.title || "Blog image"}
              // width={800} // Example width
              // height={400}
              fill // need this..since images ends up of diff sizes
              sizes="100%"
              priority={true}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {blog.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { Blog } from "../lib/definitions";
// import { useSearch } from "../lib/provider";

// export function ListBlogClient(props: { blogs: Blog[] | null }) {
//   const { setSearchQuery } = useSearch();
//   const blogs = props.blogs;
//   const listBlogs =
//     blogs && blogs.length > 0 ? (
//       blogs.map((blog) => {
//         return (
//           // key at root of JSX structure, remove unnecessary fragments
//           <Link
//             href={`/${blog._id}/detail`}
//             key={blog._id}
//             className="block max-w-md max-h-sm rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
//           >
//             <div className="h-full" onClick={() => setSearchQuery("")}>
//               <Image
//                 className="rounded-lg w-full h-full"
//                 src={`/images/${blog._id}`}
//                 alt="an image"
//                 width={200}
//                 height={100}
//                 // unoptimized
//                 priority={true}
//               />
//               <div className="font-medium text-rose-800">{blog.title}</div>
//             </div>
//           </Link>
//         );
//       })
//     ) : (
//       <h1>no blogs found</h1>
//     );

//   return <>{listBlogs}</>;
// }
