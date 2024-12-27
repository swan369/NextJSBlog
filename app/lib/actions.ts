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
  image_url: z.string(),
  author: z.string(),
  author_id: z.string(),
  date: z.string(),
});

// create Blog

// due to <form action = {createBlog}>, the function auto receives formData that contains user input
export async function createBlog(formData: FormData) {
  const CreateBlog = FormSchema.omit({ _id: true, date: true });

  // extracted input
  const rawFormData = {
    title: formData.get("title"),
    detail: formData.get("detail"),
    image_url: formData.get("image_url"),
    author: formData.get("author"),
    author_id: formData.get("author_id"),
  };

  console.log(rawFormData);

  // parse into validator =>
  const { title, detail, image_url, author, author_id } =
    CreateBlog.parse(rawFormData);
  // access only the first data part [0] i.e. YYYY-MM-DD. Don't need the time and seconds. split("T") splits the date into an array separating date and time. T is a separator between the date and time.
  const date = new Date().toISOString().split("T")[0];

  await sql`
  INSERT INTO blogs (
  title, detail, image_url, author, author_id, date
  )
  VALUES(
  ${title},
  ${detail},
  ${image_url},
  ${author},
  ${author_id},
  ${date}
  )
  `;

  revalidatePath("/create");
  redirect("/");
}

//update blog by id
export async function updateBlog(
  id: string,
  formData: FormData
): Promise<void> {
  //extract raw data
  const rawUpdate = {
    title: formData.get("title"),
    detail: formData.get("detail"),
    author: formData.get("author"),
    author_id: formData.get("author_id"),
    image_url: formData.get("image_url"),
  };

  const updatedFormSchema = FormSchema.omit({ _id: true, date: true });

  const validatedUpdate = updatedFormSchema.parse(rawUpdate);

  //extract deconstruct values

  const { title, detail, image_url, author, author_id } = validatedUpdate;

  try {
    await sql`UPDATE blogs
    SET title = ${title}, detail = ${detail}, image_url = ${image_url}, author = ${author}, author_id = ${author_id}
    WHERE _id = ${id}`;
  } catch (error) {
    console.log("error:", error);
    throw new Error("Database Error: Failed to update blog");
  }

  revalidatePath("/[id]/edit");
  // redirect must be last, and outside try{} block, cuz redirect works by throwing an error
  redirect("/");
}
