import { Switch } from "@/components/ui/switch";
import React from "react";

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
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0"></p>
        <div className="space-y-2">
          <Switch checked={value}>{value ? "On" : "Off"}</Switch>
        </div>
      </div>
    </div>
  );
};
