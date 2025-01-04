// add logic to protect your routes
// 1. import NextAuthConfig
import type { NextAuthConfig } from "next-auth";

// set custom routes for login else NextJS default pages
export const authConfig = {
  pages: {
    // instead of default sign in Next.js page, direct to:
    signIn: "/login",
  },

  callbacks: {
    // Handle authorization checks
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Strict boolean check
      const protectedRoutes = [
        "/create",
        "/edit",
        "/delete",
        /^\/[0-9a-fA-F-]+\/edit$/, // Regex for dynamic edit routes
      ];

      const isProtectedRoute = protectedRoutes.some((route) => {
        if (typeof route === "string") {
          return nextUrl.pathname === route;
        } else if (route instanceof RegExp) {
          return route.test(nextUrl.pathname);
        }
        return false;
      });

      if (isProtectedRoute) {
        if (isLoggedIn) return true; // Allow access if logged in
        return false; // Deny access if not logged in
      }

      return true; // Allow access to non-protected routes
    },

    // Handle redirect after login
    // Creates a URL object by combining url (the target URL) and baseUrl (to ensure it's a valid, absolute URL).
    // Uses the searchParams.get("callbackUrl") method to extract the value of the callbackUrl query parameter from the URL.
    // The callbackUrl query parameter is typically added by NextAuth to indicate where the user should be redirected after logging in.

    async redirect({ url, baseUrl }) {
      //   console.log("url", url);
      //   console.log("baseurl", baseUrl);
      //   baseurl: http://localhost:3000
      //   url http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fcc27c14a-0acf-4f4a-a6c9-d45682c144b9%2Fedits

      // Check if 'callbackUrl' is provided
      // // Example:
      // If a user tries to access /edit, they'll be redirected to /login?callbackUrl=/edit.
      // The callbackUrl will store /edit in this case.
      const callbackUrl = new URL(url, baseUrl).searchParams.get("callbackUrl");

      if (callbackUrl) {
        // console.log("i was here");
        // console.log("callbackurlbarr:", callbackUrl); // callbackurlbarr: http://localhost:3000/cc27c14a-0acf-4f4a-a6c9-d45682c144b9/edit

        // Redirect to the callbackUrl if present
        return callbackUrl;
      }
      console.log("baseurl:", baseUrl);

      // Default behavior: Return to baseUrl if no callbackUrl
      return baseUrl;
    },
  },

  providers: [], // Add your authentication providers here (Google, GitHub, etc.)
} satisfies NextAuthConfig;

//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user; // ensures strict boolean
//       //   const protectedRoutes = [];
//       const protectedRoutes = [
//         // "/",
//         "/create",
//         "/edit",
//         "/delete",
//         /^\/[0-9a-fA-F-]+\/edit$/,
//         // "/deleteTableBlogs",
//       ];

//       //   const isProtectedRoutes = protectedRoutes.some((route) =>
//       //     nextUrl.pathname.startsWith(route)
//       //   );

//       const isProtectedRoute = protectedRoutes.some((route) => {
//         if (typeof route === "string") {
//           return nextUrl.pathname === route;
//         } else if (route instanceof RegExp) {
//           return route.test(nextUrl.pathname);
//         }
//         return false;
//       });

//       if (isProtectedRoute) {
//         return isLoggedIn; // Allow access only if logged in
//       }

//       if (isLoggedIn) {
//         // Redirect logged-in user to a default protected page if on a public page
//         return Response.redirect(new URL("/create", nextUrl));
//       }

//       return true; // Allow access to non-protected routes
//     },
//   },
//   //.....................

//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;
