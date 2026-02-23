import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMe } from "@/app/profile/_hooks/use-me";
import { EditProfileModal } from "@/app/profile/modals/profile/edit-profile-modal";
import { useState } from "react";

export default function UserDetails() {
  const [open, setOpen] = useState(false);
  const { data: user, isLoading } = useMe();
  console.log(user, "User");

  if (isLoading) {
    return (
      <div className="mb-8 md:mb-16 pb-8 md:pb-12 border-b border-stone-200">
        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-stone-200 animate-pulse" />
      </div>
    );
  }

  if (!user) return null; // Profile page already guards, so this is just a safety net

  return (
    <div className="mb-8 md:mb-16 pb-8 md:pb-12 border-b border-stone-200">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8 md:mb-12">
        {/* Left side: Avatar + Info */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-stone-200 rounded-full overflow-hidden shrink-0">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name || "User Avatar"}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="pt-0 sm:pt-2 md:pt-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-1 md:mb-2 tracking-tight">
              {user.name?.replace("+", " ")}
            </h2>

            <p className="text-stone-600 font-beatrice tracking-[0px] mb-4 md:mb-6 text-sm md:text-base">
              Customer since{" "}
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
            </p>

            <div className="space-y-1 md:space-y-2 font-beatrice tracking-[0px]">
              <p className="text-xs md:text-sm text-stone-600 break-all">
                {user.email}
              </p>
              <p className="text-xs md:text-sm text-stone-600">
                {user?.phone || "No number"}
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Edit Button */}
        <Button
          variant="outline"
          className="border-stone-300 text-foreground hover:bg-foreground hover:text-background uppercase text-xs tracking-widest font-light bg-transparent w-full sm:w-auto sm:shrink-0 h-10 sm:h-11"
          onClick={() => setOpen(true)}>
          Edit Profile
        </Button>
      </div>

      <EditProfileModal
        key={open ? user.id : "closed"}
        isOpen={open}
        onClose={() => setOpen(false)}
        profile={{ name: user.name, email: user.email, phone: user.phone }}
      />
    </div>
  );
}
