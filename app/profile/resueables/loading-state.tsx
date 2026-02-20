import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  cardCount?: number;
  className?: string;
}

export function LoadingState({ cardCount = 2, className }: LoadingStateProps) {
  return (
    <div className={`space-y-8 mb-16 ${className ?? ""}`}>
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="bg-card p-6 border border-stone-200 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              {/* <Skeleton className="h-4 w-1/2" /> */}
            </div>

            <div className="flex gap-3 pt-4">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
