"use client";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import React, { PropsWithChildren, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  const { collapsed, onCollapsed, onExpand } = useCreatorSidebar(
    (state) => state
  );
  const matches = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (matches) {
      onCollapsed();
    } else {
      onExpand();
    }
  }, [matches, onCollapsed, onExpand]);
  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
