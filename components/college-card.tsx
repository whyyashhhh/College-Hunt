"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookmarkPlus, GitCompareArrows, MapPin, Sparkles } from 'lucide-react';
import { addCompareId, addShortlistId, getOrCreateUserId } from '@/lib/storage';
import { percentage, rupee } from '@/lib/format';
import type { CollegeCardData } from '@/lib/college-utils';

type Props = {
  college: CollegeCardData;
  onSaved?: (message: string) => void;
};

export function CollegeCard({ college, onSaved }: Props) {
  const handleShortlist = async () => {
    const userId = getOrCreateUserId();
    try {
      const response = await fetch('/api/shortlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId: college.id, userId })
      });

      if (!response.ok) {
        throw new Error('Failed to save shortlist');
      }

      addShortlistId(college.id);
      onSaved?.(`${college.name} added to shortlist`);
    } catch {
      addShortlistId(college.id);
      onSaved?.(`${college.name} saved locally`);
    }
  };

  const handleCompare = () => {
    addCompareId(college.id);
    onSaved?.(`${college.name} added to compare`);
  };

  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-shadow backdrop-blur-xl"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.1),transparent_24%)]" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {college.type}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleShortlist}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-zinc-600 shadow-sm transition hover:border-slate-300 hover:text-zinc-900"
                aria-label={`Shortlist ${college.name}`}
              >
                <BookmarkPlus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleCompare}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-zinc-600 shadow-sm transition hover:border-slate-300 hover:text-zinc-900"
                aria-label={`Compare ${college.name}`}
              >
                <GitCompareArrows className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Featured college</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-zinc-900">{college.name}</h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  <span className="truncate">
                    {college.city}, {college.state}
                  </span>
                </div>
              </div>
              {college.nirfRank ? (
                <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right text-zinc-900 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">NIRF</p>
                  <p className="text-lg font-semibold">#{college.nirfRank}</p>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Placement</p>
                <p className="mt-2 text-sm font-semibold leading-tight text-zinc-900 sm:text-base">{percentage(college.placementPct)}</p>
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Avg package</p>
                <p className="mt-2 text-sm font-semibold leading-tight text-zinc-900 sm:text-base">{rupee(college.avgPackage)}</p>
              </div>
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Fees</p>
                <p className="mt-2 text-sm font-semibold leading-tight text-zinc-900 sm:text-base">{rupee(college.fees)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Stat label="Fees" value={rupee(college.fees)} />
          <Stat label="Avg package" value={rupee(college.avgPackage)} compact />
          <Stat label="Placement" value={percentage(college.placementPct)} />
          <Stat label="Stream" value={college.stream} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Link
            href={`/college/${college.id}`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold leading-none whitespace-nowrap text-white transition hover:bg-zinc-800 sm:w-auto"
          >
            View details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {college.nirfRank ? <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 sm:inline-flex">NIRF #{college.nirfRank}</div> : null}
        </div>
      </div>
    </motion.article>
  );
}

function Stat({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <p className={`mt-1 font-semibold leading-tight text-zinc-900 ${compact ? 'text-[12px] sm:text-sm' : 'text-[13px] sm:text-sm'}`}>{value}</p>
    </div>
  );
}
