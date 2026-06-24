/**
 * Footer — Microsoft-style suite footer with product info and trust links.
 */

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";

const sections: {
  heading: string;
  links: { label: string; href?: string }[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Analyze an issue", href: "/" },
      { label: "Proactive Rescue", href: "/rescue" },
      { label: "Impact", href: "/impact" },
      { label: "Customer Journey", href: "/journey" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Future Vision", href: "/future-vision" },
      // Trust indicators — capabilities of the platform, not navigable pages.
      { label: "Built on Azure AI" },
      { label: "Entra ID single sign-on" },
      { label: "Responsible AI" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--neutral-stroke-1)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo size="nav" showText />
          <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--neutral-fg-3)]">
            Turning Microsoft&apos;s support knowledge into clear, trustworthy customer
            communication — powered by Azure AI.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.heading}>
            <h4 className="ms-eyebrow mb-4 text-[var(--neutral-fg-4)]">{section.heading}</h4>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--neutral-fg-2)] transition-colors hover:text-[var(--brand-primary)]"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-[var(--neutral-fg-3)]">
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--neutral-stroke-1)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-[var(--neutral-fg-3)] sm:flex-row">
          <p>© {new Date().getFullYear()} Customer Compass · Microsoft Global Intern Hackathon</p>
          <p className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Trust Center</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
