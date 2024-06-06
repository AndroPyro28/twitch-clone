import { withAuth } from "@/lib/service/auth";
import { auth, currentUser } from "@clerk/nextjs/server";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
// custom auth route handlers

// export const GET = withAuth(
//   async ({currentUser,}) => {
     // If there is no signed in user, this will return a 404 error

//     console.log(currentUser)

     // Add your Route Handler logic here

//     return NextResponse.json({ message: "Hello world!" });
//   },
//   { requiredRole: [] }
// );

export const GET  = (req: NextRequest) => {

    // If there is no signed in user, this will return a 404 error

    // Add your Route Handler logic here

    return NextResponse.json({ message: "Hello world!" });
  }