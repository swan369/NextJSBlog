// DELETE
import { db } from "@vercel/postgres";

const client = await db.connect();

async function deleteBlogs() {
  await client.sql`DROP TABLE IF EXISTS blogs`;
}
// must follow http convention DELETE, PUT, POST, GET
export async function DELETE() {
  try {
    await deleteBlogs();
    return Response.json({ message: "table blogs deleted" });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message });
  } finally {
    client.release();
  }
}
