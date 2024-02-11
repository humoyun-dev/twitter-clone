"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Bell, Home, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "@/components/sidebar/sidebar-item";
import SidebarPostButton from "./sidebar-post-button";
import SidebarAccount from "./sidebar-account";
import { MdOutlineExplore } from "react-icons/md";

const Sidebar = ({ user }: { user: any }) => {
  const { data: session, status }: any = useSession();

  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      path: `/notifications/${user?._id}`,
      icon: Bell,
      notification: user?.hasNewNotifications,
    },
    {
      label: "Profile",
      path: `/profile/${user?._id}`,
      icon: User,
    },
    {
      label: "Explore",
      path: "/explore",
      icon: MdOutlineExplore,
    },
  ];

  return (
    <div className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 pl-2">
      <div className={`flex flex-col space-y-2`}>
        <div
          className={`rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition`}
        >
          <Image src={`/images/logo.svg`} alt={`logo`} width={56} height={56} />
        </div>
        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem label={item.label} icon={item.icon} />
          </Link>
        ))}

        <SidebarPostButton />
      </div>
      <SidebarAccount user={user} />
    </div>
  );
};

export default Sidebar;
