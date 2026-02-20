"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ProductsErrorStateProps {
  onRetry: () => void;
}

export function ProductsErrorState({ onRetry }: ProductsErrorStateProps) {
  return (
    <Empty className="border-none py-16 md:py-24">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircle className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>Unable to Load Products</EmptyTitle>
        <EmptyDescription className=" font-beatrice tracking-[0px]">
          We encountered an issue while fetching the products. Please try again
          or contact support if the problem persists.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          onClick={onRetry}
          className="gap-2 bg-foreground"
          variant="default">
          <RotateCcw className="size-4" />
          Try Again
        </Button>
      </EmptyContent>
    </Empty>
  );
}
