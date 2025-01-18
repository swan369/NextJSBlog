// use client means you can use event listeners
"use client";
import { SearchBar } from "@/app/ui/searchBar";
import Link from "next/link";
import { Suspense } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

const links = [
  { name: "Contact", href: "/contact" },
  { name: "addBlog", href: "/create" },
];

const linkBoxes = links.map((link) => {
  return (
    <Link
      key={link.name}
      href={link.href}
      className="flex h-20 grow items-center justify-center gap-2 rounded-md p-3 text-sm font-bold hover:bg-blue hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      {link.name === "addBlog" ? <PlusIcon className="h-10 w-10" /> : link.name}
    </Link>
  );
});

export function NavBar({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="bg-purple-500 text-white max-h-20 content-center">
        <div className="flex gap-2 justify-between items-center  bg-orange-400">
          <Link href="/" className="">
            <div className="h-full flex ml-12 items-center text-3xl md:text-5xl font-bold text-nowrap">
              FitnessFinance
            </div>
          </Link>

          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>

          <div className="hidden lg:flex lg:bg-orange-400 lg:w-1/3 lg:justify-around lg:font-bold lg:items-center lg:text-nowrap">
            {linkBoxes}
            {/* child is signingout-server component */}
          </div>
          <div className="block">{children}</div>
        </div>
      </nav>
    </>
  );
}
