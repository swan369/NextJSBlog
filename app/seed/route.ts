import { db } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

import { blogs, authors, users } from "../lib/placeholder"; // using ESM export method

const client = await db.connect();

// seed blogs
async function seedBlogs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS blogs (
      _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      detail TEXT NOT NULL,
      author VARCHAR(50) NOT NULL,
      image_url VARCHAR(50),
      image_file TEXT,
      image_type TEXT,
      author_id UUID NOT NULL,
      date VARCHAR(50) NOT NULL
    )`;

  const insertedBlogs = await Promise.all(
    blogs.map(
      (blog) =>
        client.sql`
            INSERT INTO blogs(
              _id, title, detail, image_url, author, author_id, date
            )
            VALUES(
              ${blog._id}, 
              ${blog.title}, 
              ${blog.detail}, 
              ${blog.image_url}, 
              ${blog.author},
              ${blog.author_id}, 
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

// seed users
async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
      CREATE TABLE IF NOT EXISTS users(
      _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) UNIQUE NOT NULL
      )
      `;

  const insertedUsers = await Promise.all(
    users.map(
      (user) =>
        client.sql`INSERT INTO users
              (_id, name, email, password)
               VALUES(
              ${user._id},
              ${user.name},
              ${user.email},
              ${user.password}
              )
              ON CONFLICT (_id) DO NOTHING;
              `
    )
  );

  return insertedUsers;
}

async function rehashPasswords() {
  try {
    const users = await sql`SELECT * FROM users`;
    for (const user of users.rows) {
      if (user.password.startsWith("$2b$")) {
        console.log(`Password for user ${user.email} is already hashed`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`UPDATE users SET password=${hashedPassword} WHERE email=${user.email}`;
      console.log(`Rehashed password for user: ${user.email}`);
    }
  } catch (error) {
    const err = error as Error;
    console.error("Error rehashing passwords:", err.message);
  }
}
// this is not automatically called, hence must specify when this route is reached.
rehashPasswords();

// this is automatically called when the route points here by NextJS
const GET = async () => {
  try {
    await client.sql`BEGIN`;
    await seedBlogs();
    await seedAuthors();
    await seedUsers();
    await client.sql`COMMIT`;
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    // Typecast 'error' to Error to safely access 'message'
    const err = error as Error;
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export { GET };
