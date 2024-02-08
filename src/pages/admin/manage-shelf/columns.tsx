import {ColumnDef} from "@tanstack/react-table";
import {Shelf} from "@/server/api/routers/shelf/schema";
import {formatDate} from "@/lib/utils";


export const columns: ColumnDef<Shelf>[] = [
  {
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "shelf_code",
    header: "Shelf Code"
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
]
