import {CellContext, ColumnDef} from "@tanstack/react-table";
import {Staff} from "@/server/api/routers/staff/schema";
import * as DropDown from "@/components/ui/dropdown-menu"
import {formatDate} from "@/lib/utils";
import {MoreHorizontal} from "lucide-react";
import {useSetAtom} from "jotai";
import {dialogDeleteStaff, dialogDetailStaff, dialogUpdateStaff, staffIDAtom} from "@/atoms/staff-atom";
import {DataTableColumnHeader} from "@/components/table/DataTableColumnHeader";
const Action = ({row}: CellContext<Staff, unknown>) => {

  const {id} = row.original;
  const setDeleteDialog = useSetAtom(dialogDeleteStaff);
  const setDetailDialog = useSetAtom(dialogDetailStaff);
  const setUpdateDialog = useSetAtom(dialogUpdateStaff);
  const setStaffID = useSetAtom(staffIDAtom);


  return (
    <>
      <DropDown.DropdownMenu>
        <DropDown.DropdownMenuTrigger>
          <MoreHorizontal className="w-4 h-4"/>
        </DropDown.DropdownMenuTrigger>
        <DropDown.DropdownMenuContent align="end">
          <DropDown.DropdownMenuItem
            onClick={() => {
              setUpdateDialog(true)
              setStaffID(id)
            }}
          >
            Edit
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem
            onClick={() => {
              setDetailDialog(true)
              setStaffID(id)
            }}
          >
            Detail
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem
            onClick={() => {
              setDeleteDialog(true)
              setStaffID(id)
            }}
          >
            Delete
          </DropDown.DropdownMenuItem>
        </DropDown.DropdownMenuContent>
      </DropDown.DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<Staff>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "name",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Staff Name"/>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => <p className="max-w-[6rem] truncate">{row.original.address}</p>
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number"
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({row}) => formatDate(row.original.createdAt)
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({row}) => formatDate(row.original.updatedAt)
  },
  {
    id: "Action",
    header: "Action",
    cell: Action
  }
]
