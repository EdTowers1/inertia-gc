import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export function CilindrosTab() {
    return (
        <div className="h-full space-y-4">
            <div>
                <h2 className="text-2xl font-bold">Cilindros</h2>
                <p className="text-sm text-muted-foreground">
                    Gestión de cilindros de gas
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>

            <div className="relative min-h-[50vh] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
        </div>
    );
}
