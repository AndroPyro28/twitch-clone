"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import React from "react";
import Link from "next/link";
import UserAvatar from "@/components/user-avatar";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
const UserItem: React.FC<UserItemProps> = ({ imageUrl, username, isLive}) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);
  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center wfull gap-x-44",
            collapsed && "justify-center"
          )}
        >
            <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive}  />
        </div>
      </Link>
    </Button>
  );
};

export default UserItem;
