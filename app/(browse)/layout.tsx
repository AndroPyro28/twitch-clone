import React from "react";
import {Navbar} from "./_components/navbar";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar />
      <div className="flex h-full pt-20">
      {children}
      </div>
    </>
  );
}
