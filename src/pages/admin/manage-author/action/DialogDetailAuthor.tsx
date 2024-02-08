import {FullDialogDetail} from "@/components/FullDialogDetail";
import {DialogProps} from "@radix-ui/react-dialog";
import {trpc} from "@/utils/trpc";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


export const DialogDetailAuthor = (
  {id, onOpenChange, ...props}: DialogProps & {
    id: number
  }
) => {

  const {data} = trpc.author.detail.useQuery({id})

  return (
    <>
      <FullDialogDetail
        onOpenChange={() => {
          onOpenChange!(false)
        }}
        close={() => onOpenChange!(false)}
        {...props}
        title={data?.data.author_name}
        description="Detail Author E-Library"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage className="object-cover" src={data?.data.author_image} alt="gambar"/>
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="font-medium">{data?.data.author_name}</p>
              <p className="text-sm text-muted-foreground">{data?.data.phone_number}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-muted-foreground">Author Book(s)</p>
            {data?.data.author_books?.length < 1 ? (
              <p className="text-sm">Books is empty</p>
            ) : (
              <div>{data?.data.author_image}</div>
            )}
            <div>

            </div>
          </div>
        </div>
      </FullDialogDetail>
    </>
  )
}
