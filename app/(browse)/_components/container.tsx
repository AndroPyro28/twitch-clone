"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery,  } from "usehooks-ts";
import React, { PropsWithChildren, useEffect } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  const { collapsed, onCollapsed, onExpand } = useSidebar((state) => state);

  const matches = useMediaQuery("(max-width:1024px)");

  useEffect(() =>  {
    if(matches) {
        onCollapsed()
    }
    else {
        onExpand()
    }
  }, [matches, onCollapsed, onExpand])
  
  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
