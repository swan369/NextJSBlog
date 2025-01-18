"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSearch } from "../lib/provider";
import { usePathname } from "next/navigation";
import { buttonTest } from "../lib/actions";

export function SearchBar() {
  // it's a client component, hence can use hook:useSearchParams(), won't receive argument searchParams
  const searchParams = useSearchParams();
  // const query = searchParams.get("query");
  // console.log(query);
  const { replace } = useRouter();

  // searchParams provides the current state of the query parameters in the URL.
  // searchParams is a live object, does not have functions to change it except "get".
  //  To change/add, you do so by URLSearchParams() creating const params (an object) allowing access to "set","delete", and .toString() which gives you: query=java (this format u want)
  // you can searchParams.get("query").toString(), will give you java
  // thus besides change/add, allows ease of update to URL
  // searchParams only reflects the new URL query after replace() effects

  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    //
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // had to use client side state inside Provider, to ensure capture and render of lightning fast user inputs. Used in combination with value instead of default value in <input>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchQuery(term);
    handleSearch(term);
  };

  return (
    <>
      <div className="hidden md:flex justify-center w-96 min-w-96 items-center">
        <label className="sr-only">Search</label>
        <input
          type="text"
          className="w-3/4 h-10 rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
          placeholder="search here..."
          onChange={(e) => handleChange(e)}
          // defaultValue only set the initial value when first rendered. Useful for prefilling forms like edits
          // defaultValue={searchParams.get("query")?.toString()}

          // value updates dynamically when user inputs
          // it is controlled programatically. Good for control state like fast user inputs. Good for fast searching
          value={searchQuery}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          // console.log("I am X")
          buttonTest();
        }}
      >
        X
      </button>

      <MagnifyingGlassIcon className="inline md:hidden max-h-10 max-w-10 mr-6" />
    </>
  );
}
