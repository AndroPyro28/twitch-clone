"use server";

import { followUser, unfollowUser } from "@/lib/service/follow";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);
    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unFollowedUser = await unfollowUser(id);
    revalidatePath("/");

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }

    return unFollowedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
