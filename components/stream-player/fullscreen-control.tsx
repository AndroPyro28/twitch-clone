"use client";

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}
export const FullscreenControl: React.FC<FullscreenControlProps> = ({
  isFullscreen,
  onToggle,
}) => {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="size-5 " />
        </button>
      </Hint>
    </div>
  );
};
