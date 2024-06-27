import { Input } from "@/components/ui/input";
import { Inter_Tight } from "next/font/google";
import React from "react";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
  value: string | null;
}
export const UrlCard: React.FC<UrlCardProps> = ({ value }) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p>Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input  className="rounded-[10px]" value={value || ""} disabled placeholder="Server URL" />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
