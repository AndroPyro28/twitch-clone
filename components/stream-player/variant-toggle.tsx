"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
  const { onCollapsed, onExpand, collapsed } = useChatSidebar((state) => state);

  let Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapsed();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10  hover:text-primary"
      >
        <Icon className="size-4" />
      </Button>
    </Hint>
  );
};

export const ChatToggleSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute size-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  );
};