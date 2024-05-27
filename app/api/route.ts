import { withAuth } from "@/lib/auth";
import { auth, currentUser } from "@clerk/nextjs/server";
import { RedirectType, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async ({currentUser,}) => {
    // If there is no signed in user, this will return a 404 error

    console.log(currentUser)

    // Add your Route Handler logic here

    return NextResponse.json({ message: "Hello world!" });
  },
  { requiredRole: [] }
);
