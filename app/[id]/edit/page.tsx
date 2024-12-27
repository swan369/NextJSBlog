// must be default at page level
// import { updateBlog } from "@/app/lib/actions";
import { fetchBlogById } from "@/app/lib/fetch";
import { updateBlog } from "@/app/lib/actions";

export default async function UpdateBlog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const { title, detail, image_url, author, author_id } = await fetchBlogById(
    id
  );

  //updateBlog only receives formData when action = {updateBlog}. If wanna add another argument like id, you can't: action  = {updateBlog(id)}. You need to use a callback
  // first option to get action updateBlog to receive more than one arguments .e.g id
  const updateBlogWith_id = async (formData: FormData) => {
    "use server";
    await updateBlog(id, formData);
  };

  // second option
  // const updateBlogWith_id = updateBlog.bind(null, id);

  return (
    <>
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <form
          action={updateBlogWith_id}
          className="flex flex-col gap-6 w-3/4 bg-white p-8 rounded-lg shadow-md"
        >
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Title:
            </label>
            <input
              type="text"
              // name attribute tells "FormData.get("title")" where to look for input values
              name="title"
              placeholder="Enter the blog title"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              // default value for prefilled-good for edits, show initial render. No control
              defaultValue={title}

              // it is controlled programatically. Good for control state like user input. Good for fast searching
              // value={title}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Detail:
            </label>
            <textarea
              name="detail"
              placeholder="Write the blog details here..."
              className="mt-2 w-full  p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={detail}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Image URL:
            </label>
            <input
              name="image_url"
              type="url"
              placeholder="Enter the image URL"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={image_url}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Author:
            </label>
            <input
              name="author"
              type="text"
              placeholder="Enter the author name"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={author}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Author_Id:
            </label>
            <input
              type="text"
              name="author_id"
              placeholder="Enter the author ID"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={author_id}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white max-w-56 font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
