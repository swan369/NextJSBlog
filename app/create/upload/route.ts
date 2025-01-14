// import { db } from "@vercel/postgres";
// import { NextResponse } from "next/server";
// import { sql } from "@vercel/postgres";

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       return NextResponse.json(
//         { error: "File must be an image" },
//         { status: 400 }
//       );
//     }

//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       return NextResponse.json(
//         { error: "File size must be less than 5MB" },
//         { status: 400 }
//       );
//     }

//     // Convert file to Buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Store in database
//     const result = await sql`
//       INSERT INTO images (
//         original_name,
//         mime_type,
//         size,
//         data
//       ) VALUES (
//         ${file.name},
//         ${file.type},
//         ${file.size},
//         ${buffer}
//       )
//       RETURNING id
//     `;

//     return NextResponse.json({
//       success: true,
//       imageId: result.rows[0].id,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }

// // app/api/images/[id]/route.ts
// import { notFound } from "next/navigation";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const result = await sql`
//       SELECT data, mime_type
//       FROM images
//       WHERE id = ${params.id}
//     `;

//     if (result.rows.length === 0) {
//       return notFound();
//     }

//     const image = result.rows[0];
//     const base64Image = Buffer.from(image.data).toString("base64");
//     const dataUrl = `data:${image.mime_type};base64,${base64Image}`;

//     return NextResponse.json({ dataUrl });
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch image" },
//       { status: 500 }
//     );
//   }
// }

// const client = await db.connect();

// async function createBlogTable() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`CREATE TABLE IF NOT EXISTS blogs (
//       _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       title VARCHAR(50) NOT NULL,
//       detail TEXT NOT NULL,
//       author VARCHAR(50) NOT NULL,
//       image_name TEXT, NOT NULL
//       image_data BYTEA, NOT NULL
//       author_id UUID NOT NULL,
//       image_name TEXT,
//       image_data BYTEA,
//       date VARCHAR(50) NOT NULL
//     )`;
// }

// // export async function POST(req: Request, res: Response) {
// //   const data = req.body;

// //   await client.sql`BEGIN`;
// //   await createBlogTable();
// //   await client.sql`COMMIT`;
// //   return;
// // }
