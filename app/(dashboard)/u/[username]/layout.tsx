import { getSelfByUsername } from "@/lib/service/auth";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import Navbar from "./_components/navbar";
import {Sidebar} from "./_components/sidebar";

interface CreatorLayoutProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}
const CreatorLayout: React.FC<CreatorLayoutProps> = async ({
  children,
  params,
}) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default CreatorLayout;
