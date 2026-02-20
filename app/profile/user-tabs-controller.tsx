"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Tab = "overview" | "addresses" | "orders" | "payments";

export default function UserTabsController({ activeTab }: { activeTab: Tab }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabClick = (tab: Tab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("tab", tab);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-8 md:mb-12 lg:mb-16 flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 border-b font-beatrice border-stone-200 overflow-x-auto scrollbar-hide">
      {[
        { id: "overview", label: "Overview" },
        { id: "addresses", label: "Addresses" },
        { id: "payments", label: "Payment" },
        { id: "orders", label: "Orders" },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id as Tab)}
          className={`pb-3 md:pb-4 cursor-pointer text-[10px] sm:text-xs md:text-sm tracking-wide uppercase font-semibold transition-colors whitespace-nowrap shrink-0 ${
            activeTab === tab.id
              ? "text-stone-900 border-b-2 border-stone-900"
              : "text-stone-400 border-b-2 border-transparent hover:text-stone-600"
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
