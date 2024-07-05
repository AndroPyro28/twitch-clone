import { Follow } from "@prisma/client";
import { db } from "../db";
import { CustomException } from "../error";
import { getCurrentUser } from "./auth";

/**
 * get the followers that are not blocked
 * @async
 * @function
 * @returns {[Follow[]]}
 */

export const getFollowedUsers = async () => {
  try {
    const self = await getCurrentUser();

    const followedUsers = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
          blockedBy: {
            none: {
              blockerId: self.id,
            },
          }
        },
      },
      include: {
        following: {
          include: {
            stream:{
              select: {
                isLive:true
              }
            }
          }
        },
        
      },
    });
    return followedUsers;
  } catch (error) {
    return [];
  }
};

export const isFollowingUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    const otherUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id == currentUser.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getCurrentUser();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id == self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already Following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getCurrentUser();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id == self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) {
    throw new Error("Not Following");
  }

  const unfollow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return unfollow;
};
