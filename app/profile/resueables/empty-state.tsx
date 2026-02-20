import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Empty className="min-h-[400px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>

        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      {actionLabel && onAction && (
        <EmptyContent>
          <Button
            variant="outline"
            className="uppercase text-xs tracking-widest font-light"
            onClick={onAction}>
            {actionLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
