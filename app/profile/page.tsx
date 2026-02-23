"use client";

import { useState } from "react";
import BackLink from "@/app/_resuseables/back-link";
import UserAddressTab from "@/app/profile/tabs/user-address-tab";
import UserOrdersTab from "@/app/profile/tabs/user-orders-tab";
import UserOverviewTab from "@/app/profile/tabs/user-overview-tab";
import { UserPaymentMethodsTab } from "@/app/profile/tabs/user-payment-methods-tab";
import UserDetails from "@/app/profile/user-details";
import UserTabsController from "@/app/profile/user-tabs-controller";
import { Button } from "@/components/ui/button";
import { useMe } from "@/app/profile/_hooks/use-me";
import { LogOut } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogout } from "@/app/profile/_hooks/use-logout";
import NavBar from "@/app/_resuseables/nav-bar";
import { SignOutModal } from "@/app/profile/modals/profile/sign-out-modal";

type Tab = "overview" | "addresses" | "orders" | "payments";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: me, isLoading } = useMe();

  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  const tabParam = searchParams.get("tab");

  const activeTab: Tab =
    tabParam === "addresses" || tabParam === "orders" || tabParam === "payments"
      ? tabParam
      : "overview";

  const logoutMutation = useLogout({
    onDone: () => router.push("/"),
  });

  const handleConfirmSignOut = () => {
    logoutMutation.mutate();
    setIsSignOutOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4 opacity-50">
          <div className="text-6xl">👤</div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <UserDetails />

        <UserTabsController activeTab={activeTab} />

        {activeTab === "overview" && <UserOverviewTab />}
        {activeTab === "addresses" && <UserAddressTab />}
        {activeTab === "payments" && <UserPaymentMethodsTab />}
        {activeTab === "orders" && <UserOrdersTab />}

        <div className="pt-12 border-t border-stone-200">
          <Button
            onClick={() => setIsSignOutOpen(true)}
            variant="outline"
            disabled={logoutMutation.isPending}
            className="border-stone-300 text-stone-900 uppercase hover:bg-foreground hover:text-background text-xs tracking-widest font-light bg-transparent h-10 sm:h-11">
            <LogOut className="w-4 h-4 mr-3" />
            Sign out
          </Button>
        </div>
      </main>

      {/* Modal */}
      <SignOutModal
        isOpen={isSignOutOpen}
        onClose={() => setIsSignOutOpen(false)}
        onConfirm={handleConfirmSignOut}
      />
    </div>
  );
}
