"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackLink = () => {
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const currentPath = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prev = sessionStorage.getItem("prevPath");
      if (prev && prev !== currentPath) {
        setPrevPath(prev);
      }
      sessionStorage.setItem("prevPath", currentPath);
    }
  }, [currentPath]);

  const getLabelFromPath = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments.pop() || "Home";
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const label = prevPath ? getLabelFromPath(prevPath) : "Home";
  const href = prevPath || "/";

  return (
    <Link
      href={href}
      className="flex items-center text-stone-600 hover:text-stone-900 transition-colors">
      <ChevronLeft className="w-6 h-6" />
      <span className="ml-2 text-sm font-beatrice tracking-[0px]">{label}</span>
    </Link>
  );
};

export default BackLink;
