"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { AccessesType, UsersAccessesType, UserType } from "@/types";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "@/lib/utils";
import { redirect } from "next/navigation";

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

export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.log(`deleteDocument ${error}`);
  }
};

export const updateCollaboratorDocument = async ({
  roomId,
  email,
  userType,
}: {
  roomId: string;
  email: string;
  userType: UserType;
}) => {
  try {
    const updateUser = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: getAccessType(userType) as AccessesType,
      },
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updateUser);
  } catch (error) {
    console.log(`updateCollaboratorDocument ${error}`);
  }
};

export const removeCollaboratorDocument = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const updateUser = liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updateUser);
  } catch (error) {
    console.log(`removeCollaborator ${error}`);
  }
};
