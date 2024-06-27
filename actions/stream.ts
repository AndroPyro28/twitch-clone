"use server";
import { Stream } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/service/auth";

const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getCurrentUser();
  } catch (error) {}
};
