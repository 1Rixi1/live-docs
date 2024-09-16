import { CollaboratorProps, UserType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import UserSelector from "@/components/UserSelector";
import { Button } from "@/components/ui/button";
import {
  removeCollaboratorDocument,
  updateCollaboratorDocument,
} from "@/lib/acions/room.actions";

const Collaborator = ({
  collaborator,
  roomId,
  creatorId,
}: CollaboratorProps) => {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(collaborator.userType || "viewer");

  const shareDocumentHandler = async (type: UserType) => {
    setLoading(true);

    await updateCollaboratorDocument({
      roomId,
      userType: type,
      email: collaborator.email,
    });

    setLoading(false);
  };
  const removeCollaborator = async () => {
    setLoading(true);

    await removeCollaboratorDocument({ roomId, email: collaborator.email });

    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex items-center gap-2">
        <Image
          className="size-9 rounded-full"
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
        />

        <div>
          <p className="text-white text-sm font-semibold line-clamp-1">
            {collaborator.name}
          </p>
          <span className="text-10-regular text-blue-100">
            {loading && "Loading ..."}
          </span>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>

        {creatorId === collaborator.id ? (
          <p>Owner</p>
        ) : (
          <div className="flex items-center">
            <UserSelector
              userType={userType as UserType}
              setUserType={setUserType}
              onCLickHandler={shareDocumentHandler}
            />
            <Button type="button" onClick={removeCollaborator}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default Collaborator;
