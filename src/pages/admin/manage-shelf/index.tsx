import {NextPageWithLayout} from "@/pages/_app";
import {Button} from "@/components/ui/button";
import {ReactElement} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {trpc} from "@/utils/trpc";
import DataTable from "@/components/table/DataTable";
import {columns} from "@/pages/admin/manage-shelf/columns";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";


const Page: NextPageWithLayout = () => {

  const {data: shelf, isLoading} = trpc.shelf.all.useQuery();

  const table = useReactTable({
    data: shelf?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Shelf</h1>
          <Button size="sm">Add New Shelf</Button>
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
