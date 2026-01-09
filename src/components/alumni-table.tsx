import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type Row,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AlumniMember } from "@/data/alumni"

export const columns: ColumnDef<AlumniMember>[] = [
  {
    accessorKey: "lab",
    header: "Lab",
    cell: ({ row }) => <div className="capitalize">{row.getValue("lab")}</div>,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> 
        Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium truncate max-w-64">{row.getValue("full_name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}> 
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase text-muted-foreground truncate max-w-64">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "graduation_year",
    header: () => <div className="text-right">Year</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("graduation_year") as number}</div>
    ),
  },
  {
    accessorKey: "current_company",
    header: () => <div>Company</div>,
    cell: ({ row }) => <div className="truncate max-w-64">{row.getValue("current_company")}</div>,
  },
  {
    accessorKey: "current_position",
    header: () => <div>Position</div>,
    cell: ({ row }) => <div className="truncate max-w-48">{row.getValue("current_position")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const alumnus = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(alumnus.email)}>
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={alumnus.linkedin_url ?? "#"} target="_blank" rel="noopener noreferrer">View LinkedIn</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AlumniTable({ data, search }: { data: AlumniMember[]; search?: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  

  const multiFieldGlobalFilter = React.useCallback(
    (row: Row<AlumniMember>, _columnId: string, filterValue: string) => {
      const v = (filterValue ?? "").toLowerCase()
      if (!v) return true
      const a = row.original
      return (
        a.full_name.toLowerCase().includes(v) ||
        a.email.toLowerCase().includes(v) ||
        a.lab.toLowerCase().includes(v) ||
        a.current_company.toLowerCase().includes(v) ||
        a.current_position.toLowerCase().includes(v) ||
        (a.research_interests ?? "").toLowerCase().includes(v)
      )
    },
    []
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: multiFieldGlobalFilter,
    state: { sorting, columnFilters, columnVisibility, globalFilter },
  })

  React.useEffect(() => {
    if (typeof search === "string") {
      setGlobalFilter(search)
    }
  }, [search])

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search alumni..."
          value={globalFilter}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border border-input bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
