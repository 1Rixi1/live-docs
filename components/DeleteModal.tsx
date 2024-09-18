"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteDocument } from "@/lib/acions/room.actions";

const DeleteModal = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickDeleteHandler = async () => {
    setLoading(true);

    await deleteDocument(roomId);

    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Image
          src="/assets/icons/delete.svg"
          alt="delete"
          width={20}
          height={20}
        />
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete-modal"
            width={48}
            height={48}
          />
          <DialogTitle>Удалить документ</DialogTitle>
          <DialogDescription>
            Вы действительно хотите удалить документ ?
          </DialogDescription>
        </DialogHeader>

        <Button
          className="gradient-red w-full"
          variant="destructive"
          onClick={onClickDeleteHandler}
        >
          {loading ? "Загрузка ..." : "Удалить"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
