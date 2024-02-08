import {NextPageWithLayout} from "@/pages/_app";
import {Button} from "@/components/ui/button";
import DataTable from "@/components/table/DataTable";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel, getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {trpc} from "@/utils/trpc";
import {columns} from "./columns";
import {ReactElement, useState} from "react";
import AdminLayout from "@/layouts/admin/AdminLayout";
import {DialogCreateStaff} from "@/pages/admin/manage-staff/action/DialogCreateStaff";
import {useAtom} from "jotai";
import {
  dialogCreateStaff,
  dialogDeleteStaff,
  dialogDetailStaff,
  dialogUpdateStaff,
  staffIDAtom
} from "@/atoms/staff-atom";
import {DialogUpdateStaff} from "@/pages/admin/manage-staff/action/DialogUpdateStaff";
import {DeleteAlertDialog} from "@/components/DeleteAlertDialog";
import {DialogDetailStaff} from "@/pages/admin/manage-staff/action/DialogDetailStaff";
import {toast} from "sonner";

const Page: NextPageWithLayout = () => {
  const [createDialog, setCreateDialog] = useAtom(dialogCreateStaff);
  const [updateDialog, setUpdateDialog] = useAtom(dialogUpdateStaff);
  const [detailDialog, setDetailDialog] = useAtom(dialogDetailStaff);
  const [deleteDialog, setDeleteDialog] = useAtom(dialogDeleteStaff);
  const [staffID, setStaffID] = useAtom(staffIDAtom);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const {data: staff, isLoading} = trpc.staff.all.useQuery();
  const table = useReactTable({
    data: staff?.data ?? [],
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const ctx = trpc.useUtils();
  const deleteStaffMutation = trpc.staff.delete.useMutation({
    onSuccess: async({message}) => {
      toast.success(message)
      await ctx.staff.all.invalidate()
    },
    onError: ({data, message}) => {
      toast.error(data?.errZod ?? message)
    }
  })

  const handleDeleteStaff = async() => {
    if(!staffID) {
      toast.error("Staff ID is not defined")
      return;
    }
    await deleteStaffMutation.mutateAsync({id: staffID})
    setStaffID(undefined)
  }



  return (
    <>
      <DialogCreateStaff
        open={createDialog}
        onOpenChange={setCreateDialog}
      />
      <DeleteAlertDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onClick={handleDeleteStaff}
      />
      {staffID && (
        <DialogUpdateStaff
          id={staffID}
          open={updateDialog}
          onOpenChange={() => {
            setStaffID(undefined)
            setUpdateDialog(false)
          }}
        />
      )}
      {staffID && (
        <DialogDetailStaff
          id={staffID}
          open={detailDialog}
          onOpenChange={() => {
            setStaffID(undefined)
            setDetailDialog(false)
          }}
        />
      )}
      <div className="bg-white space-y-4 rounded-md shadow-md border">
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Staff</h1>
          <Button size="sm" onClick={() => setCreateDialog(true)}>Add New Staff</Button>
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
