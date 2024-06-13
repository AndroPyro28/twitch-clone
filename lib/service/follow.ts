import { prismaDB } from "../db";
import { CustomException } from "../error";
import { getCurrentUser } from "./auth";

export const isFollowingUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    const otherUser = await prismaDB.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!otherUser) {
      throw new  Error("User not found")
    }

    if (otherUser.id == currentUser.id) {
      return true;
    }

    const existingFollow = await prismaDB.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow
  } catch (error) {
    return false;
  }
};

export const followUser = async (id:string) => {
  const self = await getCurrentUser();

  const otherUser = await prismaDB.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) {
    throw new  Error("User not found")
  }

  if (otherUser.id == self.id) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await prismaDB.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    }
  })

  if(existingFollow) {
    throw new Error("Already Following")
  }

  const follow = await prismaDB.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower:true,
      following:true
    }
  })

  return follow;
}