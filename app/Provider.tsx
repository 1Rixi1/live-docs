"use client";
import { LiveblocksProvider } from "@liveblocks/react";
import { getUsers, getUsersDocument } from "@/lib/acions/user.actions";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        return await getUsers({ userIds });
      }}
      resolveMentionSuggestions={async ({ roomId, text }) => {
        return await getUsersDocument({
          roomId,
          currentUser: currentUser!.emailAddresses[0].emailAddress,
          text,
        });
      }}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
