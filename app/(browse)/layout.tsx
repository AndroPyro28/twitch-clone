import React, { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { SideBarSkeleton, Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SideBarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
}
