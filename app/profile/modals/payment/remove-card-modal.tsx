import { Spinner } from "@/components/reuseables/spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

export default function RemoveCardModal({
  isOpen,
  isDeleting,
  onClose,
  onAction,
}: {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onAction: () => Promise<void>;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[calc(100vw-2rem)] sm:w-full max-w-md p-4 sm:p-6 gap-4 sm:gap-6">
        <AlertDialogHeader className="space-y-3 sm:space-y-4">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-xl sm:text-2xl font-beatrice-deck font-normal tracking-tight text-center">
            Remove this card?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground text-sm sm:text-base px-2 sm:px-0">
            This action cannot be undone. You will no longer be able to use this
            card for payments.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-4">
          <AlertDialogCancel className="w-full sm:flex-1 h-11 sm:h-12 text-xs sm:text-sm font-semibold tracking-wide hover:bg-border order-2 sm:order-1 mt-0">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            disabled={isDeleting}
            className="w-full sm:flex-1 h-11 sm:h-12 bg-destructive hover:bg-destructive/70 text-background text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isDeleting && <Spinner className="w-4 h-4" />}
            {isDeleting ? "Removing…" : "Remove card"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
