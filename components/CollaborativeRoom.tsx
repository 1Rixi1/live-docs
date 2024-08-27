"use client";
import { RoomProvider } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";
import Loader from "@/components/Loader";
import ActiveUsers from "@/components/ActiveUsers";
import { CollaborativeRoomProps } from "@/types";
import { useRef, useState, KeyboardEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { updateTitleRoom } from "@/lib/acions/room.actions";
import Image from "next/image";

const CollaborativeRoom = ({
  roomId,
  metadata,
  usersData,
  currentUserData,
}: CollaborativeRoomProps) => {
  const userType = "editor";

  const [title, setTitle] = useState(metadata.title);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitle = async () => {
    try {
      setLoading(true);

      await updateTitleRoom(roomId, title);
    } catch (error) {
      console.log(`Error updateTitle: ${error}`);
    } finally {
      setLoading(false);
      setEditable(false);
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        updateTitle();
      } catch (error) {
        console.log(`Error onKeyDownHandler: ${error}`);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        editable &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        updateTitle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title, editable]);

  useEffect(() => {
    if (inputRef.current && editable) {
      inputRef.current.focus();
    }
  }, [editable]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <Header>
          <div ref={containerRef} className="flex items-center gap-2">
            {editable && !loading && (
              <Input
                className="document-title-input"
                ref={inputRef}
                type="text"
                placeholder="Enter text"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                onKeyDown={onKeyDownHandler}
              />
            )}

            {!editable && !loading && (
              <p className="document-title">{metadata.title}</p>
            )}

            {userType === "editor" && !editable && (
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                onClick={() => setEditable(true)}
              />
            )}

            {loading && <p>... saving</p>}
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
        <Editor roomId={roomId} currentUserData={currentUserData} />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
