"use server";

import { nanoid } from "nanoid";
import { CreateDocumentType, UsersAccessesType } from "@/types";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "@/lib/utils";

export const createDocument = async ({ userId, email }: CreateDocumentType) => {
  try {
    const roomId = nanoid();

    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: UsersAccessesType = {
      email: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error when creating a room : ${error}`);
  }
};
