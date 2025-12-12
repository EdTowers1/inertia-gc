import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function AlertDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />
}

// Dialog wrapper is reused for confirm-use case; overlay is handled by DialogContent and Dialog overlay styles.
function AlertDialogContent({ className, children, overlayClassName, ...props }: React.ComponentProps<typeof DialogContent> & { overlayClassName?: string }) {
  return (
    <DialogContent overlayClassName={overlayClassName} className={cn('w-full max-w-md rounded-lg p-6', className)} {...props}>
      {children}
    </DialogContent>
  )
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle className={cn('text-lg font-semibold', className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
}

export type ConfirmAlertProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title?: string
  description?: React.ReactNode
  confirmText?: string
  cancelText?: string
}

export function ConfirmAlert({
  open,
  onOpenChange,
  onConfirm,
  title = '¿Estás seguro? ',
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent overlayClassName="bg-black/50">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>{cancelText}</Button>
          <Button variant="destructive" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
}
