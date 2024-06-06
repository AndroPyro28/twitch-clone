"use client";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";

export const Toggle = () => {
  const { collapsed, onCollapsed, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapsed";
  return (
    <>
      {(() => {
        // if
        if (!collapsed)
          return (
            <div className="p-3 pl-6 mb-2 flex items-center w-full">
              <p className="font-semibold text-primary">For you</p>
              <Hint label={label} side="right" asChild>
                <Button
                  className="h-auto  p-2  ml-auto "
                  variant={"ghost"}
                  onClick={onCollapsed}
                >
                  <ArrowLeftFromLine className=" size-4" />
                </Button>
              </Hint>
            </div>
          );
        // else
        return (
          <div className="hidden lg:flex  w-full items-center  justify-center pt-4 mb-4">
            <Hint label={label} side="right" asChild>
              <Button
                className="h-auto p-2"
                variant={"ghost"}
                onClick={onExpand}
              >
                <ArrowRightFromLine className="size-4" />
              </Button>
            </Hint>
          </div>
        );
      })()}
    </>
  );
};
