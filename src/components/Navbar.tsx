"use client";

/**
 * Navbar — Microsoft suite-style header.
 * App launcher (waffle) + brand + primary nav + Entra ID identity.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import UserMenu from "@/components/UserMenu";
import Icon, { type IconName } from "@/components/Icon";

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Analyze" },
  { href: "/rescue", label: "Proactive Rescue" },
  { href: "/impact", label: "Impact" },
  { href: "/journey", label: "Journey" },
];

const suiteApps: {
  label: string;
  icon: IconName;
  color: string;
  href: string;
  external?: boolean;
}[] = [
  { label: "Teams", icon: "chat", color: "#5059c9", href: "https://teams.microsoft.com", external: true },
  { label: "Outlook", icon: "mail", color: "#0f6cbd", href: "https://outlook.office.com", external: true },
  { label: "Azure", icon: "globe", color: "#008ad7", href: "https://portal.azure.com", external: true },
  { label: "Admin", icon: "shield", color: "#0e700e", href: "https://admin.microsoft.com", external: true },
  { label: "Insights", icon: "chart", color: "#8661c5", href: "https://insights.viva.office.com", external: true },
  { label: "Compass", icon: "compass", color: "#0c3b5e", href: "/" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [appsOpen, setAppsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) setAppsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="h-1 w-full bg-gradient-to-r from-[#0f6cbd] via-[#2899f5] to-[#0c3b5e]" />
      <nav className="ms-acrylic sticky top-0 z-50 border-b border-[var(--neutral-stroke-1)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Left: app launcher + brand */}
            <div className="flex items-center gap-2">
              <div ref={appsRef} className="relative">
                <button
                  type="button"
                  aria-label="App launcher"
                  aria-expanded={appsOpen}
                  onClick={() => setAppsOpen((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--neutral-fg-2)] transition-colors hover:bg-[var(--brand-tint)] hover:text-[var(--brand-primary)]"
                >
                  <Icon name="grid" size={22} />
                </button>
                {appsOpen && (
                  <div className="absolute left-0 z-50 mt-2 w-72 rounded-xl border border-[var(--neutral-stroke-1)] bg-white p-4 shadow-[var(--shadow-28)]">
                    <p className="ms-eyebrow mb-3 text-[var(--neutral-fg-4)]">Microsoft 365</p>
                    <div className="grid grid-cols-3 gap-2">
                      {suiteApps.map((app) => (
                        <a
                          key={app.label}
                          href={app.href}
                          {...(app.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          onClick={() => setAppsOpen(false)}
                          className="flex flex-col items-center gap-1.5 rounded-lg p-3 transition-colors hover:bg-[var(--neutral-bg-2)]"
                        >
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                            style={{ background: app.color }}
                          >
                            <Icon name={app.icon} size={20} />
                          </span>
                          <span className="text-xs font-medium text-[var(--neutral-fg-2)]">
                            {app.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <span className="hidden h-6 w-px bg-[var(--neutral-stroke-1)] sm:block" />

              <Link href="/" className="shrink-0">
                <BrandLogo size="nav" showText />
              </Link>
            </div>

            {/* Center: primary nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-[var(--brand-tint)] text-[var(--brand-primary)]"
                      : "text-[var(--neutral-fg-2)] hover:bg-[var(--neutral-bg-2)] hover:text-[var(--neutral-fg-1)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: identity + mobile toggle */}
            <div className="flex items-center gap-2">
              <UserMenu />
              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--neutral-fg-2)] transition-colors hover:bg-[var(--neutral-bg-2)] lg:hidden"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="border-t border-[var(--neutral-stroke-1)] py-2 lg:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-[var(--brand-tint)] text-[var(--brand-primary)]"
                      : "text-[var(--neutral-fg-2)] hover:bg-[var(--neutral-bg-2)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
