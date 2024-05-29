import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
