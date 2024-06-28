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
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="full flex items-center gap-x-2">
            <Input
              value={value || ""}
              disabled
              className="rounded-[10px]"
              placeholder="Server Url"
            />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
