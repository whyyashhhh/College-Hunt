"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/search-bar';
import { CollegeCard } from '@/components/college-card';
import { compactNumber, percentage, rupee } from '@/lib/format';
import type { CollegeCardData } from '@/lib/college-utils';

const reviews = [
  {
    name: 'Aarav Mehta',
    role: 'Engineering aspirant',
    quote: 'CollegeHunt feels like a premium travel app for admissions - fast, visual, and surprisingly easy to compare.',
    rating: '5.0'
  },
  {
    name: 'Sanya Kapoor',
    role: 'MBA applicant',
    quote: 'The shortlist flow is clean and the placement signals help me decide without tab overload.',
    rating: '4.9'
  },
  {
    name: 'Ritvik Jain',
    role: 'Medical entrance planner',
    quote: 'The redesign finally makes college discovery feel polished instead of data-heavy.',
    rating: '5.0'
  }
] as const;

const streamOptions = ['All', 'Engineering', 'Medical', 'MBA'] as const;
const typeOptions = ['All', 'Government', 'Private'] as const;

type LoadState = {
  colleges: CollegeCardData[];
  loading: boolean;
  error: string | null;
  notice: string | null;
};

export function HomeClient() {
  const [query, setQuery] = useState('');
  const [stream, setStream] = useState<(typeof streamOptions)[number]>('All');
  const [city, setCity] = useState('');
  const [type, setType] = useState<(typeof typeOptions)[number]>('All');
  const [maxFees, setMaxFees] = useState(5000000);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [{ colleges, loading, error, notice }, setLoadState] = useState<LoadState>({
    colleges: [],
    loading: true,
    error: null,
    notice: null
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 280);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    const loadColleges = async () => {
      setLoadState((current) => ({ ...current, loading: true, error: null }));

      const params = new URLSearchParams();
      if (debouncedQuery) params.set('search', debouncedQuery);
      if (stream !== 'All') params.set('stream', stream);
      if (city.trim()) params.set('city', city.trim());
      if (type !== 'All') params.set('type', type);

      try {
        const response = await fetch(`/api/colleges?${params.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Unable to fetch colleges');
        }

        const data = (await response.json()) as CollegeCardData[];
        setLoadState((current) => ({ ...current, colleges: data, loading: false }));
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setLoadState((current) => ({
          ...current,
          loading: false,
          error: loadError instanceof Error ? loadError.message : 'Something went wrong'
        }));
      }
    };

    void loadColleges();

    return () => controller.abort();
  }, [city, debouncedQuery, stream, type]);

  const stats = useMemo(() => {
    const averagePlacement = colleges.length
      ? colleges.reduce((sum, college) => sum + college.placementPct, 0) / colleges.length
      : 0;

    return [
      { label: 'Colleges', value: compactNumber(colleges.length) },
      { label: 'Avg placement', value: colleges.length ? `${averagePlacement.toFixed(1)}%` : '0%' },
      { label: 'Streams', value: '3' },
      { label: 'Cities covered', value: compactNumber(new Set(colleges.map((college) => college.city)).size) }
    ];
  }, [colleges]);

  const visibleColleges = useMemo(() => colleges.filter((college) => college.fees <= maxFees), [colleges, maxFees]);

  const featuredColleges = useMemo(() => visibleColleges.slice(0, 6), [visibleColleges]);

  const topPlacementColleges = useMemo(
    () => [...visibleColleges].sort((left, right) => right.placementPct - left.placementPct).slice(0, 4),
    [visibleColleges]
  );

  const streamCards = useMemo(
    () =>
      streamOptions
        .filter((option) => option !== 'All')
        .map((item) => {
          const matches = visibleColleges.filter((college) => college.stream === item);
          const topMatch = matches[0];

          return {
            name: item,
            count: matches.length,
            topMatch,
            averagePlacement: matches.length ? matches.reduce((sum, college) => sum + college.placementPct, 0) / matches.length : 0
          };
        }),
    [visibleColleges]
  );

  const heroStats = useMemo(
    () => [
      { label: 'Live colleges', value: compactNumber(visibleColleges.length) },
      { label: 'Avg placement', value: visibleColleges.length ? `${(visibleColleges.reduce((sum, college) => sum + college.placementPct, 0) / visibleColleges.length).toFixed(1)}%` : '0%' },
      { label: 'Budget cap', value: rupee(maxFees) }
    ],
    [maxFees, visibleColleges]
  );

  const scrollToResults = () => {
    if (typeof document === 'undefined') return;
    document.getElementById('featured-colleges')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-12 lg:space-y-16">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:px-10 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,122,247,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.14),transparent_24%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              Premium college discovery
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                Discover colleges with Airbnb-level polish.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
                Search, compare, and shortlist Indian colleges through a spacious, premium interface built for fast decisions and calmer browsing.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,122,247,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_24%)]" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Live shortlist</p>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-950">{visibleColleges.length} matching colleges</h2>
                </div>
                <div className="rounded-full border border-white bg-white px-3 py-2 text-xs font-semibold text-zinc-600 shadow-sm">
                  {stats[0].value} total
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white bg-white p-4 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Avg placement</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-950">{stats[1].value}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white bg-white p-4 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Cities covered</p>
                  <p className="mt-2 text-2xl font-semibold text-zinc-950">{stats[3].value}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-zinc-700">Use the search bar below to narrow results instantly.</p>
                <button type="button" onClick={scrollToResults} className="mt-4 inline-flex rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600">
                  Jump to featured colleges
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-8">
          <SearchBar
            query={query}
            city={city}
            stream={stream}
            type={type}
            maxFees={maxFees}
            onQueryChange={setQuery}
            onCityChange={setCity}
            onStreamChange={setStream}
            onTypeChange={setType}
            onMaxFeesChange={setMaxFees}
            onSearch={scrollToResults}
          />
        </div>
      </section>

      <section id="featured-colleges" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Featured colleges</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">Premium cards with clear decision signals.</h2>
          </div>
          <div className="text-sm text-zinc-500">
            Showing <span className="font-semibold text-zinc-900">{visibleColleges.length}</span> colleges under your budget cap.
          </div>
        </div>

        {notice ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-[520px] animate-pulse rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)]" />
            ))}
          </div>
        ) : featuredColleges.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {featuredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                onSaved={(message) => setLoadState((current) => ({ ...current, notice: message }))}
              />
            ))}
          </motion.div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center text-zinc-600 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-semibold text-zinc-950">No colleges matched your filters.</h2>
            <p className="mt-3 text-zinc-500">Try widening the city or stream filters, or adjust the budget cap.</p>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Trending streams</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">See which programs are pulling the strongest colleges.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {streamCards.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{item.name}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-zinc-950">{item.count} colleges</h3>
                </div>
                <div className="rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {item.averagePlacement ? `${item.averagePlacement.toFixed(1)}% avg` : 'No data'}
                </div>
              </div>
              <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-zinc-800">
                  {item.topMatch ? `${item.topMatch.name} leads this stream with ${percentage(item.topMatch.placementPct)} placement.` : 'No college matches this stream yet.'}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Top placement colleges</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">High-placement colleges, surfaced first.</h2>
          </div>
          <p className="text-sm text-zinc-500">Sorted by placement percentage</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {topPlacementColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <CollegeCard
                college={college}
                onSaved={(message) => setLoadState((current) => ({ ...current, notice: message }))}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Student reviews</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">The new experience should feel as easy as booking a stay.</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-zinc-950">{review.name}</p>
                  <p className="text-sm text-zinc-500">{review.role}</p>
                </div>
                <div className="rounded-full bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">{review.rating}</div>
              </div>
              <p className="mt-5 text-base leading-7 text-zinc-600">{review.quote}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
