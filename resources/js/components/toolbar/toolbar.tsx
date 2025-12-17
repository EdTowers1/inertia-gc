import { Plus, RefreshCw, Repeat, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Branch = { id: string | number; name: string };

interface ToolbarProps {
    branches?: Branch[];
    selectedBranchId?: string | number;
    onBranchChange?: (id: string | number) => void;
    onCreate?: () => void;
    onRefresh?: () => void;
    onDelete?: () => void;
    onSync?: () => void;
    className?: string;
}

export function Toolbar({
    branches = [],
    selectedBranchId,
    onBranchChange,
    onCreate,
    onRefresh,
    onDelete,
    onSync,
    className = '',
}: ToolbarProps) {
    return (
        <div className={`flex items-center justify-between gap-4 ${className}`}>
            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="default"
                    title="Agregar"
                    onClick={onCreate}
                    className="bg-emerald-600 hover:bg-emerald-500"
                >
                    <Plus className="size-4 text-white" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    title="Recargar"
                    onClick={onRefresh}
                    className="text-primary"
                >
                    <RefreshCw className="size-4" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    title="Eliminar"
                    onClick={onDelete}
                    className="text-destructive"
                >
                    <Trash2 className="size-4" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    title="Sincronizar"
                    onClick={onSync}
                    className="text-pink-600"
                >
                    <Repeat className="size-4" />
                </Button>
            </div>

            <div className="w-64">
                <Select
                    value={
                        selectedBranchId ? String(selectedBranchId) : undefined
                    }
                    onValueChange={(v) => onBranchChange?.(v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sucursal" />
                    </SelectTrigger>

                    <SelectContent>
                        {branches.map((b) => (
                            <SelectItem key={String(b.id)} value={String(b.id)}>
                                {b.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default Toolbar;
