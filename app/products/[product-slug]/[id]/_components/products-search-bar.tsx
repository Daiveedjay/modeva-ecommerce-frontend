import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  isSearching: boolean;
}

export function ProductsSearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  isSearching,
}: SearchBarProps) {
  return (
    <div className="flex gap-2 mb-6 max-w-md">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
        placeholder="Search products..."
        className="h-12! border border-border"
      />
      <Button
        onClick={onSearch}
        className={`h-12 px-6  ${value.length === 0 ? "opacity-50 cursor-not-allowed" : "bg-foreground text-background"}`}>
        <Search
          size={18}
          className={`${value.length ? " text-background" : "text-foreground"} `}
        />
      </Button>

      {isSearching && (
        <Button
          onClick={onClear}
          className="h-12 px-4 text-muted-foreground hover:text-foreground">
          Clear
        </Button>
      )}
    </div>
  );
}
