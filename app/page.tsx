import { NavBar } from "./ui/nav";
import { ListBlogs } from "@/app/ui/listBlogs";

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
        <NavBar />
        <ListBlogs query={query} />
      </main>
    </>
  );
}
