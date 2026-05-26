"use client";

import type { ChangeEvent } from 'react';
import { IndianRupee, Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export type FilterOption = 'All' | 'Engineering' | 'Medical' | 'MBA' | 'Government' | 'Private';

type Props = {
  query: string;
  city: string;
  stream: 'All' | 'Engineering' | 'Medical' | 'MBA';
  type: 'All' | 'Government' | 'Private';
  maxFees: number;
  onQueryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStreamChange: (value: 'All' | 'Engineering' | 'Medical' | 'MBA') => void;
  onTypeChange: (value: 'All' | 'Government' | 'Private') => void;
  onMaxFeesChange: (value: number) => void;
  onSearch: () => void;
};

const streams = ['All', 'Engineering', 'Medical', 'MBA'] as const;
const types = ['All', 'Government', 'Private'] as const;

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${Math.round(value / 100000)}L`;
  }

  return `₹${value.toLocaleString('en-IN')}`;
};

export function SearchBar({
  query,
  city,
  stream,
  type,
  maxFees,
  onQueryChange,
  onCityChange,
  onStreamChange,
  onTypeChange,
  onMaxFeesChange,
  onSearch
}: Props) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-5">
      <div className="grid gap-3 xl:grid-cols-[1.4fr_0.95fr_0.75fr_0.75fr_0.9fr_auto]">
        <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-zinc-900 transition focus-within:border-slate-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-rose-100">
          <Search className="h-4 w-4 text-rose-400" />
          <input
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value)}
            placeholder="Search by college name"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </label>

        <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-zinc-900 transition focus-within:border-slate-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100">
          <SlidersHorizontal className="h-4 w-4 text-sky-500" />
          <input
            value={city}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onCityChange(event.target.value)}
            placeholder="City"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />
        </label>

        <Select value={stream} onChange={(event) => onStreamChange(event.target.value as typeof stream)} options={streams} />
        <Select value={type} onChange={(event) => onTypeChange(event.target.value as typeof type)} options={types} />

        <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-zinc-900 transition focus-within:border-slate-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-100">
          <IndianRupee className="h-4 w-4 text-amber-500" />
          <div className="w-full">
            <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
              <span>Max fees</span>
              <span className="font-semibold text-zinc-900">{formatCurrency(maxFees)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={5000000}
              step={50000}
              value={maxFees}
              onChange={(event) => onMaxFeesChange(Number(event.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-rose-500"
            />
          </div>
        </label>

        <motion.button
          type="button"
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearch}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition hover:scale-[1.01] hover:bg-zinc-800"
        >
          <Search className="h-4 w-4" />
          Explore
        </motion.button>
      </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-500">
        <span>Filters update instantly as you type.</span>
        <span>Budget cap set to {formatCurrency(maxFees)}.</span>
      </div>
    </section>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; options: readonly string[] }) {
  return (
      <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-zinc-900 transition focus-within:border-slate-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-100">
        <select value={value} onChange={onChange} className="w-full bg-transparent text-sm outline-none text-zinc-900">
        {options.map((option) => (
            <option key={option} className="bg-white text-zinc-900">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
