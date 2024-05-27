// export interface Session {
//   user: {
//     email: string;
//     id: string;
//     name: string;
//     image?: string;
//     role: Role;
//   };
// }

import { User, currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  return await currentUser();
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
