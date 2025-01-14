import { CreateBlogForm } from "../ui/createBlogForm";

// must use default for pages
export default function Page() {
  return (
    <>
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <CreateBlogForm />
      </main>
    </>
  );
}
