# Sistema de Tabs (Pestañas) - Laravel + Inertia.js + React

## 📋 Descripción

Sistema de pestañas (tabs) completamente funcional para una SPA donde el cambio de pestaña **NO cambia la URL del navegador**. El estado se maneja del lado del cliente usando React Context.

## 🏗️ Arquitectura

### Archivos Principales

```
resources/js/
├── contexts/
│   └── tabs-context.tsx          # Context para gestionar estado de tabs
├── components/
│   └── tabs/
│       ├── tabs-container.tsx    # Contenedor principal con barra de tabs y contenido
│       ├── clientes-tab.tsx      # Componente de contenido para Clientes
│       └── cilindros-tab.tsx     # Componente de contenido para Cilindros
├── layouts/
│   └── app/
│       └── app-header-layout.tsx # Layout envuelto con TabsProvider
└── pages/
    └── dashboard.tsx             # Dashboard con TabsContainer
```

## 🚀 Características

- ✅ **Cambio de pestañas sin navegación**: No se modifica la URL
- ✅ **Estado persistente**: Las tabs permanecen abiertas hasta que se cierren
- ✅ **Pestañas cerrable**: Botón X en cada tab
- ✅ **Pestañas con iconos**: Cada tab muestra su icono correspondiente
- ✅ **Scroll horizontal**: Si hay muchas tabs, se puede hacer scroll
- ✅ **Indicador visual**: La tab activa tiene un borde inferior destacado
- ✅ **Integración con navbar**: Click en opciones del navbar abre tabs

## 📦 Componentes

### 1. TabsProvider (Context)

**Ubicación**: `resources/js/contexts/tabs-context.tsx`

Proporciona el estado global de las tabs a toda la aplicación.

**Estado:**
```typescript
interface Tab {
    id: string;              // ID único de la tab
    title: string;           // Título mostrado
    icon?: Component;        // Icono (opcional)
    component: ReactNode;    // Contenido de la tab
    closeable?: boolean;     // Si se puede cerrar (default: true)
}
```

**Funciones disponibles:**
```typescript
const {
    tabs,              // Array de tabs abiertas
    activeTabId,       // ID de la tab activa
    addTab,           // Agregar/activar una tab
    removeTab,        // Cerrar una tab
    setActiveTab,     // Cambiar tab activa
    closeAllTabs,     // Cerrar todas las tabs
    hasTab            // Verificar si existe una tab
} = useTabs();
```

### 2. TabsContainer

**Ubicación**: `resources/js/components/tabs/tabs-container.tsx`

Componente visual que muestra:
- Barra de tabs horizontal con scroll
- Contenido de la tab activa
- Botones de cerrar por tab
- Indicador visual de tab activa

### 3. Componentes de Contenido

**Clientes**: `resources/js/components/tabs/clientes-tab.tsx`
**Cilindros**: `resources/js/components/tabs/cilindros-tab.tsx`

Cada componente contiene el contenido específico de su tab.

## 🎯 Uso

### Agregar una nueva tab desde código

```typescript
import { useTabs } from '@/contexts/tabs-context';
import { Users } from 'lucide-react';
import { ClientesTab } from '@/components/tabs/clientes-tab';

function MiComponente() {
    const { addTab } = useTabs();

    const handleOpenClientes = () => {
        addTab({
            id: 'clientes',              // ID único (opcional)
            title: 'Clientes',
            icon: Users,                  // Icono de lucide-react
            component: <ClientesTab />,
            closeable: true              // Opcional, default true
        });
    };

    return <button onClick={handleOpenClientes}>Abrir Clientes</button>;
}
```

### Integración con Navbar

El navbar en `app-header.tsx` está configurado para:
1. Interceptar clicks en los items del menú
2. Navegar al dashboard si no estás ahí
3. Abrir la tab correspondiente

```typescript
const handleNavItemClick = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();

    // Navegar al dashboard si no estamos ahí
    if (page.url !== '/dashboard' && page.url !== '/') {
        router.visit('/dashboard', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                addTab({
                    id: item.title.toLowerCase(),
                    title: item.title,
                    icon: item.icon,
                    component: getTabComponent(item.title),
                });
            },
        });
    } else {
        addTab({...});
    }
};
```

## 🔧 Agregar una Nueva Tab

### Paso 1: Crear el componente de contenido

```tsx
// resources/js/components/tabs/mi-nueva-tab.tsx
export function MiNuevaTab() {
    return (
        <div className="h-full space-y-4">
            <h2 className="text-2xl font-bold">Mi Nueva Tab</h2>
            <p>Contenido aquí...</p>
        </div>
    );
}
```

### Paso 2: Agregar al navbar (opcional)

Si quieres que aparezca en el navbar, edita `app-header.tsx`:

```tsx
// Agregar al array mainNavItems
const mainNavItems: NavItem[] = [
    {
        title: 'Clientes',
        href: '/clientes',
        icon: Users,
    },
    {
        title: 'Cilindros',
        href: '/cilindros',
        icon: Cylinder,
    },
    {
        title: 'Mi Nueva Tab',
        href: '/mi-nueva-tab',
        icon: MiIcono,  // Importar de lucide-react
    },
];

// Agregar al switch de getTabComponent
const getTabComponent = (title: string) => {
    switch (title) {
        case 'Clientes':
            return <ClientesTab />;
        case 'Cilindros':
            return <CilindrosTab />;
        case 'Mi Nueva Tab':
            return <MiNuevaTab />;
        default:
            return <div>Contenido de {title}</div>;
    }
};
```

### Paso 3: Usar programáticamente

```tsx
import { useTabs } from '@/contexts/tabs-context';
import { MiNuevaTab } from '@/components/tabs/mi-nueva-tab';

function AlgunComponente() {
    const { addTab } = useTabs();

    return (
        <button onClick={() => addTab({
            id: 'mi-nueva-tab',
            title: 'Mi Nueva Tab',
            component: <MiNuevaTab />,
        })}>
            Abrir Tab
        </button>
    );
}
```

## 🎨 Personalización

### Estilos de las Tabs

Edita `tabs-container.tsx` para modificar:
- Altura de la barra de tabs: `h-10`
- Colores: `bg-background`, `bg-sidebar/30`
- Espaciado: `px-4`, `gap-2`

### Comportamiento

En `tabs-context.tsx` puedes modificar:
- Prevenir duplicados de tabs
- Límite máximo de tabs
- Comportamiento al cerrar la última tab
- Auto-activación de tabs existentes

## 🐛 Troubleshooting

### Error: "useTabs must be used within a TabsProvider"

**Solución**: Asegúrate de que el componente esté dentro de un `TabsProvider`. El layout `app-header-layout.tsx` ya lo incluye.

### Las tabs no aparecen

**Verificar**:
1. Que estés en `/dashboard` o hayas incluido `<TabsContainer />` en tu página
2. Que hayas agregado tabs con `addTab()`

### La URL cambia al hacer click

**Verificar**:
- Que estés usando `button` y no `Link` en el navbar
- Que el evento tenga `e.preventDefault()`

## 📝 Notas Técnicas

- **Persistencia**: El estado NO persiste en recargas de página (solo en memoria)
- **IDs únicos**: Si no proporcionas ID, se genera automáticamente
- **Navegación**: Usar `router.visit()` de Inertia.js para cambios de página
- **Rendimiento**: Las tabs inactivas permanecen montadas (no se destruyen)

## 🔄 Flujo de Trabajo

```
1. Usuario hace click en "Clientes" del navbar
   ↓
2. handleNavItemClick previene navegación
   ↓
3. Verifica si está en dashboard
   ↓
4. Si NO → navega al dashboard con preserveState
   ↓
5. Llama a addTab() con el componente ClientesTab
   ↓
6. TabsContext verifica si la tab ya existe
   ↓
7. Si existe → la activa | Si no → la crea y activa
   ↓
8. TabsContainer re-renderiza mostrando la nueva tab
   ↓
9. Usuario ve el contenido de la tab activa
```

## ✅ Ventajas de esta implementación

- 🎯 **Sin cambios en URL**: Experiencia de SPA pura
- ⚡ **Rápido**: No hay navegación de servidor
- 🧩 **Modular**: Fácil agregar nuevas tabs
- 🎨 **Personalizable**: Componentes reutilizables
- 📱 **Responsive**: Scroll horizontal automático

---

**Versión**: 1.0
**Fecha**: Diciembre 2025
**Stack**: Laravel 11 + Inertia.js 2 + React 19 + TypeScript
