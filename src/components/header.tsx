"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Icon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border-peach-200/70 bg-cream-50/80 shadow-[0_10px_40px_-20px_rgba(198,58,23,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="PeachTech home" onClick={() => setOpen(false)}>
          <Image src="/brand/logo-label.png" alt="PeachTech LLC" width={151} height={49} priority className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-peach-700" : "text-ink-soft hover:text-peach-600"
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-peach-200/60"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/careers#apply"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-peach-600 sm:inline-flex"
          >
            Join our team
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-peach-200/50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} width={22} height={22} />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-peach-200/70 bg-cream-50/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                  isActive(item.href) ? "bg-peach-200/60 text-peach-700" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/careers#apply"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-2xl bg-ink px-4 py-3 text-center font-semibold text-cream-50"
            >
              Join our team
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
