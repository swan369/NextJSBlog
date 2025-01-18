"use client";

import { createBlog } from "../lib/actions";
// import { useState } from "react";
import { useActionState } from "react";

export function CreateBlogForm() {
  // const [error, setError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    undefined
  );

  type State = { message: string } | void;

  async function handleSubmit(state: State, formData: FormData) {
    // do not use inline "use server" in client components
    // try {
    return await createBlog(formData);

    //   if (result.message) {
    //     setError(result.message);
    //     return;
    // below is default behaviour of throw new error. Also requires function return type  :Promise<{ error: string | null}> in actions because Nextjs does not know for certain
    // if (result.error) {
    //   setError(result.error);
    //   return;
    // }
    // } catch (error) {
    //   const err = error as Error;
    //   console.log(err);
    //   setError("Failed to create blog");
    // }
  }
  return (
    <>
      <form
        action={formAction}
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
          ></textarea>
        </div>
        <div>
          <label>ImageFile</label>
          <input
            type="file"
            name="image_file"
            className="w-full p-2 border rounded"
            // required
          />
        </div>
        {state?.message && <p aria-live="polite">{state.message}</p>}

        <div>
          <label className="block text-gray-700 text-sm font-medium">
            Image_URL:
          </label>
          <input
            name="image_url"
            type="url"
            placeholder="Enter the image_URL"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-500 text-white max-w-56 font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
