import { liveblocks } from "@/lib/liveblocks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getRandomColor } from "@/lib/utils";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const { id, firstName, lastName, emailAddresses, imageUrl } = user;

  const metadata = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getRandomColor(),
    },
  };

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: metadata.info.email,
      groupIds: [],
    },
    { userInfo: metadata.info }
  );

  return new Response(body, { status });
}
