"use client";

import { Clock } from "lucide-react";
import React from "react";
import { formatCurrency, formatDateTime, statusColors } from "@/lib/utils";
import { useGetUserOverview } from "@/app/_queries/profile/user/get-user-overview";
import { LoadingState } from "@/app/profile/resueables/loading-state";
import { ErrorState } from "@/app/profile/resueables/error-state";
import { RecentOrder } from "@/lib/types/profile";
import { useFavouritesStore } from "@/app/cart/_hooks/use-favourites-store";

export default function UserOverviewTab() {
  const { data, isLoading, isError, refetch } = useGetUserOverview();
  const overview_data = data?.data;

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError || !overview_data) {
    return (
      <ErrorState
        title="Error loading overview"
        description="We couldn't load your overview addresses. Please try refreshing the page"
        onRetry={refetch}
      />
    );
  }

  const itemsLength = useFavouritesStore((s) => s.items.length);

  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-16 mb-8 md:mb-12 lg:mb-16">
      {/* Overview Stats */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8">
          <span className="tab_header">Overview</span>
          <div className="h-[0.5px] flex-1 bg-neutral-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <OverviewStat
            title="Total Purchases"
            value={formatCurrency(overview_data?.total_purchases)}>
            Across {overview_data?.total_orders} orders
          </OverviewStat>

          <OverviewStat
            title="Loyalty Points"
            value={overview_data.loyalty_points.toString()}>
            Redeemable
          </OverviewStat>

          <OverviewStat title="Saved Items" value={itemsLength.toString()}>
            In your wishlist
          </OverviewStat>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8">
          <span className="tab_header">Recent Activity</span>
          <div className="h-[0.5px] flex-1 bg-neutral-100" />
        </div>

        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          {overview_data?.recent_orders?.map((order) => (
            <OrderActivityRow key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function OverviewStat({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 md:p-8 lg:p-10 border border-neutral-100 rounded-none">
      <p className="tab_leading mb-2 md:mb-3 lg:mb-4">{title}</p>
      <p className="text-2xl md:text-3xl font-normal tracking-tight font-beatrice-deck text-neutral-900 mb-1 md:mb-2">
        {value}
      </p>
      <p className="text-xs md:text-[13px] text-neutral-400 font-beatrice tracking-tight">
        {children}
      </p>
    </div>
  );
}

function OrderActivityRow({ order }: { order: RecentOrder }) {
  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 border border-neutral-100 rounded-none transition-all duration-500 hover:border-neutral-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        {/* Left side: Icon + Order info */}
        <div className="flex items-start sm:items-center gap-3 md:gap-4 w-full sm:w-auto">
          <Clock className="w-4 h-4 text-neutral-400 mt-0.5 sm:mt-0 shrink-0" />
          <div className="min-w-0 flex-1 sm:flex-initial">
            <p className="text-sm md:text-[15px] font-normal tracking-tight font-beatrice text-neutral-900 mb-1 md:mb-2 truncate">
              {order.order_number}
            </p>
            <p className="tab_text text-xs md:text-sm">
              {formatDateTime(order.created_at)}
            </p>
          </div>
        </div>

        {/* Right side: Amount + Status */}
        <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-0">
          <p className="text-sm md:text-[15px] font-normal tracking-tight font-beatrice text-neutral-900 mb-0 sm:mb-2">
            {formatCurrency(order.total_amount)}
          </p>
          <p
            className={`px-2 w-max py-1.5 md:py-2 bg-neutral-900 text-[8px] md:text-[9px] uppercase tracking-[1px] font-semibold font-beatrice ${
              statusColors[order.status]
            }`}>
            {order.status}
          </p>
        </div>
      </div>
    </div>
  );
}
