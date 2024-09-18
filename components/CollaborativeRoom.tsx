"use client";
import { RoomProvider } from "@liveblocks/react";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Editor } from "@/components/editor/Editor";
import Loader from "@/components/Loader";
import CollaboratorUsers from "@/components/CollaboratorUsers";
import { CollaborativeRoomProps } from "@/types";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { updateTitleRoom } from "@/lib/acions/room.actions";
import Image from "next/image";
import ShareModal from "@/components/ShareModal";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  collaborativeUsers,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [title, setTitle] = useState(roomMetadata.title);
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
              <p className="document-title">{roomMetadata.title}</p>
            )}

            {currentUserType === "editor" && !editable && (
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
            {currentUserType !== "editor" && !editable && (
              <p className="view-only-tag">Только просмотр</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <CollaboratorUsers />

            <ShareModal
              roomId={roomId}
              collaborativeUsers={collaborativeUsers}
              currentUsersType={currentUserType}
              creatorId={roomMetadata.creatorId}
            />

            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </Header>
        <Editor roomId={roomId} currentUserType={currentUserType} />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
