import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "size-8",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  username,
  isLive,
  size,
  showBadge,
}) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          "",
          isLive && "ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0].toUpperCase()}
          {username[username.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1.2 transform  -translate-x-1/2"> Live </div>
      )}
    </div>
  );
};

export default UserAvatar;
