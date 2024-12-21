// DELETE
import { db } from "@vercel/postgres";
const client = await db.connect();

export async function deleteBlogsTable() {
  // throw new Error("Failed to Delete Invoice");

  //   await sql`DELETE FROM invoices WHERE id = ${id}`;
  //   //   revalidatePath("/dashboard/invoices");

  await client.sql`DROP TABLE IF EXISTS blogs`;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await deleteBlogsTable();
    await client.sql`COMMIT`;

    return Response.json({ message: "table blogs deleted" });
  } catch (error) {
    const err = error as Error;
    await client.sql`ROLLBACK`;
    return Response.json({ error: err.message });
  } finally {
    client.release();
  }
}
