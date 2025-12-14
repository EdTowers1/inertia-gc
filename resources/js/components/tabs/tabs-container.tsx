import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTabs } from '@/contexts/tabs-context';
import { ConfirmAlert } from '@/lib/utils/alerts';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// Colores vibrantes para cada tab
const tabColors = [
    'bg-blue-100 dark:bg-blue-900/50', // Azul
    'bg-green-100 dark:bg-green-900/50', // Verde
    'bg-purple-100 dark:bg-purple-900/50', // Púrpura
    'bg-orange-100 dark:bg-orange-900/50', // Naranja
    'bg-pink-100 dark:bg-pink-900/50', // Rosa
    'bg-cyan-100 dark:bg-cyan-900/50', // Cian
    'bg-amber-100 dark:bg-amber-900/50', // Ámbar
    'bg-teal-100 dark:bg-teal-900/50', // Verde azulado
];

const tabInactiveColors = [
    'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100/70 dark:hover:bg-blue-900/30',
    'bg-green-50 dark:bg-green-950/20 hover:bg-green-100/70 dark:hover:bg-green-900/30',
    'bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100/70 dark:hover:bg-purple-900/30',
    'bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100/70 dark:hover:bg-orange-900/30',
    'bg-pink-50 dark:bg-pink-950/20 hover:bg-pink-100/70 dark:hover:bg-pink-900/30',
    'bg-cyan-50 dark:bg-cyan-950/20 hover:bg-cyan-100/70 dark:hover:bg-cyan-900/30',
    'bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100/70 dark:hover:bg-amber-900/30',
    'bg-teal-50 dark:bg-teal-950/20 hover:bg-teal-100/70 dark:hover:bg-teal-900/30',
];

// Colores del borde inferior para tab activa
const tabBorderColors = [
    'bg-blue-500 dark:bg-blue-400',
    'bg-green-500 dark:bg-green-400',
    'bg-purple-500 dark:bg-purple-400',
    'bg-orange-500 dark:bg-orange-400',
    'bg-pink-500 dark:bg-pink-400',
    'bg-cyan-500 dark:bg-cyan-400',
    'bg-amber-500 dark:bg-amber-400',
    'bg-teal-500 dark:bg-teal-400',
];

export function TabsContainer() {
    const { tabs, activeTabId, setActiveTab, removeTab } = useTabs();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmingTabId, setConfirmingTabId] = useState<string | null>(null);

    if (tabs.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <p className="text-lg font-medium">
                        No hay pestañas abiertas
                    </p>
                    <p className="text-sm">
                        Selecciona una opción del menú para comenzar
                    </p>
                </div>
            </div>
        );
    }

    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTabId);

    return (
        <>
            <div className="flex h-full flex-col">
            {/* Barra de Tabs */}
            <div className=" border-sidebar-border/70">
                <ScrollArea className="w-full">
                    <div className="flex items-center">
                        {tabs.map((tab, index) => {
                            const colorIndex = index % tabColors.length;
                            const isActive = activeTabId === tab.id;

                            return (
                                <div
                                    key={tab.id}
                                    className={cn(
                                        'group relative flex h-10 items-center gap-2 border-r border-sidebar-border/70 px-4 transition-all duration-200',
                                        isActive
                                            ? tabColors[colorIndex]
                                            : tabInactiveColors[colorIndex],
                                        'cursor-pointer',
                                    )}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {/* Icono */}
                                    {tab.icon && (
                                        <tab.icon className="h-4 w-4 shrink-0" />
                                    )}

                                    {/* Título */}
                                    <span className="text-sm font-medium whitespace-nowrap">
                                        {tab.title}
                                    </span>

                                    {/* Botón cerrar */}
                                    {tab.closeable && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                'ml-2 h-5 w-5 shrink-0 rounded-sm p-0 opacity-70 hover:opacity-100',
                                                'hover:bg-destructive/10 hover:text-destructive',
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setConfirmingTabId(tab.id);
                                                setIsConfirmOpen(true);
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}

                                    {/* Indicador de tab activa - Borde inferior de color */}
                                    {isActive && (
                                        <div
                                            className={cn(
                                                'absolute bottom-0 left-0 h-1 w-full',
                                                tabBorderColors[colorIndex],
                                            )}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Contenido de la Tab Activa con color de fondo */}
            <div className="flex-1 overflow-auto">
                {activeTab && activeTabIndex !== -1 && (
                    <div
                        className={cn(
                            'h-full p-4',
                            tabColors[activeTabIndex % tabColors.length].split(
                                ' ',
                            )[0] + '/30',
                        )}
                    >
                        {activeTab.component}
                    </div>
                )}
            </div>
        </div>
            <ConfirmAlert
                open={isConfirmOpen}
                onOpenChange={(open) => {
                    setIsConfirmOpen(open);
                    if (!open) setConfirmingTabId(null);
                }}
                onConfirm={() => {
                    if (confirmingTabId) {
                        removeTab(confirmingTabId);
                    }
                    setIsConfirmOpen(false);
                }}
                title="Cerrar pestaña"
                description="¿Estás seguro que quieres cerrar esta pestaña?"
                confirmText="Sí, cerrar"
                cancelText="Cancelar"
            />
        </>
    );
}
