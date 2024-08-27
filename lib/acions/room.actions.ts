"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { UsersAccessesType } from "@/types";
import { revalidatePath } from "next/cache";
import { parseStringify } from "@/lib/utils";

export const createDocument = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  try {
    const roomId = nanoid();

    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: UsersAccessesType = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error when creating a document: ${error}`);
  }
};

export const getAccessRoom = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const access = Object.keys(room.usersAccesses).includes(userId);

    if (!access) {
      throw new Error("You don`t have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error when getRoom ${error}`);
  }
};

export const updateTitleRoom = async (roomId: string, title: string) => {
  try {
    const updateRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updateRoom);
  } catch (e) {
    console.log(`Error updateTitleRoom : ${updateTitleRoom}`);
  }
};

export const getAllDocuments = async (email: string) => {
  try {
    const allDocks = await liveblocks.getRooms({ userId: email });

    return parseStringify(allDocks);
  } catch (e) {
    console.log(`Error getAllDocuments: ${getAllDocuments}`);
  }
};
