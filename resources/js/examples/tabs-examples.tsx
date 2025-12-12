/**
 * EJEMPLOS DE USO DEL SISTEMA DE TABS
 *
 * Este archivo contiene ejemplos prácticos de cómo usar el sistema de tabs
 * en diferentes escenarios.
 */

import { CilindrosTab } from '@/components/tabs/cilindros-tab';
import { ClientesTab } from '@/components/tabs/clientes-tab';
import { Button } from '@/components/ui/button';
import { useTabs } from '@/contexts/tabs-context';
import { Cylinder, Plus, Users, X } from 'lucide-react';

// ============================================================================
// EJEMPLO 1: Abrir una tab simple desde un botón
// ============================================================================

export function EjemploTabSimple() {
    const { addTab } = useTabs();

    const handleAbrirClientes = () => {
        addTab({
            id: 'clientes',
            title: 'Clientes',
            icon: Users,
            component: <ClientesTab />,
            closeable: true,
        });
    };

    return (
        <Button onClick={handleAbrirClientes}>
            <Users className="mr-2 h-4 w-4" />
            Abrir Clientes
        </Button>
    );
}

// ============================================================================
// EJEMPLO 2: Abrir múltiples tabs programáticamente
// ============================================================================

export function EjemploMultiplesTabs() {
    const { addTab } = useTabs();

    const handleAbrirTodas = () => {
        // Abrir Clientes
        addTab({
            id: 'clientes',
            title: 'Clientes',
            icon: Users,
            component: <ClientesTab />,
        });

        // Después abrir Cilindros (será la activa)
        setTimeout(() => {
            addTab({
                id: 'cilindros',
                title: 'Cilindros',
                icon: Cylinder,
                component: <CilindrosTab />,
            });
        }, 300);
    };

    return (
        <Button onClick={handleAbrirTodas}>
            <Plus className="mr-2 h-4 w-4" />
            Abrir Todas las Tabs
        </Button>
    );
}

// ============================================================================
// EJEMPLO 3: Tabs dinámicas con parámetros
// ============================================================================

interface ClienteDetalle {
    id: number;
    nombre: string;
}

export function EjemploTabDinamica() {
    const { addTab } = useTabs();

    const abrirDetalleCliente = (cliente: ClienteDetalle) => {
        addTab({
            id: `cliente-${cliente.id}`, // ID único por cliente
            title: `Cliente: ${cliente.nombre}`,
            icon: Users,
            component: (
                <div className="p-4">
                    <h2 className="text-2xl font-bold">
                        Detalle del Cliente #{cliente.id}
                    </h2>
                    <p className="mt-2">Nombre: {cliente.nombre}</p>
                    {/* Aquí iría más contenido */}
                </div>
            ),
            closeable: true,
        });
    };

    return (
        <div className="space-y-2">
            <Button
                onClick={() =>
                    abrirDetalleCliente({ id: 1, nombre: 'Juan Pérez' })
                }
            >
                Ver Cliente #1
            </Button>
            <Button
                onClick={() =>
                    abrirDetalleCliente({ id: 2, nombre: 'María García' })
                }
            >
                Ver Cliente #2
            </Button>
        </div>
    );
}

// ============================================================================
// EJEMPLO 4: Controlar tabs programáticamente
// ============================================================================

export function EjemploControlTabs() {
    const { tabs, activeTabId, setActiveTab, removeTab, closeAllTabs } =
        useTabs();

    return (
        <div className="space-y-4 p-4">
            <div>
                <h3 className="font-bold">Tabs Abiertas: {tabs.length}</h3>
                <p className="text-sm text-muted-foreground">
                    Tab Activa: {activeTabId || 'Ninguna'}
                </p>
            </div>

            {/* Listar todas las tabs */}
            <div className="space-y-2">
                {tabs.map((tab) => (
                    <div key={tab.id} className="flex items-center gap-2">
                        {tab.icon && <tab.icon className="h-4 w-4" />}
                        <span
                            className={
                                activeTabId === tab.id ? 'font-bold' : ''
                            }
                        >
                            {tab.title}
                        </span>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setActiveTab(tab.id)}
                        >
                            Activar
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeTab(tab.id)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>

            {tabs.length > 0 && (
                <Button variant="destructive" onClick={closeAllTabs}>
                    Cerrar Todas
                </Button>
            )}
        </div>
    );
}

// ============================================================================
// EJEMPLO 5: Tab con estado interno
// ============================================================================

function TabConFormulario() {
    const [nombre, setNombre] = React.useState('');
    const [guardado, setGuardado] = React.useState(false);

    const handleGuardar = () => {
        // Simular guardado
        console.log('Guardando:', nombre);
        setGuardado(true);
        setTimeout(() => setGuardado(false), 2000);
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-2xl font-bold">Nuevo Cliente</h2>

            <div className="space-y-2">
                <label className="text-sm font-medium">Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
            </div>

            <Button onClick={handleGuardar}>
                {guardado ? '✓ Guardado' : 'Guardar'}
            </Button>
        </div>
    );
}

export function EjemploTabConEstado() {
    const { addTab } = useTabs();

    const abrirFormulario = () => {
        addTab({
            id: 'nuevo-cliente',
            title: 'Nuevo Cliente',
            icon: Plus,
            component: <TabConFormulario />,
            closeable: true,
        });
    };

    return (
        <Button onClick={abrirFormulario}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
        </Button>
    );
}

// ============================================================================
// EJEMPLO 6: Verificar si una tab existe antes de abrirla
// ============================================================================

export function EjemploVerificarTab() {
    const { addTab, hasTab, setActiveTab } = useTabs();

    const abrirOActivarClientes = () => {
        const tabId = 'clientes';

        if (hasTab(tabId)) {
            // Si ya existe, solo la activamos
            setActiveTab(tabId);
        } else {
            // Si no existe, la creamos
            addTab({
                id: tabId,
                title: 'Clientes',
                icon: Users,
                component: <ClientesTab />,
            });
        }
    };

    return (
        <Button onClick={abrirOActivarClientes}>Abrir/Activar Clientes</Button>
    );
}

// ============================================================================
// EJEMPLO 7: Tab con contenido que hace fetch de datos
// ============================================================================

function TabConDatos() {
    const [loading, setLoading] = React.useState(true);
    const [datos, setDatos] = React.useState<any[]>([]);

    React.useEffect(() => {
        // Simular fetch de datos
        setTimeout(() => {
            setDatos([
                { id: 1, nombre: 'Cliente 1' },
                { id: 2, nombre: 'Cliente 2' },
                { id: 3, nombre: 'Cliente 3' },
            ]);
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <p>Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-2xl font-bold">Lista de Clientes</h2>
            <div className="space-y-2">
                {datos.map((item) => (
                    <div key={item.id} className="rounded border p-2">
                        {item.nombre}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function EjemploTabConFetch() {
    const { addTab } = useTabs();

    const abrirListado = () => {
        addTab({
            id: 'listado-clientes',
            title: 'Listado Clientes',
            icon: Users,
            component: <TabConDatos />,
        });
    };

    return <Button onClick={abrirListado}>Ver Listado</Button>;
}

// ============================================================================
// EJEMPLO 8: Dashboard de ejemplo con botones para abrir tabs
// ============================================================================

export function EjemploDashboardCompleto() {
    const { addTab, tabs, closeAllTabs } = useTabs();

    const abrirTab = (tipo: 'clientes' | 'cilindros') => {
        const configs = {
            clientes: {
                id: 'clientes',
                title: 'Clientes',
                icon: Users,
                component: <ClientesTab />,
            },
            cilindros: {
                id: 'cilindros',
                title: 'Cilindros',
                icon: Cylinder,
                component: <CilindrosTab />,
            },
        };

        addTab(configs[tipo]);
    };

    return (
        <div className="space-y-6 p-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Sistema de tabs - {tabs.length} pestañas abiertas
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-6">
                    <Users className="mb-2 h-8 w-8" />
                    <h3 className="mb-2 text-xl font-bold">Clientes</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Gestiona la información de tus clientes
                    </p>
                    <Button onClick={() => abrirTab('clientes')}>
                        Abrir Módulo
                    </Button>
                </div>

                <div className="rounded-lg border p-6">
                    <Cylinder className="mb-2 h-8 w-8" />
                    <h3 className="mb-2 text-xl font-bold">Cilindros</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Control de cilindros de gas
                    </p>
                    <Button onClick={() => abrirTab('cilindros')}>
                        Abrir Módulo
                    </Button>
                </div>
            </div>

            {tabs.length > 0 && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="mb-2 text-sm">
                        Tienes {tabs.length} pestaña(s) abierta(s)
                    </p>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={closeAllTabs}
                    >
                        Cerrar Todas
                    </Button>
                </div>
            )}
        </div>
    );
}

/**
 * CÓMO USAR ESTOS EJEMPLOS:
 *
 * 1. Importa el ejemplo que necesites en tu componente
 * 2. Asegúrate de estar dentro de un TabsProvider
 * 3. Renderiza el componente ejemplo
 *
 * Ejemplo:
 *
 * import { EjemploTabSimple } from '@/examples/tabs-examples';
 *
 * function MiPagina() {
 *     return (
 *         <div>
 *             <h1>Mi Página</h1>
 *             <EjemploTabSimple />
 *         </div>
 *     );
 * }
 */

import * as React from 'react';
