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
        // UUID is regular expression hence ...
        /^\/[0-9a-fA-F-]+\/edit$/, // Regex for dynamic edit routes
      ];
      // authenticating aka true if authenticated
      const isProtectedRoute = protectedRoutes.some((route) => {
        if (typeof route === "string") {
          return nextUrl.pathname === route;
        }
        // instanceof is more specific than typeof as regular expressions are also objects and typeof will return it as object.
        else if (route instanceof RegExp) {
          // route is a regExp hence use .test()
          //.test() is a built in method to test whether the string aka nextUrl.pathname matches the regular expression-route
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
      // you need searchParams to extract from url, anything that comes after callbackUrl
      const callbackUrl = new URL(url, baseUrl).searchParams.get("callbackUrl");

      if (callbackUrl) {
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

// redirecting after logged in if not at default page
// if wanna configure for redirect if not on e.g. /dashboard
// const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
