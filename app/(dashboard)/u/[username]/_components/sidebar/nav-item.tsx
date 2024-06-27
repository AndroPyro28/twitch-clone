import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}
export const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  isActive,
  label,
}) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <Button
      className={cn(
        "w-full h-12 bg-transparent hover:bg-accent",
        collapsed ? "justify-center" : "justify-start1",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex item-center gap-x-4">
          {" "}
          <Icon className={cn("size-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex  items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
