"use client";
import { updateBlog } from "../lib/actions";
import { Blog } from "../lib/definitions";

export function UpdateBlog({ blog }: { blog: Blog }) {
  const { _id, title, detail, image_url, author, author_id } = blog;

  //   const initialState = {
  //     message: "",
  //   };

  //   const [state, formAction, isPending] = useActionState(
  //     updateBlogWith_id,
  //     initialState
  //   );

  //updateBlog only receives formData when action = {updateBlog}. If wanna add another argument like id, you can't like: action  = {updateBlog(id)}. You need to use a callback
  // first option to get action updateBlog to receive more than one arguments .e.g id

  // second option
  // const updateBlogWith_id = updateBlog.bind(null, id);

  const updateBlogWith_id = async (formData: FormData) => {
    // not allowed to use "use server" as inline in client components
    // only server components can use inline "use server"
    await updateBlog(_id, formData);
  };
  return (
    <>
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <form
          // turning action to "somewhat" a listener/handler
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
