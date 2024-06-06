import React from "react";
import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/service/recommended";
// server component

export const Sidebar = async () => {
  const recommemded = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommemded} />
      </div>
    </Wrapper>
  );
};

export const SideBarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35]">
      <ToggleSkeleton  />
      <RecommendedSkeleton />
    </aside>
  );
};
