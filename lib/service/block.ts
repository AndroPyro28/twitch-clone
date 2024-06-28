import { db } from "../db";
import { getCurrentUser } from "./auth";

export const isBlocking = async (id: string) => {
  try {
    const self = await getCurrentUser();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }
    // checking if user and current user blocking each other
    const existingBlock = await db.block.findFirst({
      where: {
        OR:[
          {
            blockerId: otherUser.id,
            blockedId: self.id,
          },
          {
            blockedId: otherUser.id,
            blockerId: self.id,
          }
        ] 
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (id: string) => {
  
  const self = await getCurrentUser();
  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User Not Found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already Blocked");
  }

  const block = await db.block.create({
    data: {
      blockedId: otherUser.id,
      blockerId: self.id,
    },
    include: {
      blocked:true
    }
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getCurrentUser();

  if (self.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db?.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: otherUser.id,
        blockerId: self.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};
