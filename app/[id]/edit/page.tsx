import { fetchBlogById } from "@/app/lib/fetch";
import { UpdateBlog } from "@/app/ui/updateBlog";

// must use default at page level
// In Next.js, route parameters are always provided as direct values, not Promises
// server components receives search params or params as props but as a promise
// hence (await...).id
// searchParams: Promise<{ [key: string]: string | string[] | undefined }>
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>; // correct synthax for async server. If client, use useParams()
}) {
  const id = (await params).id; // correct synthax

  //   const blog = result.rows[0];  // This has type QueryResultRow
  // error: QueryResultRow is like saying "this could be any object with any properties from the database." It's a very permissive type that doesn't guarantee it has all the properties required by your Blog type.
  const blogWithId = await fetchBlogById(id);
  console.log(blogWithId);

  return <UpdateBlog blog={blogWithId} />;
}
