import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../app/components/ui/alert-dialog';
import { useCmsTheme } from '../context/cms-theme';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/**
 * Delete confirmation shared by vehicles, blog posts, and bookings.
 * Colors are set explicitly so a portaled dialog stays readable in light and dark CMS themes.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  const { theme } = useCmsTheme();
  const light = theme === 'light';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={
          light
            ? 'border-zinc-200 bg-white text-zinc-950 shadow-2xl'
            : 'border-zinc-700 bg-zinc-950 text-zinc-50 shadow-2xl'
        }
      >
        <AlertDialogHeader>
          <AlertDialogTitle className={light ? 'text-zinc-950' : 'text-white'}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className={light ? 'text-zinc-600' : 'text-zinc-300'}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={
              light
                ? 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900'
                : 'border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-white'
            }
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
