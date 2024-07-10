"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ChatToggle } from "./chat-toggle";

export const ChatHeader = () => {

  return (
    <div className="relative p-3 border-b">
        <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle />
        </div>
      <p className="font-semibold  textprimary  text-center">Stream Chat</p>

      {
        // TODO: Toggle Chat Community
      }
    </div>
  );
};

export const ChatHeaderSkeleton = ()  => {
    return  <div className="relative p-3 border-b hidden md:block">
        <Skeleton className="absolute size-6 left-3 top-3"/>
        <Skeleton className="w-28 h-6 mx-auto"/>
    </div>
}
