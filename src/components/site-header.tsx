"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ArrowRightIcon from "@heroicons/react/24/outline/ArrowRightIcon";
import BeakerIcon from "@heroicons/react/24/outline/BeakerIcon";
import { EnvBadge } from "@/components/env-badge";
import { HamburgerMenuButton } from "@/components/hamburger-menu-button";
import { BRAND } from "@/lib/brand";

const links = [
  { href: "/payouts", label: "Payout dashboard" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/seller", label: "Seller account" },
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Create account" },
  { href: "/provider", label: "Provider illustration" },
  { href: "/admin", label: "Admin tools · restricted" },
] as const;

const primaryLinks = [links[0], links[1]] as const;
const accountLinks = [links[2], links[3], links[4]] as const;
const additionalLinks = [links[5], links[6]] as const;
const primaryLabels: Record<(typeof primaryLinks)[number]["href"], string> = {
  "/payouts": "Payout dashboard",
  "/marketplace": "Marketplace",
};

function isActiveLink(pathname: string | null, href: (typeof links)[number]["href"]) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLink({
  href,
  label,
  pathname,
  onClick,
  prominent = false,
}: {
  href: (typeof links)[number]["href"];
  label: string;
  pathname: string | null;
  onClick?: () => void;
  prominent?: boolean;
}) {
  const active = isActiveLink(pathname, href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={prominent
        ? "focus-ring inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-md bg-[var(--color-brand)] px-3 py-2 text-sm font-semibold text-white transition-colors hover:brightness-95"
        : `focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]" : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"}`}
    >
      {label}
    </Link>
  );
}

function HeaderShell({
  pathname,
  open,
  onToggle,
  onNavigate,
}: {
  pathname: string | null;
  open: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}) {
  const landingMode = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1380px] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label={`${BRAND.name} home`}
          className="focus-ring inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-[var(--color-ink)] sm:gap-2 sm:text-lg"
        >
          <Image
            src="/images/marketbridge-brand-mark.png"
            alt=""
            aria-hidden="true"
            width={96}
            height={48}
            className="h-8 w-14 object-cover object-center sm:h-9 sm:w-16"
          />
          <span>{BRAND.name}</span>
        </Link>

        <nav className={`ml-auto hidden items-center gap-1 ${landingMode ? "lg:flex" : "xl:flex"}`} aria-label="Primary">
          {landingMode ? (
            <>
              <Link href="/#product" onClick={onNavigate} className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:bg-white hover:text-[var(--color-ink)]">Product</Link>
              <Link href="/#how-it-works" onClick={onNavigate} className="focus-ring rounded-md px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] hover:bg-white hover:text-[var(--color-ink)]">How it works</Link>
              <NavigationLink href="/marketplace" label="For teams" pathname={pathname} onClick={onNavigate} />
            </>
          ) : primaryLinks.map((link) => (
            <NavigationLink key={link.href} {...link} label={primaryLabels[link.href]} pathname={pathname} onClick={onNavigate} />
          ))}
        </nav>

        {landingMode ? (
          <div className="hidden items-center gap-3 lg:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 ring-1 ring-emerald-100">
              <BeakerIcon aria-hidden="true" className="size-4" /> Demo mode
            </span>
            <Link href="/payouts" className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#0d4935] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#0a3d2d]">
              Explore payout demo <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="hidden items-center gap-1 xl:flex">
            {accountLinks.map((link) => (
              <NavigationLink key={link.href} {...link} pathname={pathname} onClick={onNavigate} prominent={link.href === "/sign-up"} />
            ))}
          </div>
        )}

        <div className={`hidden ${landingMode ? "lg:hidden" : "xl:block"}`}>
          <EnvBadge compact />
        </div>

        <div className={`${landingMode ? "ml-auto lg:hidden" : "ml-auto xl:ml-0"}`}>
          <HamburgerMenuButton
            expanded={open}
            controls="mobile-nav"
            onClick={onToggle}
          />
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        style={{ right: "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))" }}
        className={`absolute inset-x-0 top-full z-50 border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3 shadow-sm sm:px-6 ${landingMode ? "lg:hidden" : "xl:inset-x-auto xl:w-64 xl:rounded-b-lg xl:border xl:bg-white xl:px-3 xl:py-3"}`}
      >
        <nav className={`flex flex-col gap-1 ${landingMode ? "" : "xl:hidden"}`} aria-label={landingMode ? "Main navigation" : "Mobile primary"}>
          {landingMode ? (
            <>
              <Link href="/#product" onClick={onNavigate} className="focus-ring rounded-md px-3 py-2 text-sm font-medium">Product</Link>
              <Link href="/#how-it-works" onClick={onNavigate} className="focus-ring rounded-md px-3 py-2 text-sm font-medium">How it works</Link>
              <NavigationLink href="/marketplace" label="For teams" pathname={pathname} onClick={onNavigate} />
              <NavigationLink href="/seller" label="Seller account" pathname={pathname} onClick={onNavigate} />
            </>
          ) : links.map((link) => (
            <NavigationLink key={link.href} {...link} pathname={pathname} onClick={onNavigate} />
          ))}
        </nav>
        <nav className="hidden flex-col gap-1 xl:flex" aria-label="Additional pages">
          {additionalLinks.map((link) => (
            <NavigationLink key={link.href} {...link} pathname={pathname} onClick={onNavigate} />
          ))}
        </nav>
        <div className={`mt-3 ${landingMode ? "lg:hidden" : "xl:hidden"}`}>
          {landingMode ? (
            <Link href="/payouts" onClick={onNavigate} className="focus-ring inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0d4935] px-4 py-2 text-sm font-semibold text-white">
              Explore payout demo <ArrowRightIcon aria-hidden="true" className="size-4" />
            </Link>
          ) : <EnvBadge />}
        </div>
      </div>
    </header>
  );
}

/** Static shell for prerender while `usePathname` resolves under Cache Components. */
export function SiteHeaderFallback() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderShell
      pathname={null}
      open={open}
      onToggle={() => setOpen((value) => !value)}
      onNavigate={() => setOpen(false)}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <HeaderShell
      pathname={pathname}
      open={open}
      onToggle={() => setOpen((v) => !v)}
      onNavigate={() => setOpen(false)}
    />
  );
}
