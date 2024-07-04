import { cn } from "@/lib/utils";
import React from "react";

interface LiveBadgeProps {
  className?: string;
}
export const LiveBadge: React.FC<LiveBadgeProps> = ({ className }) => {
  return <div className={cn(" animate-pulse bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wide", className)}>Live</div>;
};
