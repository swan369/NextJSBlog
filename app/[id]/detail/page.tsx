import { fetchFinBlogById } from "@/app/lib/fetch";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { title, imageurl, detail } = (await fetchFinBlogById(id))[0];

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
