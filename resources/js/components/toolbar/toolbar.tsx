import { type LucideIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/**
 * Representa una sucursal u organización en el selector del toolbar
 */
export type Branch = { 
    id: string | number; 
    name: string;
};

/**
 * Define una acción (botón) que puede ejecutarse desde el toolbar
 */
export type ToolbarAction = {
    /** Identificador único de la acción */
    key: string;
    /** Texto descriptivo para el tooltip */
    label: string;
    /** Ícono de Lucide React a mostrar */
    icon: LucideIcon;
    /** Callback a ejecutar cuando se hace clic */
    onClick?: () => void;
    /** Variante visual del botón (default, ghost, etc.) */
    variant?: ComponentProps<typeof Button>['variant'];
    /** Clases CSS adicionales para personalizar el botón */
    className?: string;
    /** Si el botón debe estar deshabilitado */
    disabled?: boolean;
};

/**
 * Props del componente Toolbar
 */
export interface ToolbarProps {
    /** Lista de acciones (botones) a mostrar en el lado izquierdo */
    actions?: ToolbarAction[];
    /** Lista de sucursales para el selector */
    branches?: Branch[];
    /** ID de la sucursal actualmente seleccionada */
    selectedBranchId?: string | number | null;
    /** Callback cuando cambia la sucursal seleccionada */
    onBranchChange?: (id: string | number) => void;
    /** Texto placeholder del selector de sucursales */
    branchPlaceholder?: string;
    /** Clases CSS adicionales para el contenedor principal */
    className?: string;
    /** Clases CSS personalizadas para el SelectTrigger */
    selectClassName?: string;
    /** Contenido personalizado a mostrar en el lado derecho */
    rightSlot?: ReactNode;
    /** Tamaño de los íconos de acción (default: 5) */
    iconSize?: number;
    /** Tamaño de los botones de acción (default: 8) */
    buttonSize?: number;
}

/**
 * Componente Toolbar reutilizable para mostrar acciones y un selector de sucursales
 * 
 * @example
 * ```tsx
 * <Toolbar
 *   actions={[
 *     { key: 'add', label: 'Agregar', icon: Plus, onClick: handleAdd }
 *   ]}
 *   branches={branches}
 *   selectedBranchId={selectedId}
 *   onBranchChange={handleBranchChange}
 * />
 * ```
 */
export function Toolbar({
    actions = [],
    branches = [],
    selectedBranchId,
    onBranchChange,
    branchPlaceholder = 'Sucursal',
    className = '',
    selectClassName,
    rightSlot,
    iconSize = 5,
    buttonSize = 8,
}: ToolbarProps) {
    const hasBranches = branches.length > 0 && onBranchChange;
    const showRightSide = hasBranches || rightSlot;
    const showLeftSide = actions.length > 0;

    const handleBranchChange = (value: string) => {
        const selectedBranch =
            branches.find((branch) => String(branch.id) === value)?.id ?? value;

        onBranchChange?.(selectedBranch);
    };

    return (
        <div
            className={cn(
                'flex w-full flex-wrap items-center gap-4',
                className,
            )}
        >
            {showLeftSide && (
                <div className="flex shrink-0 items-center gap-2">
                    {actions.map(
                        ({
                            key,
                            label,
                            icon: Icon,
                            onClick,
                            variant = 'ghost',
                            className: actionClassName,
                            disabled,
                        }) => (
                            <Button
                                key={key}
                                size="icon"
                                variant={variant}
                                title={label}
                                onClick={onClick}
                                disabled={disabled || !onClick}
                                className={cn(
                                    'inline-flex items-center justify-center rounded-md',
                                    `h-${buttonSize} w-${buttonSize}`,
                                    actionClassName,
                                )}
                            >
                                <Icon className={`size-${iconSize}`} />
                            </Button>
                        ),
                    )}
                </div>
            )}

            {showRightSide && (
                <div
                    className={cn(
                        'flex items-center gap-2',
                        showLeftSide ? 'min-w-[12rem] flex-1' : 'w-full',
                    )}
                >
                    {rightSlot}

                    {hasBranches && (
                        <div className="min-w-[12rem] flex-1">
                            <Select
                                value={
                                    selectedBranchId !== undefined &&
                                    selectedBranchId !== null
                                        ? String(selectedBranchId)
                                        : undefined
                                }
                                onValueChange={handleBranchChange}
                            >
                                <SelectTrigger 
                                    className={cn(
                                        'h-8 w-full rounded-md border border-gray-900 bg-white px-2 py-0 text-sm text-gray-700',
                                        selectClassName
                                    )}
                                >
                                    <SelectValue
                                        placeholder={branchPlaceholder}
                                    />
                                </SelectTrigger>

                                <SelectContent>
                                    {branches.map((branch) => (
                                        <SelectItem
                                            key={String(branch.id)}
                                            value={String(branch.id)}
                                        >
                                            {branch.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Toolbar;
