import {CellContext, ColumnDef} from "@tanstack/react-table";
import {Book} from "@/server/api/routers/book/schema";
import {formatDate} from "@/lib/utils";
import * as DropDown from "@/components/ui/dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSetAtom} from "jotai";
import {bookIDAtom, dialogDeleteBook} from "@/atoms/book-atom";

const Action = ({row}: CellContext<Book, unknown>) => {
  const {id} = row.original;
  const setDeleteDialog = useSetAtom(dialogDeleteBook);
  const setBookID = useSetAtom(bookIDAtom);
  return (
    <>
      <DropDown.DropdownMenu>
        <DropDown.DropdownMenuTrigger>
          <MoreHorizontal className="w-4 h-4"/>
        </DropDown.DropdownMenuTrigger>
        <DropDown.DropdownMenuContent align="end">
          <DropDown.DropdownMenuItem asChild>
            <Link href={`/admin/manage-books/${row.original.id}/update-book`}>
              Edit
            </Link>
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem asChild>
            <Link href={`/admin/manage-books/${row.original.id}/detail`}>
              Detail
            </Link>
          </DropDown.DropdownMenuItem>
          <DropDown.DropdownMenuItem
            onClick={() => {
              setDeleteDialog(true)
              setBookID(id)
            }}
          >
            Delete
          </DropDown.DropdownMenuItem>
        </DropDown.DropdownMenuContent>
      </DropDown.DropdownMenu>
    </>
  )
}

export const columns: ColumnDef<Book>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "book_title",
    header: "Book Title"
  },
  {
    accessorKey: "release_date",
    header: "Release Date",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({row}) => row.original.category.category_name
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
    header: "action",
    cell: Action
  }
]
