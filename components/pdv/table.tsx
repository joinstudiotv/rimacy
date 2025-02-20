"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { DataTableColumnHeader } from "@/components/pdv/column-header"
import { formatISODate } from "@/lib/utils"
import { PuntoDeVenta } from "@/lib/types"

// const data: PuntoDeVenta[] = [
//   {
//     id: 385,
//     nombre: "ANCISCA HINCHO",
//     observaciones: null,
//     razon_social: "nan",
//     telefono: "nan",
//     direccion: "Virgen de Chapi Mz I Lt 4 ",
//     latitud: -71.5424,
//     longitud: -16.338474,
//     puntaje: 3182.338709785713,
//     ruta: "542",
//     color: "#ff0000",
//     estado: true,
//     puntaje_calculado: 3182.338709785713,
//     cant: 84,
//     total: 81,
//     monto: 2252.0019970000003,
//     mapa: true,
//     fecha: "2024-12-30T18:38:06.754Z"
//   },
//   {
//     id: 402,
//     nombre: "CARUJA   CAJYA ROJAS",
//     observaciones: null,
//     razon_social: "nan",
//     telefono: "nan",
//     direccion: "Dean Valdivia Mz-T Lte-10 Sector- 5",
//     latitud: -71.550186,
//     longitud: -16.33302,
//     puntaje: 5003.058695652174,
//     ruta: "543",
//     color: "#ffff00",
//     estado: true,
//     puntaje_calculado: 5003.058695652174,
//     cant: 91,
//     total: 88,
//     monto: 3396.500142,
//     mapa: true,
//     fecha: "2025-02-15T15:44:47.723Z"
//   },
//   {
//     id: 791,
//     nombre: "BROJAS QUISPE ERICK NI",
//     observaciones: null,
//     razon_social: "nan",
//     telefono: "985329869",
//     direccion: "nan",
//     latitud: -71.54167,
//     longitud: -16.328272,
//     puntaje: 2873.6560059999997,
//     ruta: "543",
//     color: "#000000",
//     estado: true,
//     puntaje_calculado: 2873.6560059999997,
//     cant: 63,
//     total: 52,
//     monto: 2026.629004,
//     mapa: true,
//     fecha: "2024-08-17T14:48:57.884Z"
//   }
// ]

export const columns: ColumnDef<PuntoDeVenta>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => <div>{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "ruta",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ruta" />
    ),
    cell: ({ row }) => <div>{row.getValue("ruta")}</div>,
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => {
      const phone: string = row.getValue("telefono")
      return (<div>{ phone == "nan" ? "-" : phone }</div>)
    },
  },
  {
    accessorKey: "direccion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dirección" />
    ),
    cell: ({ row }) => <div>{row.getValue("direccion")}</div>,
  },
  {
    accessorKey: "puntaje",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puntaje" />
    ),
    cell: ({ row }) => <div>{Number(row.getValue("puntaje")).toFixed(0)}</div>,
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Último Pedido" />
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("fecha")
      return (<div>{ formatISODate(date) }</div>)
    },
  },
  {
    id: "cant/Total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cant/Total" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.cant}/{row.original.total}
      </div>
    ),
  },
  {
    accessorKey: "monto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monto" />
    ),
    cell: ({ row }) => {
      const monto = parseFloat(row.getValue("monto"))
 
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }).format(monto)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      const color = row.getValue("color"); // Obtiene el valor del color de la fila
      return (
        <div
          style={{ backgroundColor: color as string }}
          className="w-4 h-4 rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "estado",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activo" />
    ),
    cell: ({ row }) => <div>{row.getValue("estado") ? "Sí" : "No"}</div>,
  },
  {
    accessorKey: "mapa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mapa en app" />
    ),
    cell: ({ row }) => <div>{row.getValue("mapa") ? "Sí" : "No"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pdv = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(pdv.id.toString())}
            >
              Copiar ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View pdv details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface DataTableDemoProps {
  data: PuntoDeVenta[];
}

export default function PDVTable({ data }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full max-w-[calc(100vw-48px)]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por nombre"
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown />
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin Resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
