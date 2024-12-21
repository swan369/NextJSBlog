import { db } from "@vercel/postgres";

const client = await db.connect();

async function fetchAlexTestBlogs() {
  const data = await client.sql`
    SELECT title, name
    FROM blogs
    JOIN authors
    ON blogs.author_id = authors._id
    WHERE name = 'Alex Chen'
    `;

  return data.rows;
}

export async function GET() {
  try {
    return Response.json(await fetchAlexTestBlogs());
  } catch (error) {
    //typecasting error as Error object, to access err.message
    const err = error as Error;
    console.log("error fetching:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
