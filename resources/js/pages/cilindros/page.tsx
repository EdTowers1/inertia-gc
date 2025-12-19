import { useCallback, useState } from 'react';
import { Plus, Repeat, Trash2 } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table"

import Toolbar, {
    type ToolbarAction,
    type Branch
} from '@/components/toolbar/toolbar';
import { DataTable } from "@/components/ui/data-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { Badge } from "@/components/ui/badge"

// Definición del tipo de dato para Cilindros
type Cilindro = {
    id: string
    codigo: string
    tipo: string
    capacidad: string
    estado: "lleno" | "vacio" | "mantenimiento"
    ubicacion: string
    ultima_actualizacion: string
}

// Datos de ejemplo para la tabla
const MOCK_CILINDROS: Cilindro[] = [
    {
        id: "1",
        codigo: "OX-2024-001",
        tipo: "Oxígeno Medicinal",
        capacidad: "6m³",
        estado: "lleno",
        ubicacion: "Bodega Central",
        ultima_actualizacion: "2024-03-15"
    },
    {
        id: "2",
        codigo: "AC-2024-045",
        tipo: "Acetileno",
        capacidad: "4kg",
        estado: "vacio",
        ubicacion: "Taller Mecánico",
        ultima_actualizacion: "2024-03-14"
    },
    {
        id: "3",
        codigo: "AR-2024-012",
        tipo: "Argón",
        capacidad: "10m³",
        estado: "mantenimiento",
        ubicacion: "Zona de Carga",
        ultima_actualizacion: "2024-03-10"
    },
    {
        id: "4",
        codigo: "NI-2024-008",
        tipo: "Nitrógeno",
        capacidad: "6m³",
        estado: "lleno",
        ubicacion: "Laboratorio",
        ultima_actualizacion: "2024-03-15"
    },
    {
        id: "5",
        codigo: "OX-2024-002",
        tipo: "Oxígeno Industrial",
        capacidad: "6m³",
        estado: "vacio",
        ubicacion: "Planta de Producción",
        ultima_actualizacion: "2024-03-12"
    },
];

// Columnas de la tabla
const columns: ColumnDef<Cilindro>[] = [
    {
        accessorKey: "codigo",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Código" />,
        cell: ({ row }) => <div className="font-medium">{row.getValue("codigo")}</div>,
    },
    {
        accessorKey: "tipo",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de Gas" />,
    },
    {
        accessorKey: "capacidad",
        header: "Capacidad",
    },
    {
        accessorKey: "estado",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
        cell: ({ row }) => {
            const estado = row.getValue("estado") as string
            return (
                <Badge variant={estado === "lleno" ? "default" : estado === "vacio" ? "destructive" : "secondary"}>
                    {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </Badge>
            )
        }
    },
    {
        accessorKey: "ubicacion",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ubicación Actual" />,
    },
    {
        accessorKey: "ultima_actualizacion",
        header: "Actualizado",
        cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("ultima_actualizacion")}</div>
    }
]

/**
 * Datos de ejemplo de sucursales
 */
const MOCK_BRANCHES: Branch[] = [
    { id: '1', name: 'Barranquilla' },
    { id: '2', name: 'Cartagena' },
    { id: '3', name: 'Medellín' },
];

export function CilindrosTab() {
    const [branches] = useState<Branch[]>(MOCK_BRANCHES);
    const [selectedBranch, setSelectedBranch] = useState<string | number>('1');
    const [data] = useState<Cilindro[]>(MOCK_CILINDROS);

    // Handlers memoizados
    const handleCreate = useCallback(() => {
        console.log('crear cilindro');
    }, []);

    const handleDelete = useCallback(() => {
        console.log('eliminar cilindros seleccionados');
    }, []);

    const handleSync = useCallback(() => {
        console.log('sincronizar datos');
    }, []);

    const handleBranchChange = useCallback((id: string | number) => {
        setSelectedBranch(id);
        console.log('Sucursal cambiada a:', id);
    }, []);

    const toolbarActions: ToolbarAction[] = [
        {
            key: 'create',
            label: 'Agregar',
            icon: Plus,
            onClick: handleCreate,
            variant: 'default',
            className: 'bg-green-600 hover:bg-emerald-500 text-white',
        },
        {
            key: 'delete',
            label: 'Eliminar',
            icon: Trash2,
            onClick: handleDelete,
            className: 'text-destructive',
        },
        {
            key: 'sync',
            label: 'Sincronizar',
            icon: Repeat,
            onClick: handleSync,
            className: 'text-pink-600',
        },
    ];

    return (
        <div className="flex h-full flex-col gap-4 overflow-hidden">
            <div className="shrink-0 space-y-4">
                <div>
                    <h1 className="text-lg font-bold">Inventario de Cilindros</h1>
                </div>

                <Toolbar
                    actions={toolbarActions}
                    branches={branches}
                    selectedBranchId={selectedBranch}
                    onBranchChange={handleBranchChange}
                    branchPlaceholder="Seleccionar Sucursal"
                />
            </div>

            <div className="min-h-0 flex-1 overflow-auto">
                <DataTable columns={columns} data={data}  />
            </div>
        </div>
    );
}
