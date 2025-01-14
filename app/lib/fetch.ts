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

export async function fetchBlogById(id: string) {
  const data = await sql`SELECT * FROM blogs
  WHERE _id = ${id}`;
  return data.rows[0];
}

// fetch image by id via URL on blog card
export async function getImage(id: string) {
  const result = await sql`
    SELECT image_file, image_type FROM blogs WHERE _id = ${id}
  `;

  const row = result.rows[0];
  // console.log("getImage:", row); // getImage: {image_file: 'iVBORw0KGgj... > 250 VARCHAR }

  if (!row || !row.image_file) {
    console.log("No image found for ID:", id);
    return null;
  }

  // Convert the base64 string to a Buffer
  const imageBuffer = Buffer.from(row.image_file, "base64");

  console.log("image_type:", row.image_type);

  return {
    data: imageBuffer, // The actual image as a Buffer
    type: row.image_type, // The MIME type of the image
  };
}

// create table blogs
import { db } from "@vercel/postgres";
const client = await db.connect();

export async function createTableBlogs() {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    await client.sql`CREATE TABLE IF NOT EXISTS blogs(
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,title VARCHAR(50) NOT NULL,
        detail TEXT NOT NULL,
        author VARCHAR(50) NOT NULL,
        image_url VARCHAR(50),
        image_file TEXT,
        image_type VARCHAR(50),
        author_id UUID NOT NULL,
        date VARCHAR(50) NOT NULL
          )`;

    await client.sql`
          CREATE TABLE IF NOT EXISTS authors(
          _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(50) UNIQUE NOT NULL
          )
          `;

    await client.sql`
        CREATE TABLE IF NOT EXISTS users(
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL
        )
        `;

    console.log("create table blogs, users, authors success");
    return Response.json("table blogs created successfully");
  } catch (error) {
    const err = error as Error;
    console.error(err, "error setting up blogs table");
    return Response.json({ error: err.message });
  }
}
