import * as Dialog from "@/components/ui/dialog";
import {DialogProps} from "@radix-ui/react-dialog";
import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface FullDialogProps extends DialogProps {
  formName?: string
  title?: string,
  description?: string,
  children: React.ReactNode,
  close?: ((open: boolean) => void)
}

export const FullDialog = (
  {
    title,
    description,
    children,
    close,
    formName,
    ...props
  }: FullDialogProps
) => {
  return (
    <>
      <Dialog.Dialog {...props}>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>{title}</Dialog.DialogTitle>
            <Dialog.DialogDescription>{description}</Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <ScrollArea className="h-auto max-h-[27rem]">
            {children}
          </ScrollArea>
          <Dialog.DialogFooter>
            <Button onClick={() => close!(false)} size="sm" variant="ghost">Close</Button>
            <Button type="submit" size="sm" form={formName}>Create</Button>
          </Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  )
}
