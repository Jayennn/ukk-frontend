import {Table as TableWrapper, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {flexRender, type Table, useReactTable} from "@tanstack/react-table";
import {Skeleton} from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  table: Table<TData>
  colLength: number
  isLoading?: boolean
}

const SkeletonTable = ({colLength: length}: { colLength: number }) => {
  return (
    <>
      {Array.from({length: 5}, (_, i) => i).map((tr) => (
        <TableRow key={`skeleton-tr-${tr}`}>
          {Array.from({length}, (_, i) => i).map((td) => (
            <TableCell key={`skeleton-td-${td}`}>
              <Skeleton className="h-5 w-[100px]"/>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

const TableRender = <TData, _>({table}: {
  table: Table<TData>
}) => {
  const {rows} = table.getRowModel();

  if(rows.length === 0)
    return (
      <>
        <TableRow>
          <TableCell
            colSpan={table.getHeaderGroups()[0]?.headers.length}
            className="h-24 text-center"
          >
            No Result
          </TableCell>
        </TableRow>
      </>
    )

  return (
    <>
      {rows.map((row) => (
        <TableRow
          key={`tr-${row.id}`}
          data-state={row.getIsSelected() && "selected"}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={`td-${cell.id}`}>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

const DataTable = <TData, TValue>({table, colLength, isLoading}: DataTableProps<TData, TValue>) => {

  return (
    <>
      <div className="rounded-md border overflow-y-auto">
        <TableWrapper>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={`tr-${headerGroup.id}`}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-xs" key={`th-${header.id}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonTable
                colLength={colLength}
              />
            ): (
              <TableRender
                table={table}
              />
            )}
          </TableBody>
        </TableWrapper>
      </div>
    </>
  )
}

export default DataTable;
