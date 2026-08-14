"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Sprout } from "@/components/graphics/Botanical";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-sm font-heading text-base font-semibold tracking-tight text-ink"
        >
          <Sprout
            className="h-5 w-4 shrink-0 text-leaf transition-colors group-hover:text-ochre-deep"
            strokeWidth={1.5}
          />
          Off Grid Diet
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-7 text-sm md:flex">
            {siteConfig.nav.slice(1).map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-sm border-b pb-0.5 transition-colors",
                      active
                        ? "border-ink text-ink"
                        : "border-transparent text-bark hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/#follow"
            className="hidden rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-leaf sm:inline-flex"
          >
            {siteConfig.followCta}
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <ul className="container-page flex flex-col py-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-sm py-3 font-heading text-lg font-medium text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm text-bark">
              {siteConfig.secondaryNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </li>
            <li className="py-4">
              <Link
                href="/#follow"
                className="block rounded-md bg-ink py-3 text-center font-medium text-paper"
              >
                {siteConfig.followCta}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
