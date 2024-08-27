"use client";
import { LiveblocksProvider } from "@liveblocks/react";
import { getUsers } from "@/lib/acions/user.actions";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        return await getUsers({ userIds });
      }}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
