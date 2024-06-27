import { getCurrentUser } from "@/lib/service/auth";
import { getStreamByUserId } from "@/lib/service/stream";
import React from "react";
import { ToggleCard } from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getCurrentUser();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Setting</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard field="isChatEnabled" label="Enable chat" value={stream.isChatEnabled}  />
        <ToggleCard field="isChatDelayed" label="Enable chat delay" value={stream.isChatDelayed}  />
        <ToggleCard field="isChatFollowersOnly" label="Must be following  to chat" value={stream.isChatFollowersOnly}  />
      </div>
    </div>
  );
};

export default ChatPage;
