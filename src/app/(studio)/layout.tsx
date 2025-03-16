import { StudioLayout } from "@/Modules/studio/ui/layouts/studio-layout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;
