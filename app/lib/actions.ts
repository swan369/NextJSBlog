"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 02d92eea-ed2c-4ce4-9c9a-dd79bd44ab07

// https://picsum.photos/200/300

// type validation by zod
const FormSchema = z.object({
  _id: z.string(),
  title: z.string(),
  detail: z.string(),
  imageURL: z.string(),
  author: z.string(),
  author_Id: z.string(),
  date: z.string(),
});

// create Blog
const CreateBlog = FormSchema.omit({ _id: true, date: true });

export async function createBlog(formData: FormData) {
  // extracted input
  const rawFormData = {
    title: formData.get("title"),
    detail: formData.get("detail"),
    imageURL: formData.get("imageURL"),
    author: formData.get("author"),
    author_Id: formData.get("author_Id"),
  };

  // console.log(rawFormData);

  // parse into validator =>
  const { title, detail, imageURL, author, author_Id } =
    CreateBlog.parse(rawFormData);

  const date = new Date().toISOString().split("T")[0];

  await sql`
  INSERT INTO blogs (
  title, detail, imageURL, author, author_Id, date
  )
  VALUES(
  ${title},
  ${detail},
  ${imageURL},
  ${author},
  ${author_Id},
  ${date}
  )
  `;

  revalidatePath("/create");
  redirect("/");
}
