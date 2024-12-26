// async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.// import { NavBar } from "./ui/nav";

import { ListBlogs } from "@/app/ui/listBlogs";

//Can also use loading.tsx => reate (focusLoad) aka (overview) directory n put in page.tsx n loading.tsx to focus loading only that page.
import { Suspense } from "react";
import { SkeletonLoading } from "./ui/skeleton";
// server components all receive searchParams as props. Can't use useSearchParams
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
        <Suspense
          fallback={
            <div>
              <SkeletonLoading />
            </div>
          }
        >
          <ListBlogs query={query} />
        </Suspense>
      </main>
    </>
  );
}
