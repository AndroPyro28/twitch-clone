"use client";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import React from "react";
import { ChatToggle, LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({
  user,
  stream,
  isFollowing,
}) => {
  const { identity, name, token } = useViewerToken(user.id);

  const { collapsed, onChangeVariant, onCollapsed, onExpand, variant } =
    useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <div className="">Cannot watch the stream</div>;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed  top-[100px] right-2  z-50">
          {" "}
          <ChatToggle />{" "}
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_SITE_URL}
        className={cn(
          "grid  grid-cols-1 lg:gap-y-0  lg:grid-cols-3  xl:grid-cols-3  2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2  xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
