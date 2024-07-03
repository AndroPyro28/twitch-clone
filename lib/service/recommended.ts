import { db } from "../db";
import { getCurrentUser } from "./auth";

export const getRecommended = async () => {
  let userId;
  try {
    const self = await getCurrentUser();
    userId = self.id;
  } catch (error) {
    userId = null;
  }
  let users = [];
  if (userId) {
    users = await db.user.findMany({
      include: {
        stream:true
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          },
          {
            NOT: {
              blockedBy: {
                some: {
                  blockerId: userId
                }
              }
            }
          }
        ],
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};

// db.user.update({
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
