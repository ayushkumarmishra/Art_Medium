import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/Modules/auth/ui/components/auth-button";

export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 px-2 pr-2 z-50 flex items-center bg-white">
      <div className="flex items-center w-full gap-4">
        {/** Menu and Logo will be created here */}

        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href={"/"}>
            <div className="flex items-center gap-1 p-4">
              <Image src="/logo.svg" height={32} width={32} alt="Logo" />
              <p className="text-xl font-semibold tracking-tight">Art Medium</p>
            </div>
          </Link>
        </div>

        {/** Addign the search bar here */}

        <div className="flex flex-1 justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        {/** The Auth Icon for the signin of the user */}
        <div className="flex item-center gap-4 flex-shrink-0">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
