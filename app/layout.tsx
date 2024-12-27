import "@/app/ui/global.css";
import { NavBar } from "./ui/nav";
import { SearchProvider } from "./lib/provider";
// import { SearchProvider } from "@/app/lib/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-w-200">
      <body className="">
        <SearchProvider>
          <NavBar />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
