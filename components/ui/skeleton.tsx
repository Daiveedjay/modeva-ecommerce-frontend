import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  const hasCustomBg = className?.includes("bg-");

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        // use default only if no bg-* was passed
        !hasCustomBg && "bg-primary",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
