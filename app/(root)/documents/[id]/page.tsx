import CollaborativeRoom from "@/components/CollaborativeRoom";
import { DocumentProps, UsersDataType } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAccessRoom } from "@/lib/acions/room.actions";
import { getUsers } from "@/lib/acions/user.actions";

const Document = async ({ params: { id } }: DocumentProps) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const room = await getAccessRoom({
    roomId: id,
    userId: user.emailAddresses[0].emailAddress,
  });

  const userIds = Object.keys(room.usersAccesses);

  const users = await getUsers({ userIds });

  const usersData = users.map((user: UsersDataType) => ({
    ...user,
    userType: room.usersAccesses[user.email].includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserData = room.usersAccesses[
    user.emailAddresses[0].emailAddress
  ].includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <div>
      <CollaborativeRoom
        roomId={room.id}
        metadata={room.metadata}
        currentUserData={currentUserData}
        usersData={usersData}
      />
    </div>
  );
};

export default Document;
