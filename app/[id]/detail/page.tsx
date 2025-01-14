import { fetchBlogById } from "@/app/lib/fetch";
import { DeleteForm } from "@/app/ui/deleteForm";

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
        <form
          action={`
          /${id}/edit`}
          method="get"
        >
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </form>

        {/* can passdown to server components too */}
        <DeleteForm id={id} />
      </main>
    </>
  );
}
