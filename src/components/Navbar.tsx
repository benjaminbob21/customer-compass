"use client";

/**
 * Navbar component - Navigation between pages
 */

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "text-[var(--brand-deep)] border-b-2 border-[var(--brand-blue)]"
      : "text-[var(--brand-ink)]/72 hover:text-[var(--brand-deep)]";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/65 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <BrandLogo size="nav" showText />
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium md:gap-8">
            <Link href="/" className={`pb-2 transition-colors ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/rescue" className={`pb-2 transition-colors ${isActive("/rescue")}`}>
              Proactive Rescue
            </Link>
            <Link href="/impact" className={`pb-2 transition-colors ${isActive("/impact")}`}>
              Impact
            </Link>
            <Link href="/journey" className={`pb-2 transition-colors ${isActive("/journey")}`}>
              Journey
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
