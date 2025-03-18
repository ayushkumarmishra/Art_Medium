import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

import { AuthButton } from "@/Modules/auth/ui/components/auth-button";
import { StudioUploadModal } from "../studio-upload-modal";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 px-2 pr-2 z-50 flex items-center bg-white border-b shadow-md">
      <div className="flex items-center w-full gap-4">
        {/** Menu and Logo */}

        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href={"/studio"}>
            <div className="flex items-center gap-4 p-4">
              <Image src="/logo.svg" height={32} width={32} alt="Logo" />
              <p className="text-xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>

        {/** Created a Space between the studio logo and the username logo */}
        <div className="flex-1"></div>

        <div className="flex item-center gap-4 flex-shrink-0">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
