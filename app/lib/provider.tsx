// Add the "use client" directive at the top of your provider.tsx file to make it a client component. This allows you to use React hooks like useContext and useState.
"use client";

import { useContext, createContext, useState, ReactNode } from "react";

import { SearchContextType, Blog } from "@/app/lib/definitions";

// tells generics <T> is type SearchContexType or undefined.
// instead of undefined, you can {query:""}, but then can't use <undefined>

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const test = "Barry";

  return (
    <div>
      <SearchContext.Provider
        value={{ searchQuery, setSearchQuery, blogs, setBlogs, test }}
      >
        {children}
      </SearchContext.Provider>
    </div>
  );
}

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context) {
    return context;
  } else throw new Error("useSearch only used by children of SearchProvider");
};
