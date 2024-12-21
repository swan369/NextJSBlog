import { sql } from "@vercel/postgres";

export async function fetchAllBlogs() {
  try {
    const allBlogs = await sql`SELECT * FROM blogs`;
    return allBlogs.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all blogs");
  }
}

// case insensitive search ILIKE instead of LIKE
export async function fetchSearchedBlogs(term: string) {
  const data = await sql`SELECT * FROM blogs
    WHERE title ILIKE ${"%" + term + "%"}`;

  return data.rows;
}
