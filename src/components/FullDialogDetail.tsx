import * as Dialog from "@/components/ui/dialog";
import {DialogProps} from "@radix-ui/react-dialog";
import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
interface FullDialogDetailProps extends DialogProps {
  title?: string,
  description?: string,
  children: React.ReactNode,
  close?: ((open: boolean) => void)
}

export const FullDialogDetail = (
  {
    title,
    description,
    children,
    close,
    ...props
  }: FullDialogDetailProps
) => {
  return (
    <>
      <Dialog.Dialog {...props}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
            <Dialog.DialogDescription>{description}</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <ScrollArea className="h-[27rem]">
            {children}
          </ScrollArea>
          <Dialog.DialogFooter >
            <Dialog.DialogClose asChild>
              <Button size="sm" variant="ghost">Close</Button>
            </Dialog.DialogClose>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  )
}
