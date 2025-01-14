// DELETE
import { db } from "@vercel/postgres";

const client = await db.connect();

async function deleteBlogs() {
  await client.sql`DROP TABLE IF EXISTS blogs`;
}

async function deleteUsers() {
  await client.sql`DROP TABLE IF EXISTS users`;
}

// must follow http convention DELETE, PUT, POST, GET
export async function GET() {
  try {
    await deleteBlogs();
    await deleteUsers();
    return Response.json({ message: "table blogs deleted" });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message });
  } finally {
    client.release();
  }
}
//// Manually Configure
// new Response(JSON.stringify({ message: "table blogs deleted" }), {
//   status: 200,
//   headers: { "Content-Type": "application/json" },
// });
