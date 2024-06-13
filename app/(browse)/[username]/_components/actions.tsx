"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface ActionProps {
  isFollowing: boolean;
}
export const Actions: React.FC<ActionProps> = ({ isFollowing }) => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      onFollow("123");
    });
  };

  return (
    <Button
      disabled={isPending}
      variant={"primary"}
      onClick={onClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
