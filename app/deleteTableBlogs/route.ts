// DELETE
import { sql } from "@vercel/postgres";

export async function deleteBlogsTable() {
  // throw new Error("Failed to Delete Invoice");

  //   await sql`DELETE FROM invoices WHERE id = ${id}`;
  //   //   revalidatePath("/dashboard/invoices");

  await sql`DROP TABLE blogs`;
}

export async function GET() {
  try {
    await sql`BEGIN`;
    await deleteBlogsTable();
    await sql`COMMIT`;

    return Response.json({ message: "table blogs deleted" });
  } catch (error) {
    const err = error as Error;

    return Response.json({ error: err.message });
  }
}
