import { HomeLayout } from "@/Modules/home/ui/layouts/home-layout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <HomeLayout>{children}</HomeLayout>
    </div>
  );
};

export default Layout;
