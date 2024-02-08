import * as DropDown from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {CellContext} from "@tanstack/react-table";

export const DataTableAction = <TData, _>({}: CellContext<TData, unknown>) => {

  
  return (
    <>
      <DropDown.DropdownMenu>
        <DropDown.DropdownMenuTrigger>
          <MoreHorizontal className="w-4 h-4"/>
        </DropDown.DropdownMenuTrigger>
        <DropDown.DropdownMenuContent align="end">
          <DropDown.DropdownMenuItem>
            Edit
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem>
            Detail
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem>
            Delete
          </DropDown.DropdownMenuItem>
        </DropDown.DropdownMenuContent>
      </DropDown.DropdownMenu>
    </>
  )
}
