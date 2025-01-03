// async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.// import { NavBar } from "./ui/nav";

import { ListBlogs } from "./ui/listBlogs";

//Can also use loading.tsx => reate (focusLoad) aka (overview) directory n put in page.tsx n loading.tsx to focus loading only that page.
import { Suspense } from "react";
import { SkeletonLoading } from "./ui/skeleton";

// server components all receive searchParams as props. Can't use useSearchParams()
// always access searchParams or Params at page level. It is handled efficiently as pages are treated as server components by default.
// guarantees that searchParams reflects the latest state of the URL
// you then can pass data to children as props.
export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
  }>;
}) {
  // export default async function Home() {
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
