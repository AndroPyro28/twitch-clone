import { prismaDB } from "../db";
import { getCurrentUser } from "./auth";

export const getRecommended = async () => {
  let userId;
  try {
    const self = await getCurrentUser()
    userId = self.id
  } catch (error) {
    userId = null;
  }
  let users = []
  if(userId) {
    users = await prismaDB.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where:  {
        id: {
          not:userId
        }
      }
    });
  } else {
    users = await prismaDB.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};

// prismaDB.user.update({
//   where:  {
//      id:  ""
//   },
//   data: {
//     followedBy: {
//       connect: {
//         id: ""
//       }
//     },
//     following: {
//       connect:{ 
//         id: ""
//       }
//     }
//   }
// })