"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/40 backdrop-blur-xl md:p-10 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
            Premium college discovery
          </span>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              Find Your Dream College Smarter.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Compare placements, fees, rankings, and admissions across India&apos;s top universities in a premium,
              frictionless product experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#explore"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-zinc-800"
            >
              Explore Colleges
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-sky-300 hover:bg-sky-50"
            >
              Compare Now
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px]">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 top-10 w-[78%] rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/40 backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Placement Pulse</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-zinc-700">
              <Stat title="Top" value="25" />
              <Stat title="Avg" value="90.9%" />
              <Stat title="Cities" value="17" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-0 top-28 w-[68%] rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/40 backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Smart compare</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-700">
              <Row label="Avg package" value="₹12.4L" />
              <Row label="Fees" value="₹2.6L" />
              <Row label="NIRF" value="#2" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-zinc-900">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-zinc-500">{label}</span>
      <span className="font-semibold text-zinc-900">{value}</span>
    </div>
  );
}
