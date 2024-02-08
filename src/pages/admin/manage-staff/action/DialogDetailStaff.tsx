import {trpc} from "@/utils/trpc";
import {Skeleton} from "@/components/ui/skeleton";
import {DialogProps} from "@radix-ui/react-dialog";
import {FullDialogDetail} from "@/components/FullDialogDetail";


export const DialogDetailStaff = (
  {id, onOpenChange, ...props}: DialogProps & {
    id: number
  }
) => {
  const {data} = trpc.staff.detail.useQuery({id})

  return (
    <>
      <FullDialogDetail
        onOpenChange={() => {
          onOpenChange!(false)
        }}
        close={() => onOpenChange!(false)}
        {...props}
        title={data?.data.name}
        description="Detail Staff E-Library"
      >
        <div className="flex flex-col gap-3">
          {!data ? (
            <Skeleton className="w-full h-9"/>
          ) : (
            <p>{data.data.name}</p>
          )}
        </div>
      </FullDialogDetail>
    </>
  )
}
