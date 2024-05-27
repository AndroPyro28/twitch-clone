import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default clerkMiddleware(async (auth, req,) => {
  if (isProtectedRoute(req)) {
    // Add your middleware logic here
    const {userId, } = auth()

    if(!userId) {
      return NextResponse.json({message: "Unauthorized: Login Required"}, {status: 401})
    } 
    const user = await clerkClient.users.getUser(userId);
    if(!user) {
      return NextResponse.json({message: "Unauthorized: Login Required"}, {status: 401})
    } 
  }
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const isProtectedRoute = createRouteMatcher([
  // '/api/webhooks/clerk',
  '/api/webhooks/livekit',
]);
