import "@/app/ui/global.css";
import { NavBar } from "./ui/nav";
import { SearchProvider } from "./lib/provider";
import { SigningOut } from "./ui/signingout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className="">
        <SearchProvider>
          <SigningOut />
          <NavBar />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}

// remember to mark "use client" on provider
