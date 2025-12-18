import { useMemo, useState } from 'react'
import { Plus, Repeat, Trash2 } from 'lucide-react'

import Toolbar, { type ToolbarAction } from '@/components/toolbar/toolbar'

type Branch = { id: string | number; name: string }

export function CilindrosTab() {
    const [branches] = useState<Branch[]>([
        { id: '1', name: 'Barranquilla' },
        { id: '2', name: 'Cartagena' },
        { id: '3', name: 'Medellín' },
    ])

    const [selectedBranch, setSelectedBranch] = useState<string | number>('1')

    function handleCreate() {
        // TODO: abrir modal para crear cilindro
        console.log('crear')
    }

    // function handleRefresh() {
    //     // TODO: refrescar lista
    //     console.log('refrescar')
    // }

    function handleDelete() {
        // TODO: eliminar selección
        console.log('eliminar')
    }

    function handleSync() {
        // TODO: sincronizar datos
        console.log('sincronizar')
    }

    const toolbarActions = useMemo<ToolbarAction[]>(
        () => [
            {
                key: 'create',
                label: 'Agregar',
                icon: Plus,
                onClick: handleCreate,
                variant: 'default',
                className: 'bg-green-600 hover:bg-emerald-500 text-white',
            },
            // {
            //     key: 'refresh',
            //     label: 'Recargar',
            //     icon: RefreshCw,
            //     onClick: handleRefresh,
            //     className: 'text-primary',
            // },
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
        ],
        [],
    )

    return (
        <div className="h-full space-y-4">
            <div>
                <div className="mb-2">
                    <h1 className="text-lg font-bold">Lista de Cilindros</h1>
                </div>

                <Toolbar
                    actions={toolbarActions}
                    branches={branches}
                    selectedBranchId={selectedBranch}
                    onBranchChange={(id) => setSelectedBranch(id)}
                />
            </div>


        </div>
    )
}
