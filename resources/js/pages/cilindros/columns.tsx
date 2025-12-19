import { ColumnDef } from "@tanstack/react-table"
import type { CilindroDisplay } from "@/types/cilindro"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export const columns: ColumnDef<CilindroDisplay>[] = [
    {
        accessorKey: "row_id",
        header: "#",
        enableSorting: false,
        cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue("row_id")}</div>,
    },
    {
        accessorKey: "codigo_cilindro",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Código" />,
        cell: ({ row }) => <div className="font-medium">{row.getValue("codigo_cilindro") ?? "-"}</div>,
    },
    {
        accessorKey: "nombre_producto",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Producto" />,
        cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("nombre_producto") ?? "-"}</div>,
    },
    {
        accessorKey: "capacidad_cilindro",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Capacidad" />,
        cell: ({ row }) => {
            const val = row.getValue("capacidad_cilindro") as number | null | undefined
            return <div>{val == null ? "-" : new Intl.NumberFormat("es-CO").format(val)}</div>
        },
    }

]


