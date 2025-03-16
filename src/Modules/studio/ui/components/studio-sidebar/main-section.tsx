"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useClerk, useAuth } from "@clerk/clerk-react";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Home",
    icon: HomeIcon,
    url: "/",
  },
  {
    title: "Subscriptions",
    icon: PlaySquareIcon,
    url: "/feed/subscriptions",
    auth: true,
  },
  {
    title: "Trending",
    icon: FlameIcon,
    url: "/feed/trending",
  },
];

const MainSection = () => {
  /**
   * This is used to the check if for eg "subscription" is only redirected if the user is authenticated so it is kind of protecting and only be shown if the user is signed-in"
   * **/

  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex items-start gap-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false}
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault();
                    return clerk.openSignIn();
                  }
                }}
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSection;
