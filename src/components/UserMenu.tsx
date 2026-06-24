"use client";

/**
 * UserMenu — Microsoft-style identity affordance for the suite header.
 * Shows "Sign in" with the Microsoft logo when signed out, and an account
 * avatar + flyout (name, UPN, sign out) when signed in.
 */

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Icon from "@/components/Icon";

export default function UserMenu() {
  const { user, isDemo, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) {
    return (
      <button
        type="button"
        onClick={signIn}
        className="inline-flex items-center gap-2 rounded-md border border-[var(--neutral-stroke-2)] bg-white px-3.5 py-2 text-sm font-semibold text-[var(--neutral-fg-1)] shadow-sm transition-colors hover:bg-[var(--brand-tint)]"
      >
        <Icon name="microsoft" size={18} />
        Sign in
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[var(--neutral-stroke-1)] bg-white py-1 pl-1 pr-3 text-sm font-medium text-[var(--neutral-fg-1)] shadow-sm transition-colors hover:bg-[var(--neutral-bg-2)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-primary)] text-xs font-bold text-white">
          {user.initials}
        </span>
        <span className="hidden max-w-[10rem] truncate sm:block">{user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-[var(--neutral-stroke-1)] bg-white shadow-[var(--shadow-28)]">
          <div className="flex items-center gap-3 border-b border-[var(--neutral-stroke-1)] p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
              {user.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--neutral-fg-1)]">{user.name}</p>
              <p className="truncate text-xs text-[var(--neutral-fg-3)]">{user.username}</p>
            </div>
          </div>
          {isDemo && (
            <div className="bg-[var(--status-warning-bg)] px-4 py-2 text-xs font-medium text-[var(--status-warning)]">
              Demo session — connect Entra ID for real single sign-on.
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-[var(--neutral-fg-2)] transition-colors hover:bg-[var(--neutral-bg-2)]"
          >
            <Icon name="lock" size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
