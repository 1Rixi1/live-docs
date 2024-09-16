"use client";

import { useState } from "react";
import { ShareModalProps, UserType } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UserSelector from "@/components/UserSelector";
import { useSelf } from "@liveblocks/react";
import Collaborator from "@/components/Collaborator";
import { updateCollaboratorDocument } from "@/lib/acions/room.actions";

const ShareModal = ({
  roomId,
  collaborativeUsers,
  currentUsersType,
  creatorId,
}: ShareModalProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [userType, setUserType] = useState<UserType>("viewer");

  const [email, setEmail] = useState("");
  const shareModalHandler = async () => {
    setLoading(true);

    await updateCollaboratorDocument({ roomId, userType, email });

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className={"flex items-center gap-2 gradient-blue"}
          disabled={currentUsersType !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="svg"
            width={20}
            height={20}
          />
          <p className="px-2">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Приглашенные пользователи</DialogTitle>
          <DialogDescription>
            Выберите, какой пользователь может просматривать или редактировать
            документ
          </DialogDescription>
        </DialogHeader>

        <Label className="mt-6 text-blue-100" htmlFor="email">
          Email address
          <div className="flex items-center gap-3">
            <div className="bg-dark-400 flex flex-1 rounded-md">
              <Input
                className="share-input"
                id="email"
                placeholder="enter Email address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <UserSelector
                userType={userType}
                setUserType={setUserType}
                onCLickHandler={() => {}}
              />
            </div>
            <Button
              className="gradient-blue flex px-5 h-full gap-1"
              type="submit"
              onClick={shareModalHandler}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Пригласить"}
            </Button>
          </div>
          <div className="flex flex-col">
            <ul>
              {collaborativeUsers.map((collaborator) => {
                return (
                  <Collaborator
                    key={collaborator.id}
                    collaborator={collaborator}
                    creatorId={creatorId}
                    roomId={roomId}
                  />
                );
              })}
            </ul>
          </div>
        </Label>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
