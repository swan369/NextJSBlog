// auth.ts created for the bcrypt package as bcrypt relies on node.js API not available in Next.js Middleware.

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

// validate email and password before checking if the user exists in database
import { z } from "zod";

// these libraries after validating with zod
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

// after VALIDATING CREDENTIALS with Zod: create new getUser function that queries the user from the database:
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    console.log("Fetched user:", user.rows[0]);

    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // providers: [] replaced by :
  providers: [
    Credentials({
      async authorize(credentials) {
        // zod to validate email and password
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        // ......................

        // if validation is success, call bycrypt.compare to check if passwords match:
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          // if no such user, return null
          if (!user) return null;

          //otherwise, check if password matches.
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("user password", user.password);

          console.log("Password matches:", passwordsMatch);

          // if password matches i.e. true, return user
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        // if validation fails or password doesn't match, return null
        return null;
      },
    }),
  ],
});
