"use client";

import { useMe } from "@/app/profile/_hooks/use-me";
import { CheckCheck, User } from "lucide-react";
import Link from "next/link";

export default function UserAvatar() {
  const { data: me, isLoading } = useMe();
  const isAuthed = !!me;

  return (
    <Link
      href="/profile"
      className="relative bg-foreground p-2.5 sm:p-4 rounded-full text-background">
      <User
        strokeWidth={2}
        size={16}
        color={isAuthed ? "oklch(72.3% 0.219 149.579)" : "white"}
      />

      {isAuthed && (
        <span className="absolute top-0.5 right-0.5 rounded-full border-2 border-green-500!">
          <CheckCheck className="bg-green-500" size={10} />
        </span>
      )}

      {/* optional: show a tiny loading indicator while isLoading */}
    </Link>
  );
}
