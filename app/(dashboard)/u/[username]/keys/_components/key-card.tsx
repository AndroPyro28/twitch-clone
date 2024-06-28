"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}
export const KeyCard: React.FC<KeyCardProps> = ({ value }) => {
  // show state
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(!show);
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              className="rounded-[10px]"
              placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button size={"sm"} variant={"link"} className="text-white" onClick={onClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
