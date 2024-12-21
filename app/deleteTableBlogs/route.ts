// DELETE
import { db } from "@vercel/postgres";

const client = await db.connect();

async function deleteBlogsTable() {
  await client.sql`DROP TABLE IF EXISTS blogs`;
}

export async function GET() {
  try {
    await deleteBlogsTable();
    return Response.json({ message: "table blogs deleted" });
  } catch (error) {
    const err = error as Error;
    return Response.json({ error: err.message });
  } finally {
    client.release();
  }
}
