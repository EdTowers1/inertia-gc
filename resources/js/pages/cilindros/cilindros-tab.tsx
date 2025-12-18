import { useCallback, useState } from 'react';
import { Plus, Repeat, Trash2 } from 'lucide-react';

import Toolbar, { 
    type ToolbarAction, 
    type Branch 
} from '@/components/toolbar/toolbar';

/**
 * Datos de ejemplo de sucursales
 * TODO: En producción, estos datos deberían venir de una API o estado global
 */
const MOCK_BRANCHES: Branch[] = [
    { id: '1', name: 'Barranquilla' },
    { id: '2', name: 'Cartagena' },
    { id: '3', name: 'Medellín' },
];

export function CilindrosTab() {
    const [branches] = useState<Branch[]>(MOCK_BRANCHES);
    const [selectedBranch, setSelectedBranch] = useState<string | number>('1');

    // Handlers memoizados para evitar re-renders innecesarios
    const handleCreate = useCallback(() => {
        // TODO: abrir modal para crear cilindro
        console.log('crear cilindro');
    }, []);

    const handleDelete = useCallback(() => {
        // TODO: eliminar selección
        console.log('eliminar cilindros seleccionados');
    }, []);

    const handleSync = useCallback(() => {
        // TODO: sincronizar datos con el servidor
        console.log('sincronizar datos');
    }, []);

    const handleBranchChange = useCallback((id: string | number) => {
        setSelectedBranch(id);
        // TODO: Aquí podrías recargar los datos según la sucursal seleccionada
        console.log('Sucursal cambiada a:', id);
    }, []);

    // Configuración de acciones del toolbar
    // Definida fuera del render para evitar re-creación en cada render
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
        <div className="h-full space-y-4">
            <div>
                <div className="mb-2">
                    <h1 className="text-lg font-bold">Lista de Cilindros</h1>
                </div>

                <Toolbar
                    actions={toolbarActions}
                    branches={branches}
                    selectedBranchId={selectedBranch}
                    onBranchChange={handleBranchChange}
                    branchPlaceholder="Seleccionar Sucursal"
                />
            </div>

            {/* TODO: Agregar tabla de cilindros aquí */}
        </div>
    );
}
