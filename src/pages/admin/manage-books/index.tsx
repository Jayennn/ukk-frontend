import {NextPageWithLayout} from "@/pages/_app";
import {Button} from "@/components/ui/button";
import DataTable from "@/components/table/DataTable";
import {ReactElement, useState} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {trpc} from "@/utils/trpc";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "./column";
import {useAtom} from "jotai";
import {bookIDAtom, dialogDeleteBook} from "@/atoms/book-atom";
import Link from "next/link";
import {toast} from "sonner";
import {DeleteAlertDialog} from "@/components/DeleteAlertDialog";

const Page: NextPageWithLayout = () => {
  const [deleteDialog, setDeleteDialog] = useAtom(dialogDeleteBook);
  const [bookID, setBookID] = useAtom(bookIDAtom);
  const {data: books, isLoading} = trpc.book.all.useQuery();

  const table = useReactTable({
    data: books?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const ctx = trpc.useUtils();
  const deleteBookMutation = trpc.book.delete.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      await ctx.book.all.invalidate()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  const handleDeleteBook = async() => {
    if(!bookID){
      toast.error("Book ID is not defined")
      return;
    }

    await deleteBookMutation.mutateAsync({id: bookID})
    setBookID(undefined)
  }

  return (
    <>
      <DeleteAlertDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onClick={handleDeleteBook}
      />
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Book</h1>
          <Button size="sm" asChild>
            <Link href="/admin/manage-books/create-book">Add New Book</Link>
          </Button>
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
