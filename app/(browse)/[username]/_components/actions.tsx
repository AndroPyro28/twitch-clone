"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions: React.FC<ActionProps> = ({ isFollowing, userId }) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = (userId: string) => {
    onFollow(userId)
      .then((data) =>
        toast.success(`You are now following ${data.following.username}`)
      )
      .catch(() => toast.error("Something went wrong"));
  };

  const handleUnfollow = (userId: string) => {
    onUnfollow(userId)
      .then((data) =>
        toast.success(`You have unfollowed ${data.following.username}`)
      )
      .catch(() => toast.error("Something went wrong"));
  };

  const onClick = () => {
    startTransition(() => {
      if (!isFollowing) {
        handleFollow(userId);
      } else {
        handleUnfollow(userId);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      variant={"primary"}
      className="text-white"
      onClick={onClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
