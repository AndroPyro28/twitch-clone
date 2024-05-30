import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
/**
 * @function
 */
export default clerkMiddleware(async (auth, req,) => {
  if (isProtectedRoute(req)) {
       auth().protect()
    // Add your middleware logic here
    // try {
    //   const {userId, } = auth()
    // if(!userId || userId === null) {
    //   auth().protect()
    //   console.log('Protect')
    //   return NextResponse.json({message: "Unauthorized: Login Required"}, {status: 401})
    // }
    // console.log("hello")
    // const user = await clerkClient.users.getUser(userId);
    // if(!user) {
    //   auth().protect()
    //   return NextResponse.json({message: "Unauthorized: Login Required"}, {status: 401})
    // } 
    // } catch (error) {
    //   console.error("error:",error)
    //   return NextResponse.json(error, {status: 500})
    // }
  }
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const isProtectedRoute = createRouteMatcher([
  '/api/webhooks(.*)',
]);
