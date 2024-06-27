"use client";
import { Button } from "@/components/ui/button";
import { CheckCheck, CheckIcon, Copy } from "lucide-react";
import React from "react";

interface CopyClientProps {
  value?: string;
}
export const CopyButton: React.FC<CopyClientProps> = ({ value }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    });
  };
  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant={"ghost"}
      size={"sm"}
    >
      <Icon className="size-4" />
    </Button>
  );
};
