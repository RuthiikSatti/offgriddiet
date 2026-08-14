"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overHero;
  const text = solid ? "text-forest" : "text-cream";

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", solid ? "border-b border-forest/15 bg-cream/85 backdrop-blur-md" : "bg-transparent")}>
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className={cn("flex h-9 w-9 items-center justify-center border", solid ? "border-forest/40 text-forest" : "border-cream/50 text-cream")}><Sprout className="h-5 w-5" /></span>
          <span className={cn("font-heading text-[15px] font-extrabold uppercase leading-[0.95] tracking-tight", text)}>Off Grid<br />Diet</span>
        </Link>
        <div className={cn("hidden items-center gap-6 font-mono text-[11px] uppercase tracking-widest 2xl:flex", solid ? "text-forest/60" : "text-cream/70")}><span>V0.1 — Grow-Tech</span><span>Season 2026</span><span>Est. 2026</span></div>
        <div className="flex items-center gap-4">
          <ul className={cn("hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.1em] xl:flex", solid ? "text-forest/70" : "text-cream/75")}>
            {siteConfig.nav.slice(1).map((item) => <li key={item.href}><Link href={item.href} className="transition-opacity hover:opacity-100 hover:underline">{item.label}</Link></li>)}
          </ul>
          <Link href="/#waitlist" className="hidden font-mono text-[11px] font-bold uppercase tracking-widest text-sun transition-colors hover:text-sprout sm:inline-flex">[ Join ]</Link>
          <button type="button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)} className={cn("inline-flex h-10 w-10 items-center justify-center border xl:hidden", solid ? "border-forest/30 text-forest" : "border-cream/40 text-cream")}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {open && <div className="border-t border-forest/15 bg-cream xl:hidden"><ul className="container-page flex flex-col py-3 font-mono text-sm uppercase tracking-widest">{siteConfig.nav.map((item) => <li key={item.href}><Link href={item.href} className="block px-2 py-3 text-forest/80 hover:text-forest">{item.label}</Link></li>)}<li className="mt-1 px-2"><Link href="/#waitlist" className="block py-2 font-bold text-sun">[ Join the Harvest ]</Link></li></ul></div>}
    </header>
  );
}
