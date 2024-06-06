"use client";
import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import React from "react";

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
    </div>
  );
};