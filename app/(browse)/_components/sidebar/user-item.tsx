"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import React from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-badge";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
export const UserItem: React.FC<UserItemProps> = ({
  imageUrl,
  username,
  isLive,
}) => {
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
            "flex items-center w-full gap-x-4 relative",
            collapsed && "justify-center"
          )}
        >
          <div className={cn("animate-none", (collapsed && isLive) && "animate-pulse",)}>
            <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          </div>
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px]  rounded-full " />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
