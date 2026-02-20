"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertCircle, RotateCcw } from "lucide-react";

interface SingleProductErrorProps {
  onRetry: () => void;
}

export function SingleProductError({ onRetry }: SingleProductErrorProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Empty className="border-none py-16 md:py-24">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle>Product Not Found</EmptyTitle>
          <EmptyDescription>
            We couldn&apos;t find the product you&apos;re looking for. It may
            have been removed or is currently unavailable.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button onClick={onRetry} className="gap-2" variant="default">
            <RotateCcw className="size-4" />
            Try Again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
