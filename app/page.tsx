// async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.// import { NavBar } from "./ui/nav";

import { ListBlogs } from "@/app/ui/listBlogs";

// server components all receive searchParams as props
export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <>
      <main className="">
        <ListBlogs query={query} />
      </main>
    </>
  );
}

// import { ListBlogs } from "@/app/ui/listBlogs";
// import { useSearch } from "./lib/provider";

// export default function Home() {
//   return (
//     <>
//       <main className="">
//         <ListBlogs />
//       </main>
//     </>
//   );
// }
