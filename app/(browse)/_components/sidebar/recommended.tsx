"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import React from "react";
import {UserItem, UserItemSkeleton} from "./user-item";

interface RecomemdedProps {
  data: User[];
}
export const Recommended: React.FC<RecomemdedProps> = ({ data }) => {
  const { collapsed } = useSidebar();
  console.log(data.length);
  const showLabel = !collapsed && data?.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm  align-text-bottom text-gray-400">
            Recommended
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
            <UserItem key={`recommemded-user-${user.id}`} 
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
            />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = ()=> {
  return<ul className="px-2">
    {[...Array(3)].map((_, i) => (
      <UserItemSkeleton key={i}/>
    ))}
  </ul>
}