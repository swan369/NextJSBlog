import { NavBar } from "./ui/nav";
import { ListAllBlogs } from "@/app/ui/listAllBlogs";

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
        <ListAllBlogs query={query} />
      </main>
    </>
  );
}
