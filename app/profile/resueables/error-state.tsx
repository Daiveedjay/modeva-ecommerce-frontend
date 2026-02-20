import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <Empty className="min-h-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle className="text-destructive" />
        </EmptyMedia>

        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      {onRetry && (
        <EmptyContent>
          <Button
            variant="outline"
            className="uppercase text-xs tracking-widest font-light"
            onClick={onRetry}>
            Try again
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
