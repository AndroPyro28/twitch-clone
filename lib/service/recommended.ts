import { prismaDB } from "../db";
import { getCurrentUser } from "./auth";

export const getRecommended = async () => {
  const users = await prismaDB.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
