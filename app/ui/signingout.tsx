import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

export async function SigningOut() {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";
        if (session) await signOut();
        else redirect("/login");
      }}
    >
      <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md text-sm font-bold hover:bg-blue hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 text-nowrap mr-5">
        <PowerIcon className="w-6" />
        <div className="">{session ? "Sign Out" : "Sign In"}</div>
      </button>
    </form>
  );
}

// import { PowerIcon } from "@heroicons/react/24/outline";
// import { signOut, auth } from "@/auth";
// import { redirect } from "next/navigation";

// export async function SigningOut() {
//   const session = await auth();
//   return (
//     <form
//       action={async () => {
//         "use server";
//         if (session) await signOut();
//         else redirect("/login");
//       }}
//     >
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block text-2xl">
//           {session ? "Sign Out" : "Sign In"}
//         </div>
//       </button>
//     </form>
//   );
// }
