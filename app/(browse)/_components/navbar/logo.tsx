import Image from "next/image";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hidden lg:flex items-center gap-x4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1">
          <Image
            src="/assets/spooky.svg"
            alt="twitch-clone"
            height={"32"}
            width={"32"}
          />
        </div>
      </div>
    </Link>
  );
};
