"use client";

import { addCompareId, addShortlistId, getOrCreateUserId } from '@/lib/storage';
import { BookmarkPlus, GitCompareArrows, ArrowRight } from 'lucide-react';

type Props = {
  collegeId: string;
};

export function CollegeActions({ collegeId }: Props) {
  const shortlist = async () => {
    const userId = getOrCreateUserId();
    try {
      await fetch('/api/shortlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId, userId })
      });
    } catch {
      // Fallback to local storage when the API is unavailable.
    }

    addShortlistId(collegeId);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={shortlist}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        <BookmarkPlus className="h-4 w-4" />
        Add to Shortlist
      </button>
      <button
        type="button"
        onClick={() => addCompareId(collegeId)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
      >
        <GitCompareArrows className="h-4 w-4" />
        Add to Compare
      </button>
      <a
        href="/compare"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
      >
        <ArrowRight className="h-4 w-4" />
        Open Compare
      </a>
      <a
        href="/shortlist"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
      >
        <ArrowRight className="h-4 w-4" />
        Open Shortlist
      </a>
    </div>
  );
}
