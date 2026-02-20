import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

export default function MultiSelectHeader({
  name,
  total_price,
}: {
  name: string;
  total_price: number;
}) {
  return (
    <DialogHeader className="p-4 sm:p-6 md:p-8 lg:p-10 pb-4 sm:pb-5 md:pb-6 lg:pb-6 border-b border-border/40 bg-background/50 backdrop-blur-sm shrink-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0">
        <div className="space-y-1.5">
          <p className="text-[9px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">
            Batch Inventory Selection
          </p>
          <DialogTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight font-beatrice-deck text-foreground">
            {name}
          </DialogTitle>
        </div>
        {/* <div className="block sm:hidden text-right">
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-1">
            Total Value
          </p>
          <p className="text-xl">{formatCurrency(total_price)}</p>
        </div> */}
        <div className="hidden lg:block text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-1">
            Total Value
          </p>
          <p className="text-2xl md:text-3xl">{formatCurrency(total_price)}</p>
        </div>
      </div>
    </DialogHeader>
  );
}
