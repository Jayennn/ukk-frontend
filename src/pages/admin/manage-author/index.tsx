import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {Button} from "@/components/ui/button";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "@/server/api/routers/author/columns"
import DataTable from "@/components/table/DataTable";
import {useAtom} from "jotai";
import {
  authorIDAtom,
  dialogCreateAuthor,
  dialogDeleteAuthor,
  dialogDetailAuthor,
  dialogUpdateAuthor
} from "@/atoms/author-atom";
import {DialogCreateAuthor} from "@/pages/admin/manage-author/action/DialogCreateAuthor";
import {toast} from "sonner";
import {DeleteAlertDialog} from "@/components/DeleteAlertDialog";
import {DialogUpdateAuthor} from "@/pages/admin/manage-author/action/DialogUpdateAuthor";
import {DialogDetailAuthor} from "@/pages/admin/manage-author/action/DialogDetailAuthor";

const Page: NextPageWithLayout = () => {
  const [updateDialog, setUpdateDialog] = useAtom(dialogUpdateAuthor);
  const [deleteDialog, setDeleteDialog] = useAtom(dialogDeleteAuthor);
  const [createDialog, setCreateDialog] = useAtom(dialogCreateAuthor);
  const [detailDialog, setDetailDialog] = useAtom(dialogDetailAuthor);
  const [authorID, setAuthorID] = useAtom(authorIDAtom);

  const {data, isLoading} = trpc.author.all.useQuery();
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const ctx = trpc.useUtils();
  const deleteAuthorMutation = trpc.author.delete.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      await ctx.author.all.invalidate()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  const handleDeleteAuthor = async() => {
    console.log("p", authorID)
    if(!authorID){
      toast.error("Author ID is not defined")
      return;
    }

    await deleteAuthorMutation.mutateAsync({id: authorID})
    setAuthorID(undefined)
  }

  return (
    <>
      <DialogCreateAuthor
        open={createDialog}
        onOpenChange={setCreateDialog}
      />
      <DeleteAlertDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onClick={handleDeleteAuthor}
      />
      {authorID && (
        <DialogUpdateAuthor
          id={authorID}
          open={updateDialog}
          onOpenChange={setUpdateDialog}
          key={authorID}
        />
      )}
      {authorID && (
        <DialogDetailAuthor
          id={authorID}
          open={detailDialog}
          onOpenChange={setDetailDialog}
          key={authorID}
        />
      )}
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Author</h1>
          <Button size="sm" onClick={() => setCreateDialog(true)}>Add New Author</Button>
        </div>
        <div className="p-4">
          <DataTable
            table={table}
            colLength={columns.length}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
