import { Spinner } from "@/components/reuseables/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreditCard } from "lucide-react";

export default function SetDefaultCardModal({
  isOpen,
  isSettingDefault,
  onClose,
  onAction,
}: {
  isOpen: boolean;
  onClose: () => void;
  isSettingDefault: boolean;
  onAction: () => Promise<void>;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[calc(100vw-2rem)] sm:w-full max-w-md p-4 sm:p-6 gap-4 sm:gap-6">
        <AlertDialogHeader className="space-y-3 sm:space-y-4">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <AlertDialogTitle className="text-xl sm:text-2xl font-beatrice-deck font-normal tracking-tight text-center">
            Set as default card?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground text-sm sm:text-base px-2 sm:px-0">
            This card will be used as your primary payment method for future
            transactions.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-4">
          <AlertDialogCancel className="w-full sm:flex-1 h-11 sm:h-12 text-xs sm:text-sm font-semibold tracking-wide hover:bg-border order-2 sm:order-1 mt-0">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full sm:flex-1 h-11 sm:h-12 bg-foreground hover:bg-foreground/70 text-primary-foreground text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2"
            onClick={onAction}
            disabled={isSettingDefault}>
            {isSettingDefault && <Spinner className="w-4 h-4" />}
            {isSettingDefault ? "Setting…" : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
