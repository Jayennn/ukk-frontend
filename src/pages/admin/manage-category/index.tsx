import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useState} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {trpc} from "@/utils/trpc";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "./columns"
import DataTable from "@/components/table/DataTable";
import {Button} from "@/components/ui/button";
import {DialogCreateCategory} from "@/pages/admin/manage-category/action/DialogCreateCategory";
import {useAtom} from "jotai";
import {categoryIDAtom, dialogUpdateCategory} from "@/atoms/category-atom";
import {DialogUpdateCategory} from "@/pages/admin/manage-category/action/DialogUpdateCategory";

const Page: NextPageWithLayout = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useAtom(dialogUpdateCategory);
  const [categoryID, setCategoryID] = useAtom(categoryIDAtom);

  const {data: category, isLoading} = trpc.category.all.useQuery()
  const table = useReactTable({
    data: category?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <DialogCreateCategory
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
      {categoryID && (
        <DialogUpdateCategory
          id={categoryID}
          open={updateDialog}
          onOpenChange={() => {
            setCategoryID(undefined)
            setUpdateDialog(false)
          }}
        />
      )}
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Button disabled={isLoading} onClick={() => setOpenCreateDialog(true)} size="sm">Add New Category</Button>
        </div>
        <div className="p-4">
          <DataTable
            table={table}
            isLoading={isLoading}
            colLength={columns.length}
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
