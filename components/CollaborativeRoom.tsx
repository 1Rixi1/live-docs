"use client";

import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import Loader from "@/components/Loader";

const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <Header>
          <div className="flex items-center justify-center w-fit gap-2">
            <p className="document-title">Share</p>
          </div>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Header>
        <Editor />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
