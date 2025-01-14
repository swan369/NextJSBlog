// use client means you can use event listeners
"use client";
import { SearchBar } from "@/app/ui/searchBar";
import Link from "next/link";
import { Suspense } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Login",
    href: "/login",
  },
  { name: "Contact", href: "/contact" },
  { name: "addBlog", href: "/create" },
];

const linkBoxes = links.map((link) => {
  return (
    <Link
      key={link.name}
      href={link.href}
      className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-bold hover:bg-blue hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      {link.name === "addBlog" ? <PlusIcon className="h-10 w-10" /> : link.name}
    </Link>
  );
});

export function NavBar() {
  return (
    <>
      <nav className="bg-purple-500 text-white h-20 content-center">
        <div className="flex justify-between content-center gap-10 bg-orange-400">
          <Link href="/">
            <div className="pl-12 text-3xl md:text-5xl font-bold text-nowrap ">
              FitnessFinance
            </div>
          </Link>

          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>

          <div className="hidden  md:flex md:bg-orange-500 md:w-1/3 md:justify-around md:font-bold">
            {linkBoxes}
          </div>
        </div>
        {/* <SigningOut /> */}
      </nav>
    </>
  );
}
