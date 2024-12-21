"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchBlog() {
  // access object
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      // console.log(term);

      // searchParams pass in, allows access to toString()
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      // replace current URL with:
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0 ">
        <label className="sr-only">Search</label>
        <input
          className="peer block w-7/12 rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
          placeholder={"search here..."}
          onChange={(e) => handleSearch(e)}
          //defaultValue to ensure input field is what is typed in URL query e.g if http://... query=k, will appear k in input field when reload
          defaultValue={searchParams.get("query")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      <MagnifyingGlassIcon className="size-9 inline md:hidden mr-6" />
    </>
  );
}
