import { deleteBlog } from "../lib/actions";

// better to receive props from parent then receive Promise Params. Unless you are a Page component.
export async function DeleteBlogForm({ id }: { id: string }) {
  const deleteBlogAssist_id = async () => {
    "use server";
    await deleteBlog(id);
  };

  return (
    <form
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[100px]"
      action={deleteBlogAssist_id}
    >
      <button type="submit">Delete</button>
    </form>
  );
}
