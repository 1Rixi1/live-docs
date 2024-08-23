"use client";

import { CreateDocumentType } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createDocument } from "@/lib/actions/room.actions";
import Image from "next/image";

const AddDocumentButton = ({ userId, email }: CreateDocumentType) => {
  const router = useRouter();

  const createDocumentHandler = async () => {
    const room = await createDocument({ userId, email });

    if (room) router.push(`/documents/${room.id}`);
  };

  return (
    <Button
      className="gradient-blue flex gap-1 shadow-md"
      onClick={createDocumentHandler}
    >
      <Image src="/assets/icons/add.svg" alt="svg" width={24} height={24} />
      <p className={"hidden sm:block"}>Start a blank document</p>
    </Button>
  );
};

export default AddDocumentButton;
