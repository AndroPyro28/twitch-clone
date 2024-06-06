import { prismaDB } from "../db";
import { getCurrentUser } from "./auth";

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const users = await prismaDB.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
