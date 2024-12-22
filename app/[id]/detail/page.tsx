import { fetchFinBlogById } from "@/app/lib/fetch";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { title, author, imageurl, detail, date } = (
    await fetchFinBlogById(id)
  )[0];

  return (
    <>
      <main>
        <div>
          {title}
          {imageurl}
          {detail}
        </div>
      </main>
    </>
  );
}
