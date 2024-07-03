"use client"
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import React, { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldTypes;
}
export const ToggleCard: React.FC<ToggleCardProps> = ({
  label,
  field,
  value = false,
}) => {
  const [isPending, startTransition] = useTransition();
 
  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success("Stream updated");
        })
        .catch(() => {
          toast.error("Error updating stream");
        });
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
