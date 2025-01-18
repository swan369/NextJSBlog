import "@/app/ui/global.css";
import { SearchProvider } from "./lib/provider";
import { SigningOut } from "./ui/signingout";
import { NavBar } from "./ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className="">
        <SearchProvider>
          <NavBar>
            {/* wrapping needed as SigningOut is a server component */}
            <SigningOut />
          </NavBar>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}

// remember to mark "use client" on provider
