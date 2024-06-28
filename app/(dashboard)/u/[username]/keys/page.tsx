import { Button } from "@/components/ui/button";
import React from "react";
import { UrlCard } from "./_components/url-card";
import { getCurrentUser } from "@/lib/service/auth";
import { getStreamByUserId } from "@/lib/service/stream";
import { KeyCard } from "./_components/key-card";

const KeysPage = async () => {
  const self = await getCurrentUser();
  const stream = await getStreamByUserId(self.id);
  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl  font-bold"> Keys & URLs</h1>
        <Button variant={"primary"}>Generate</Button>
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;