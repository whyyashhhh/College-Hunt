"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookmarkPlus, GitCompareArrows, MapPin, Sparkles } from 'lucide-react';
import { addCompareId, addShortlistId, getOrCreateUserId } from '@/lib/storage';
import { compactNumber, percentage, rupee } from '@/lib/format';
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
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-shadow"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-sky-100 via-white to-amber-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,122,247,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.07),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.2))]" />
        <div className="absolute inset-4 rounded-[1.75rem] border border-white/80 bg-white/75 p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              {college.type}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleShortlist}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-zinc-600 shadow-sm transition hover:border-brand-200 hover:text-brand-600"
                aria-label={`Shortlist ${college.name}`}
              >
                <BookmarkPlus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleCompare}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-zinc-600 shadow-sm transition hover:border-brand-200 hover:text-brand-600"
                aria-label={`Compare ${college.name}`}
              >
                <GitCompareArrows className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid h-[calc(100%-3rem)] grid-cols-2 gap-3">
            <div className="flex flex-col justify-between rounded-[1.5rem] bg-zinc-900 px-4 py-4 text-white shadow-lg shadow-zinc-900/10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Featured campus</p>
                <h3 className="mt-3 text-xl font-semibold leading-tight">{college.name}</h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  <span>
                    {college.city}, {college.state}
                  </span>
                </div>
              </div>
              {college.nirfRank ? <p className="text-sm font-medium text-white/80">NIRF #{college.nirfRank}</p> : <p className="text-sm font-medium text-white/80">Ranked college</p>}
            </div>

            <div className="grid gap-3">
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Placement</p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">{percentage(college.placementPct)}</p>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Avg package</p>
                <p className="mt-2 text-lg font-semibold text-zinc-900">{rupee(college.avgPackage)}</p>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-brand-50 p-3 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.18em] text-brand-700">Fees</p>
                <p className="mt-2 text-lg font-semibold text-brand-900">{rupee(college.fees)}</p>
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
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            View details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {college.nirfRank ? (
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              NIRF #{college.nirfRank}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function Stat({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <p className={`mt-1 font-semibold text-zinc-900 ${compact ? 'text-sm' : 'text-base'}`}>{value}</p>
    </div>
  );
}
