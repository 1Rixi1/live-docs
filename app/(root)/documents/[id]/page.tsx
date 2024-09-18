import CollaborativeRoom from "@/components/CollaborativeRoom";
import { DocumentProps, UsersDataType, UserType } from "@/types";
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

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);

  const users = await getUsers({ userIds });

  const usersData = users
    .filter((user: UserType) => user !== null)
    .map((user: UsersDataType) => ({
      ...user,
      userType: room.usersAccesses[user.email].includes("room:write")
        ? "editor"
        : "viewer",
    }));

  const currentUserType = room.usersAccesses[
    user.emailAddresses[0].emailAddress
  ].includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <div>
      <CollaborativeRoom
        roomId={room.id}
        roomMetadata={room.metadata}
        collaborativeUsers={usersData}
        currentUserType={currentUserType}
      />
    </div>
  );
};

export default Document;
