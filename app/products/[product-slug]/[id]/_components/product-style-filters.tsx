import { useRouter, useSearchParams } from "next/navigation";

const STYLE = ["Pants", "Shirts", "Jackets", "Suits"];

export function ProductStyleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedStyle = searchParams.get("style") || "All";

  const handleStyleClick = (style: string) => {
    const params = new URLSearchParams(searchParams);
    const currentStyle = searchParams.get("style");

    if (currentStyle === style) {
      params.delete("style");
    } else {
      params.set("style", style);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-8">
      <div className="flex gap-2">
        {STYLE.map((style) => (
          <button
            key={style}
            onClick={() => handleStyleClick(style)}
            className={`flex-1 cursor-pointer uppercase h-12 px-3 text-xs border transition-colors ${
              selectedStyle === style
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground"
            }`}>
            {style}
          </button>
        ))}
      </div>
    </div>
  );
}
