"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [value, setValue] = useState("");

  return (
    <div className="mt-4 relative w-full md:w-91.75 max-w-md md:max-w-none max-[1100px]:w-full pr-6">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-primary selection:bg-foreground rounded-xs py-6 peer"
      />
      {/* Only show icon when input is empty AND not focused */}
      <Search
        strokeWidth={1.5}
        size={16}
        className={`absolute top-1/2 left-4 -translate-y-1/2 ${
          value !== "" ? "opacity-0" : "opacity-100"
        }`}
      />
      <span className="absolute top-1/2 -translate-y-1/2 right-11 text-xs text-black/66">
        Search
      </span>
    </div>
  );
}
