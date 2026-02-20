"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/cars-for-sale", label: "Cars for Sale" },
  { href: "/hire", label: "Car Hire" },
  { href: "/sell", label: "Sell Your Car" },
  { href: "/lease", label: "Lease to SYM" },
  { href: "/about-contact", label: "About / Contact" },
  { href: "/admin/login", label: "Admin" },
];

export function SiteHeader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Stable SSR output: always use light logo until mounted
  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoSrc}
            alt="SYM Motors logo"
            width={160}
            height={48}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden gap-5 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}