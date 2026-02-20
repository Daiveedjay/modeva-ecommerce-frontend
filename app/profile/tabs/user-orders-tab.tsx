"use client";

import { Package } from "lucide-react";
import { useState } from "react";

import { useGetUserOrders } from "@/app/_queries/profile/orders/get-user-orders";
import { OrderDetailsDrawer } from "@/app/profile/order-details-drawer";

import { EmptyState } from "@/app/profile/resueables/empty-state";
import { ErrorState } from "@/app/profile/resueables/error-state";
import { LoadingState } from "@/app/profile/resueables/loading-state";
import { formatCurrency, formatDateTime, statusColors } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PaginationControls } from "@/components/reuseables/pagination-controls";
import { OrderResponse } from "@/lib/types/order";

export default function UserOrdersTab() {
  const [page, setPage] = useState(1);
  const limit = 3;
  const { data, isLoading, isError, refetch, isFetching } = useGetUserOrders(
    page,
    limit,
  );
  const orders = data?.data ?? [];

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const router = useRouter();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading orders"
        description="We couldn't load your orders. Please try refreshing the page"
        onRetry={refetch}
      />
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<Package className="text-muted-foreground" />}
        title="No orders yet"
        description="Once you place an order, it will appear here for easy tracking."
        actionLabel="Start Shopping"
        onAction={() => router.push("/products")}
      />
    );
  }

  return (
    <>
      <OrderHistory
        orders={orders}
        onViewDetails={(id) => {
          setSelectedOrderId(id);
          setDrawerOpen(true);
        }}
      />
      {data?.meta && (
        <div className="flex justify-end">
          <PaginationControls<OrderResponse>
            data={data}
            setPage={setPage}
            isFetching={isFetching}
          />
        </div>
      )}

      <OrderDetailsDrawer
        orderId={selectedOrderId}
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (!open) setSelectedOrderId(null);
        }}
      />
    </>
  );
}

function OrderHistory({
  orders,
  onViewDetails,
}: {
  orders: OrderResponse[];
  onViewDetails: (id: string) => void;
}) {
  return (
    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 lg:mb-16">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8">
        <span className="tab_header">Order History</span>
        <div className="h-[0.5px] flex-1 bg-neutral-100" />
      </div>

      <div className="space-y-4 md:space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  onViewDetails,
}: {
  order: OrderResponse;
  onViewDetails: (id: string) => void;
}) {
  return (
    <div className="bg-white p-4 md:p-6 lg:p-10 border border-neutral-100 rounded-none transition-all duration-500 hover:border-neutral-300 group">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 md:mb-8 pb-6 md:pb-8 border-b border-neutral-100 gap-4 sm:gap-0">
        {/* Left side: Order number and date */}
        <div className="w-full sm:w-auto">
          <h4 className="text-xl md:text-2xl font-normal tracking-tight mb-1 md:mb-2 font-beatrice-deck text-neutral-900">
            {order.order_number}
          </h4>
          <p className="text-xs md:text-[13px] text-neutral-400 font-beatrice tracking-tight">
            {order.created_at && formatDateTime(order.created_at)}
          </p>
        </div>

        {/* Right side: Status and amount */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-4 sm:gap-0">
          <p
            className={`px-2 w-max mb-0 sm:mb-2 py-1.5 md:py-2 bg-neutral-900 text-[8px] md:text-[9px] uppercase tracking-[0.8px] md:tracking-[1px] font-semibold font-beatrice ${
              statusColors[order.status]
            }`}>
            {order.status}
          </p>
          <p className="text-2xl md:text-3xl font-normal tracking-tight font-beatrice-deck text-neutral-900">
            {formatCurrency(order.total_amount)}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <p className="text-xs md:text-[13px] text-neutral-400 font-beatrice tracking-tight">
          {order.item_count} item{order.item_count > 1 ? "s" : ""}
        </p>

        <button
          onClick={() => onViewDetails(order.id)}
          className="button text-neutral-900 hover:bg-foreground hover:text-background font-beatrice px-4 md:px-6 py-2.5 md:py-3 border border-neutral-200 rounded-none hover:border-neutral-400 transition-all duration-300 w-full sm:w-auto text-sm md:text-base">
          View Details
        </button>
      </div>
    </div>
  );
}
