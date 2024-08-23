"use client";

import { LiveblocksProvider } from "@liveblocks/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
