import { db } from "@vercel/postgres";
import { blogs, authors } from "../lib/placeholder"; // using ESM export method

const client = await db.connect();

// seed blogs
async function seedBlogs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS blogs (
      _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      detail TEXT NOT NULL,
      imageURL VARCHAR(255) NOT NULL,
      author VARCHAR(50) NOT NULL,
      author_Id UUID NOT NULL,
      date VARCHAR(50) NOT NULL
    )`;

  const insertedBlogs = await Promise.all(
    blogs.map(
      (blog) =>
        client.sql`
            INSERT INTO blogs(
              _id, title, detail, imageURL, author, author_id, date
            )
            VALUES(
              ${blog._id}, 
              ${blog.title}, 
              ${blog.detail}, 
              ${blog.imageURL}, 
              ${blog.author},
              ${blog.author_Id}, 
              ${blog.date}
            )
            ON CONFLICT (_id) DO NOTHING;
          `
      // only to use if need date in a certain format
      //   ${blog.createdAt.toISOString()},
      //   ${blog.updatedAt.toISOString()}
    )
  );

  return insertedBlogs;
}

// seed authors
async function seedAuthors() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
      CREATE TABLE IF NOT EXISTS authors(
      _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL
      )
      `;

  const insertedAuthors = await Promise.all(
    authors.map(
      (author) =>
        client.sql`INSERT INTO authors
              ( _id, name, email)
               VALUES(
              ${author._id},
              ${author.name},
              ${author.email}
              )
              ON CONFLICT (_id) DO NOTHING;
              `
    )
  );

  return insertedAuthors;
}

const GET = async () => {
  try {
    await client.sql`BEGIN`;
    await seedBlogs();
    await seedAuthors();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    // Typecast 'error' to Error to safely access 'message'
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export { GET };
