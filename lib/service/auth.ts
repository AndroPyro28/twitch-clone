// export interface Session {
//   user: {
//     email: string;
//     id: string;
//     name: string;
//     image?: string;
//     role: Role;
//   };
// }

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import {User} from "@prisma/client"
export const getCurrentUser = async () => {
  const self = await currentUser();

  if(!self  || !self.username) {
    throw new Error("Unauthorized");
  }


  const user = await  db.user.findUnique({
    where: {
      externalUserId:  self.id,
    },
    
  })

  if(!user)  {
    throw new Error("Not  found");
  }

  return user;
};

interface WithAuthHandler {
  ({
    req,
    params,
    searchParams,
    headers,
  }: {
    req: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
    headers?: Record<string, string>;
    currentUser?: User;
  }): Promise<Response>;
}

interface RequiredRole {
  requiredRole?: Array<[]>;
}

export const withAuth =
  (handler: WithAuthHandler, { requiredRole = [] }: RequiredRole = {}) =>
  async (
    req: Request,
    { params }: { params: Record<string, string> | undefined }
  ) => {
    const searchParams = getSearchParams(req);

    let headers = {};

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized: Login required.", {
        status: 401,
        headers,
      });
    }

    // const user = await prisma.user.findFirst({
    //   where: {
    //     id: session.user.id,
    //     role: session.user.role,
    //   },
    // });

    // if (!user) {
    //   return new Response("Unauthorized: Login required.", {
    //     status: 401,
    //     headers,
    //   });
    // }

    // if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
    //   return new Response("Unauthorized: Role required.", {
    //     status: 401,
    //     headers,
    //   });
    // }

    return handler({
      req,
      params: params || {},
      searchParams,
      headers,
      currentUser,
    });
  };

const getSearchParams = (req: Request) => {
  return Object.fromEntries(new URL(req.url).searchParams);
};
