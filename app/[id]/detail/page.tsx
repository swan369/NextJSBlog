import { fetchBlogById } from "@/app/lib/fetch";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  // server component, receives props params. If client component, have to use useParams()
  const params = await props.params;
  const id = params.id;
  const { title, image_url, detail } = await fetchBlogById(id);

  return (
    <>
      <main>
        <div>
          {title}
          {image_url}
          {detail}
        </div>
      </main>
    </>
  );
}
