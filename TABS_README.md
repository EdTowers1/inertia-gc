# 🗂️ Sistema de Tabs - Guía Rápida

## ✨ Características

- ✅ Cambio de pestañas **sin modificar la URL**
- ✅ Estado del cliente con React Context
- ✅ Tabs cerrables con botón X
- ✅ Iconos en cada tab
- ✅ Scroll horizontal automático
- ✅ Integrado con el navbar

## 🚀 Uso Rápido

### Abrir una tab desde cualquier componente

```tsx
import { useTabs } from '@/contexts/tabs-context';
import { Users } from 'lucide-react';

function MiComponente() {
    const { addTab } = useTabs();

    return (
        <button
            onClick={() =>
                addTab({
                    id: 'mi-tab',
                    title: 'Mi Tab',
                    icon: Users,
                    component: <div>Contenido aquí</div>,
                })
            }
        >
            Abrir Tab
        </button>
    );
}
```

### Acceder al estado de las tabs

```tsx
const {
    tabs, // Array de tabs abiertas
    activeTabId, // ID de la tab activa
    addTab, // Agregar o activar tab
    removeTab, // Cerrar tab
    setActiveTab, // Cambiar tab activa
    closeAllTabs, // Cerrar todas
} = useTabs();
```

## 📁 Estructura de Archivos

```
resources/js/
├── contexts/
│   └── tabs-context.tsx              # Context del sistema
├── components/
│   └── tabs/
│       ├── tabs-container.tsx        # UI de las tabs
└── pages/
    ├── clientes/
    │   └── clientes-tab.tsx         # Contenido Clientes
    ├── cilindros/
    │   └── cilindros-tab.tsx        # Contenido Cilindros
    └── dashboard.tsx                 # Dashboard con tabs
```

## ➕ Agregar Nueva Tab al Navbar

1. **Crear componente de contenido**

```tsx
// resources/js/pages/mi-nueva-tab/mi-nueva-tab.tsx
export function MiNuevaTab() {
    return <div>Mi contenido</div>;
}
```

2. **Agregar al navbar** (`app-header.tsx`)

```tsx
// Agregar a mainNavItems
{
    title: 'Mi Nueva Tab',
    href: '/mi-nueva-tab',
    icon: MiIcono,
}

// Agregar a getTabComponent
case 'Mi Nueva Tab':
    return <MiNuevaTab />;
```

## 📖 Documentación Completa

Ver [TABS_SYSTEM_DOCUMENTATION.md](./TABS_SYSTEM_DOCUMENTATION.md) para documentación detallada.

Ver [examples/tabs-examples.tsx](./resources/js/examples/tabs-examples.tsx) para ejemplos de código.

## 🎯 Cómo Funciona

1. Click en opción del navbar (ej: "Clientes")
2. Se previene la navegación
3. Si no estás en dashboard, navega ahí
4. Se agrega/activa la tab correspondiente
5. El contenido se muestra sin cambiar la URL

## 🛠️ Personalización

### Colores y estilos

Edita `tabs-container.tsx` para cambiar colores, espaciado, altura, etc.

### Comportamiento

Edita `tabs-context.tsx` para límites de tabs, duplicados, etc.

## ✅ Listo para Usar

El sistema ya está integrado en:

- ✅ Dashboard (`/dashboard`)
- ✅ Navbar (Clientes, Cilindros)
- ✅ Layout principal

¡Solo navega al dashboard y haz click en las opciones del menú!
