"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, CircleUserRound, Menu, Search, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandLogo } from '@/components/brand-logo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/compare', label: 'Compare' },
  { href: '/shortlist', label: 'Shortlist' },
  { href: '/brand', label: 'Brand' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo href="/" showTagline theme="light" />

        <div className="hidden justify-center lg:flex">
          <Link
            href="/#explore"
            className="group flex w-full max-w-2xl items-center gap-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition hover:border-slate-300 hover:bg-white hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-orange-400 to-amber-300 text-zinc-950 transition group-hover:scale-105">
              <Search className="h-4 w-4" />
            </span>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 text-sm">
              <span className="truncate font-medium text-zinc-700">Search colleges, compare placements, shortlist faster</span>
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-zinc-600 shadow-sm md:inline-flex">
                Premium discovery
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 text-sm xl:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-900">
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-slate-300 hover:text-zinc-900"
          >
            <CircleUserRound className="h-4 w-4" />
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-zinc-700 shadow-sm transition hover:border-slate-300 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-200 bg-white px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:hidden"
          >
            <div className="mx-auto flex max-w-[1440px] flex-col gap-3">
              <Link
                href="/#explore"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-zinc-700"
              >
                <Search className="h-4 w-4 text-amber-500" />
                Search colleges and filters
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-zinc-700"
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link href="/compare" onClick={() => setOpen(false)} className="rounded-2xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white">
                  Compare
                </Link>
                <Link href="/shortlist" onClick={() => setOpen(false)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-700">
                  Shortlist
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
