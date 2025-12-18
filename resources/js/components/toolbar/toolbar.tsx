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

type Branch = { id: string | number; name: string };

type ToolbarAction = {
    key: string;
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    variant?: ComponentProps<typeof Button>['variant'];
    className?: string;
    disabled?: boolean;
};

interface ToolbarProps {
    actions?: ToolbarAction[];
    branches?: Branch[];
    selectedBranchId?: string | number | null;
    onBranchChange?: (id: string | number) => void;
    branchPlaceholder?: string;
    className?: string;
    rightSlot?: ReactNode;
}

export function Toolbar({
    actions = [],
    branches = [],
    selectedBranchId,
    onBranchChange,
    branchPlaceholder = 'Sucursal',
    className = '',
    rightSlot,
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
                                    'inline-flex h-8 w-8 items-center justify-center rounded-md',
                                    actionClassName,
                                )}
                            >
                                <Icon className="size-5" />
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
                                <SelectTrigger className="h-8 w-full rounded-md border border-gray-900 bg-white px-2 py-0 text-sm text-gray-700">
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

export type { ToolbarAction };
export default Toolbar;
