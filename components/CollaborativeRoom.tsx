"use client";
import { RoomProvider } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";
import Loader from "@/components/Loader";
import ActiveUsers from "@/components/ActiveUsers";
import { CollaborativeRoomProps } from "@/types";

const CollaborativeRoom = ({ roomId }: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <Header>
          <div className="flex items-center justify-center w-fit gap-2">
            <p className="document-title">Share</p>
          </div>

          <div className="flex items-center">
            <ActiveUsers />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        <Editor />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
