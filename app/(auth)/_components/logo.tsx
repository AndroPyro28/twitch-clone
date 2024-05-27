import Image from "next/image";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1 animate-bounce">
        <Image
          src={"/assets/spooky.svg"}
          className=""
          alt="twitch-clone"
          height={80}
          width={80}
        />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className={cn("text-xl font-semibold")}>
          Twitch Clone
        </p>
        <p className={cn("text-sm text-muted-foreground")}>Let&apos;s play</p>
      </div>
    </div>
  );
};
