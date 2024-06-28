"use server";
import { Stream } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/service/auth";
import { getStreamByUserId } from "@/lib/service/stream";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getCurrentUser();

    const selfStream = await getStreamByUserId(self.id);
    if (!selfStream) {
      throw new Error("Stream not found");
    }
    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const updatedStream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
    return updatedStream;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Error");
  }
};
