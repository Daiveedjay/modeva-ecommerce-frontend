"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function SignOutModal({
  isOpen,
  onClose,
  onConfirm,
}: SignOutModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white border-stone-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-light uppercase tracking-wide text-stone-900">
            Sign Out
          </AlertDialogTitle>
          <AlertDialogDescription className="text-stone-600">
            Are you sure you want to sign out of your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-4 pt-4">
          <AlertDialogCancel className="flex-1 border-stone-300 text-stone-900 hover:bg-stone-50 uppercase text-xs tracking-widest font-light">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 bg-stone-900 text-white hover:bg-stone-800 uppercase text-xs tracking-widest font-light">
            Sign Out
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
