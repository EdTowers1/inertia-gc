# Toolbar Component

Componente reutilizable para mostrar acciones (botones) y un selector opcional de sucursales o entidades.

## Características

- ✅ **Totalmente tipado** con TypeScript
- ✅ **Flexible y reutilizable** para diferentes vistas
- ✅ **Customizable** con props de estilo
- ✅ **Accesible** con tooltips y semántica correcta
- ✅ **Responsive** con clases Tailwind

## Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `actions` | `ToolbarAction[]` | No | `[]` | Lista de acciones a mostrar en el lado izquierdo |
| `branches` | `Branch[]` | No | `[]` | Lista de sucursales para el selector |
| `selectedBranchId` | `string \| number \| null` | No | - | ID de la sucursal seleccionada |
| `onBranchChange` | `(id: string \| number) => void` | No | - | Callback cuando cambia la sucursal |
| `branchPlaceholder` | `string` | No | `"Sucursal"` | Placeholder del selector |
| `className` | `string` | No | `""` | Clases CSS adicionales para el contenedor |
| `selectClassName` | `string` | No | - | Clases CSS personalizadas para el SelectTrigger |
| `rightSlot` | `ReactNode` | No | - | Contenido personalizado en el lado derecho |
| `iconSize` | `number` | No | `5` | Tamaño de los íconos (en Tailwind units) |
| `buttonSize` | `number` | No | `8` | Tamaño de los botones (en Tailwind units) |

## Tipos

### ToolbarAction

```typescript
type ToolbarAction = {
    key: string;              // ID único de la acción
    label: string;            // Texto para el tooltip
    icon: LucideIcon;         // Ícono de Lucide React
    onClick?: () => void;     // Handler del click
    variant?: 'default' | 'ghost' | 'outline' | ...;  // Variante del botón
    className?: string;       // Clases CSS adicionales
    disabled?: boolean;       // Estado deshabilitado
};
```

### Branch

```typescript
type Branch = {
    id: string | number;      // ID único de la sucursal
    name: string;             // Nombre a mostrar
};
```

## Ejemplos de Uso

### Ejemplo Básico (Solo Acciones)

```tsx
import { Plus, Trash2 } from 'lucide-react';
import Toolbar, { type ToolbarAction } from '@/components/toolbar/toolbar';

function MyComponent() {
    const actions: ToolbarAction[] = [
        {
            key: 'add',
            label: 'Agregar nuevo',
            icon: Plus,
            onClick: () => console.log('Agregar'),
            variant: 'default',
        },
        {
            key: 'delete',
            label: 'Eliminar',
            icon: Trash2,
            onClick: () => console.log('Eliminar'),
            className: 'text-destructive',
        },
    ];

    return <Toolbar actions={actions} />;
}
```

### Ejemplo con Selector de Sucursales

```tsx
import { useCallback, useState } from 'react';
import Toolbar, { type Branch } from '@/components/toolbar/toolbar';

function MyComponent() {
    const [selectedBranch, setSelectedBranch] = useState<string>('1');

    const branches: Branch[] = [
        { id: '1', name: 'Principal' },
        { id: '2', name: 'Secundaria' },
    ];

    const handleBranchChange = useCallback((id: string | number) => {
        setSelectedBranch(String(id));
        // Recargar datos según la sucursal
    }, []);

    return (
        <Toolbar
            branches={branches}
            selectedBranchId={selectedBranch}
            onBranchChange={handleBranchChange}
            branchPlaceholder="Selecciona sucursal"
        />
    );
}
```

### Ejemplo Completo (Acciones + Selector)

```tsx
import { useCallback, useState } from 'react';
import { Download, Plus, RefreshCw } from 'lucide-react';
import Toolbar, { 
    type ToolbarAction, 
    type Branch 
} from '@/components/toolbar/toolbar';

function MyComponent() {
    const [selectedBranch, setSelectedBranch] = useState<string>('1');

    const handleAdd = useCallback(() => {
        console.log('Agregar nuevo elemento');
    }, []);

    const handleRefresh = useCallback(() => {
        console.log('Refrescar datos');
    }, []);

    const handleExport = useCallback(() => {
        console.log('Exportar datos');
    }, []);

    const actions: ToolbarAction[] = [
        {
            key: 'add',
            label: 'Agregar',
            icon: Plus,
            onClick: handleAdd,
            variant: 'default',
            className: 'bg-green-600 hover:bg-green-700',
        },
        {
            key: 'refresh',
            label: 'Refrescar',
            icon: RefreshCw,
            onClick: handleRefresh,
        },
        {
            key: 'export',
            label: 'Exportar',
            icon: Download,
            onClick: handleExport,
        },
    ];

    const branches: Branch[] = [
        { id: '1', name: 'Bogotá' },
        { id: '2', name: 'Medellín' },
        { id: '3', name: 'Cali' },
    ];

    return (
        <Toolbar
            actions={actions}
            branches={branches}
            selectedBranchId={selectedBranch}
            onBranchChange={setSelectedBranch}
        />
    );
}
```

### Ejemplo con Right Slot Personalizado

```tsx
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Toolbar from '@/components/toolbar/toolbar';

function MyComponent() {
    const actions = [/* ... */];

    return (
        <Toolbar
            actions={actions}
            rightSlot={
                <div className="flex items-center gap-2">
                    <Search className="size-4 text-gray-400" />
                    <Input 
                        placeholder="Buscar..." 
                        className="h-8"
                    />
                </div>
            }
        />
    );
}
```

## Mejores Prácticas

### 1. **Memorizar Callbacks con `useCallback`**

Siempre usa `useCallback` para los handlers de `onClick` y `onBranchChange`:

```tsx
// ✅ CORRECTO
const handleAdd = useCallback(() => {
    console.log('agregar');
}, []);

// ❌ INCORRECTO
const handleAdd = () => {
    console.log('agregar');
};
```

### 2. **Definir Acciones Dentro del Componente**

Define las acciones como una constante dentro del componente (no con `useMemo`):

```tsx
// ✅ CORRECTO
function MyComponent() {
    const handleAdd = useCallback(() => {}, []);
    
    const actions: ToolbarAction[] = [
        { key: 'add', label: 'Agregar', icon: Plus, onClick: handleAdd }
    ];
    
    return <Toolbar actions={actions} />;
}

// ❌ INCORRECTO - useMemo innecesario
const actions = useMemo<ToolbarAction[]>(
    () => [{ key: 'add', label: 'Agregar', icon: Plus, onClick: handleAdd }],
    []
);
```

### 3. **Importar Tipos del Toolbar**

Reutiliza los tipos exportados en lugar de duplicarlos:

```tsx
// ✅ CORRECTO
import Toolbar, { type Branch, type ToolbarAction } from '@/components/toolbar/toolbar';

// ❌ INCORRECTO
type Branch = { id: string | number; name: string };
```

### 4. **Usar Variantes Semánticas**

Aprovecha las variantes del botón para dar contexto visual:

```tsx
const actions: ToolbarAction[] = [
    {
        key: 'add',
        label: 'Agregar',
        icon: Plus,
        onClick: handleAdd,
        variant: 'default',  // Acción principal
        className: 'bg-green-600',
    },
    {
        key: 'delete',
        label: 'Eliminar',
        icon: Trash2,
        onClick: handleDelete,
        variant: 'ghost',  // Acción secundaria
        className: 'text-destructive',  // Color de peligro
    },
];
```

### 5. **Extraer Constantes**

Para datos mock o estáticos, defínelos fuera del componente:

```tsx
// ✅ CORRECTO
const MOCK_BRANCHES: Branch[] = [
    { id: '1', name: 'Principal' },
];

function MyComponent() {
    const [branches] = useState<Branch[]>(MOCK_BRANCHES);
    // ...
}
```

## Personalización de Estilos

### Cambiar Estilos del Selector

```tsx
<Toolbar
    branches={branches}
    selectClassName="border-blue-500 bg-blue-50"
/>
```

### Ajustar Tamaños de Botones e Íconos

```tsx
<Toolbar
    actions={actions}
    iconSize={6}      // Íconos más grandes
    buttonSize={10}   // Botones más grandes
/>
```

### Estilos del Contenedor

```tsx
<Toolbar
    actions={actions}
    className="bg-gray-50 p-4 rounded-lg"
/>
```

## Casos de Uso Comunes

1. **Lista de Entidades**: Muestra acciones CRUD y selector de sucursal
2. **Dashboard**: Solo acciones de exportar/refrescar
3. **Formularios**: Acciones de guardar/cancelar
4. **Tablas**: Acciones de filtrado y selector de vista

## Troubleshooting

### Las acciones no se muestran

Verifica que el array `actions` no esté vacío y que cada acción tenga `onClick` definido.

### El selector no aparece

Asegúrate de pasar tanto `branches` como `onBranchChange`.

### Re-renders constantes

Usa `useCallback` para todos los handlers y evita definir las acciones con `useMemo`.

## Migración desde Versión Anterior

Si ya tienes código usando el Toolbar, estos son los cambios:

```tsx
// ANTES
import Toolbar, { type ToolbarAction } from '@/components/toolbar/toolbar';
type Branch = { id: string | number; name: string };

// AHORA
import Toolbar, { 
    type ToolbarAction, 
    type Branch  // ← Importar desde toolbar
} from '@/components/toolbar/toolbar';
```
