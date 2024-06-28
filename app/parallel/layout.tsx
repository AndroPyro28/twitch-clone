import { getSelfByUsername } from "@/lib/service/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React, { PropsWithChildren } from "react";
const headerList = headers();
const pathname = headerList.get("x-current-path");
interface CreatorLayoutProps {
  children: React.ReactNode;
  team: React.ReactNode
  analytics: React.ReactNode
}
const ParallelLayout: React.FC<CreatorLayoutProps> = async ({
  children,
  analytics,
  team
}) => {
  console.log(pathname)
  return (
    <>
        {children}
        {team}
        {analytics}
    </>
  );
};

export default ParallelLayout;
