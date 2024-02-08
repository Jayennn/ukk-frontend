import {CellContext, ColumnDef} from "@tanstack/react-table"
import {Category} from "@/server/api/routers/category/schema";
import {formatDate} from "@/lib/utils";
import * as Dropdown from "@/components/ui/dropdown-menu";
import * as DropDown from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {useSetAtom} from "jotai";
import {categoryIDAtom, dialogUpdateCategory} from "@/atoms/category-atom";

const Action = ({row}: CellContext<Category, unknown> ) => {

  const {id} = row.original;
  const setUpdateDialog = useSetAtom(dialogUpdateCategory);
  const setCategoryID = useSetAtom(categoryIDAtom);

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
              setCategoryID(id)
            }}
          >
            Edit
          </DropDown.DropdownMenuItem>
        </DropDown.DropdownMenuContent>
      </DropDown.DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<Category>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "category_name",
    header: "Category"
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
    header: "Action",
    cell: Action
  }
]
