import CollaborativeRoom from "@/components/CollaborativeRoom";
import { DocumentProps } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAccessRoom } from "@/lib/acions/room.actions";

const Document = async ({ params: { id } }: DocumentProps) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const room = await getAccessRoom({
    roomId: id,
    userId: user.emailAddresses[0].emailAddress,
  });


  return (
    <div>
      <CollaborativeRoom roomId={room.id} metadata={room.metadata} />
    </div>
  );
};

export default Document;
