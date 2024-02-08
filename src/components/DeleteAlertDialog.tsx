import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {AlertDialogActionProps, AlertDialogProps} from "@radix-ui/react-alert-dialog";
import {Button} from "@/components/ui/button";

interface DeleteAlertDialogProps
  extends AlertDialogProps {
  onClick?: () => void
}

export const DeleteAlertDialog = ({onClick, ...props}: DeleteAlertDialogProps) => {
  return (
    <>
      <AlertDialog  {...props}>
        <AlertDialogContent className="sm:max-w-[580px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button asChild size="sm" variant="ghost">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </Button>
            <Button asChild size="sm">
              <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
