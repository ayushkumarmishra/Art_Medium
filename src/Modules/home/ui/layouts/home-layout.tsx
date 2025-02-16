import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { HomeNavbar } from "../components/home-navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex min-h-screen pt-[4rem]">{children}</div>
      </div>
    </SidebarProvider>
  );
};
