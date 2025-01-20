import { DeleteForm } from "@/app/ui/deleteForm";
import { fetchBlogById } from "@/app/lib/fetch";
import Image from "next/image";
import { redirect } from "next/navigation";

// server component, receives props params. If client component, have to use useParams()
// since NextJS 15, must use Promise
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const id = (await props.params).id;

  const { title, detail } = await fetchBlogById(id);

  const handleDirectAction = async function () {
    // "use server" in line in server not in client, or use module "use server" for both
    "use server";
    redirect(`/${id}/edit`);
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="w-2/3 p-10">
        <Image
          className="rounded-t-lg object-cover"
          src={`/images/${id}`}
          alt={title || "Blog image"}
          height={400}
          width={500}
          // sizes="100%"
          priority={true}
        />
        <div className="w-full p-8">
          <h1 className="font-bold text-3xl">{title}</h1>
          {/* {image_url} */}
        </div>

        <div className="w-full p-8">
          {detail}
          {/* have to use form, "get" appends parameters to the URL hence acts somewhat like redirect */}
        </div>
        <div className="flex justify-end w-full gap-2 pr-8">
          <form
            action={handleDirectAction}
            // instead of redirect via action methods, u can directly change URL to the page to render
            // action = {`/${id}/edit`}
            // must use method="get"/"post" // use this instead of POST, if no body to send
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
        </div>
      </div>
    </main>
  );
}
