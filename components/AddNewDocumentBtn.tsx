"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AddNewDocumentBtnProps } from "@/types";
import { createDocument } from "@/lib/acions/room.actions";
import { useRouter } from "next/navigation";

const AddNewDocumentBtn = ({ userId, email }: AddNewDocumentBtnProps) => {
  const router = useRouter();
  const addNewDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(`Error when add a new document: ${error}`);
    }
  };

  return (
    <Button
      className={"flex items-center ga-2"}
      onClick={addNewDocumentHandler}
    >
      <Image src="/assetc/icons/add.svg" alt={"add"} width={24} height={24} />
      <p className={"hidden sm:block"}>Add new document</p>
    </Button>
  );
};

export default AddNewDocumentBtn;
