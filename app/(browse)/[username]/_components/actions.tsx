"use client";

import { onBlock, onUnblock } from "@/actions/block";
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

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`Blocked the user ${data.blocked.username}`)
        )
        .catch((error) => toast.error(`Something went wrong.`));
    });
  };

  return (
    <>
      <Button
        type="button"
        disabled={isPending}
        className="text-white rounded-[5px]"
        onClick={onClick}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        type="button"
        className=" bg-white text-black rounded-[5px]"
        onClick={handleBlock}
      >
        Block
      </Button>
    </>
  );
};
