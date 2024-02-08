import {CellContext, ColumnDef} from "@tanstack/react-table";
import {Author} from "@/server/api/routers/author/schema";
import {formatDate} from "@/lib/utils";
import Image from "next/image";
import * as DropDown from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {useSetAtom} from "jotai";
import {authorIDAtom, dialogDeleteAuthor, dialogDetailAuthor, dialogUpdateAuthor} from "@/atoms/author-atom";

const Action = ({row}: CellContext<Author, unknown>) => {
  const {id} = row.original;
  const setUpdateDialog = useSetAtom(dialogUpdateAuthor);
  const setDeleteDialog = useSetAtom(dialogDeleteAuthor);
  const setDetailDialog = useSetAtom(dialogDetailAuthor);
  const setAuthorID = useSetAtom(authorIDAtom);

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
              setAuthorID(id)
            }}
          >
            Edit
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem
            onClick={() => {
              setDetailDialog(true)
              setAuthorID(id)
            }}
          >
            Detail
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem
            onClick={() => {
              setDeleteDialog(true)
              setAuthorID(id)
            }}
          >
            Delete
          </DropDown.DropdownMenuItem>
        </DropDown.DropdownMenuContent>
      </DropDown.DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<Author>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "author_image",
    header: "Profile Picture",
    cell: ({row}) => (row.getValue("author_image") ? <Image width={150} height={150} className="w-10 h-10 rounded-full object-cover mr-2 border" src={row.original.author_image} alt="author-image"/> : "Tidak Ada Profil")
  },
  {
    accessorKey: "author_name",
    header: "Author Name",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number"
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => <p className="max-w-[6rem] truncate">{row.original.address}</p>
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
