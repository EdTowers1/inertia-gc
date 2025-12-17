import { useState } from 'react'
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import Toolbar from '@/components/toolbar/toolbar'

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

    function handleRefresh() {
        // TODO: refrescar lista
        console.log('refrescar')
    }

    function handleDelete() {
        // TODO: eliminar selección
        console.log('eliminar')
    }

    function handleSync() {
        // TODO: sincronizar datos
        console.log('sincronizar')
    }

    return (
        <div className="h-full space-y-4">
            <div>
                <div className="mb-4">
                    <h1 className="text-xl font-bold">Lista de Cilindros</h1>
                </div>

                <Toolbar
                    branches={branches}
                    selectedBranchId={selectedBranch}
                    onBranchChange={(id) => setSelectedBranch(id)}
                    onCreate={handleCreate}
                    onRefresh={handleRefresh}
                    onDelete={handleDelete}
                    onSync={handleSync}
                />
            </div>


        </div>
    )
}
