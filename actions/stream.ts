"use server";
import { Stream } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/service/auth";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getCurrentUser();
    const selfStream = await db.stream.findUnique({
      where: {
        id: self.id,
      },
    });

    if(!selfStream) {
      throw new Error("Stream not found");
    }
    

    const validData={
      name: values.name,
      isChatEnabled: values.isChatFollowersOnly,
      isChatDelayed:values.isChatDelayed, 
      isChatFollowersOnly: values.isChatFollowersOnly,
    }

    const updatedStream = await db.stream.update({
      where: {
        id: self.id,
      },
      data:{
        ...validData
      }
    })

    revalidatePath( `/u/${self.username}/chat`);
    revalidatePath( `/u/${self.username}`);
    revalidatePath( `/${self.username}`);
    return updatedStream;

  } catch (error) {
    throw new Error("Internal Error");
  }
};
