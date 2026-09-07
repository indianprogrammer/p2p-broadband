"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { localizedPath } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Plans", href: "/plans" },
  { name: "TV & OTT", href: "/tv-ott" },
  { name: "Coverage", href: "/coverage" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

interface HeaderProps {
  locale: string;
}

export function Header({ locale = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={localizedPath(locale)} className="flex items-center gap-2" aria-label="P2P Broadband Home">
            <svg
              className="h-8 w-8 text-primary"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
              <path
                d="M16 8V24M8 16H24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight">P2P Broadband</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={localizedPath(locale, item.href)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === localizedPath(locale, item.href) || pathname.startsWith(`${localizedPath(locale, item.href)}/`)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                aria-current={pathname === localizedPath(locale, item.href) || pathname.startsWith(`${localizedPath(locale, item.href)}/`) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href={localizedPath(locale, "/apply")}>
              <Button size="lg" variant="apple" className="gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border/50 py-3" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const itemPath = localizedPath(locale, item.href);
                const isActive = pathname === itemPath || pathname.startsWith(`${itemPath}/`);

                return (
                  <Link
                    key={item.name}
                    href={itemPath}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-3 text-sm font-medium",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link href={localizedPath(locale, "/apply")} onClick={() => setMenuOpen(false)} className="mt-2">
                <Button className="w-full" variant="apple">Apply Now</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}