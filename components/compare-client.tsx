"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { ArrowLeft, ArrowRightLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { getCompareIds } from '@/lib/storage';
import { compareFields } from '@/lib/college-utils';
import { compactNumber, percentage, rupee } from '@/lib/format';
import type { CollegeCardData } from '@/lib/college-utils';

export function CompareClient() {
  const [ids, setIds] = useState<string[]>([]);
  const [colleges, setColleges] = useState<CollegeCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  useEffect(() => {
    setIds(getCompareIds());
  }, []);

  useEffect(() => {
    const load = async () => {
      if (ids.length === 0) {
        setColleges([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const params = new URLSearchParams({ ids: ids.join(',') });
      const response = await fetch(`/api/colleges?${params.toString()}`);
      const data = (await response.json()) as CollegeCardData[];
      setColleges(data);
      setLoading(false);
    };

    void load();
  }, [ids]);

  const bestValues = useMemo(() => {
    return compareFields.reduce<Record<string, number[]>>((accumulator, field) => {
      const values = colleges.map((college) => college[field.key]).filter((value): value is number => typeof value === 'number');
      if (values.length === 0) return accumulator;

      const target = field.better === 'higher' ? Math.max(...values) : Math.min(...values);
      accumulator[field.key] = colleges
        .map((college, index) => (college[field.key] === target ? index : -1))
        .filter((index) => index !== -1);
      return accumulator;
    }, {});
  }, [colleges]);

  const radarData = useMemo(
    () =>
      colleges.map((college) => ({
        college: college.name.length > 12 ? `${college.name.slice(0, 12)}...` : college.name,
        placement: college.placementPct,
        package: college.avgPackage / 100000,
        feeScore: Math.max(5, 120 - college.fees / 50000),
        rankScore: college.nirfRank ? Math.max(5, 100 - college.nirfRank) : 55
      })),
    [colleges]
  );

  const metricTrend = useMemo(
    () =>
      colleges.map((college) => ({
        name: college.name.length > 14 ? `${college.name.slice(0, 14)}...` : college.name,
        placement: college.placementPct,
        package: college.avgPackage / 100000
      })),
    [colleges]
  );

  const clearAll = () => {
    setIds([]);
    setColleges([]);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('collegehunt-compare', JSON.stringify([]));
    }
  };

  if (loading) {
    return <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-zinc-600 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">Loading comparison data...</div>;
  }

  if (colleges.length < 2) {
    return (
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-950">Add at least 2 colleges to compare.</h2>
          <p className="text-zinc-600">Use the compare button on the home page cards to build a list of 2 to 4 colleges.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
            <ArrowLeft className="h-4 w-4" />
            Go to Home
          </Link>
          {ids.length > 0 ? (
            <button type="button" onClick={clearAll} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700">
              Clear compare list
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Comparison dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Compare Colleges</h1>
          <p className="mt-2 text-zinc-600">Best values are highlighted automatically across the selected colleges.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDifferencesOnly((current) => !current)}
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            {differencesOnly ? 'Show all metrics' : 'Differences only'}
          </button>
          <button type="button" onClick={clearAll} className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
            Clear list
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
              <thead>
                <tr className="text-zinc-500">
                  <th className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold">Metric</th>
                  {colleges.map((college) => (
                    <th key={college.id} className="px-4 py-3 font-semibold">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                        <p className="text-zinc-950">{college.name}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {college.city}, {college.state}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareFields
                  .filter((field) => !differencesOnly || field.key !== 'nirfRank' || new Set(colleges.map((college) => college.nirfRank)).size > 1)
                  .map((field) => (
                    <tr key={field.key}>
                      <td className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-zinc-700">{field.label}</td>
                      {colleges.map((college, index) => {
                        const isBest = bestValues[field.key]?.includes(index) ?? false;
                        const value = college[field.key];
                        const formatted =
                          field.key === 'fees'
                            ? rupee(value as number)
                            : field.key === 'avgPackage'
                              ? rupee(value as number)
                              : field.key === 'placementPct'
                                ? percentage(value as number)
                                : value
                                  ? `#${value}`
                                  : 'N/A';

                        return (
                          <td key={college.id} className="px-4 py-3 align-top">
                            <div
                              className={`rounded-2xl border px-4 py-3 ${
                                isBest ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-slate-200 bg-slate-50 text-zinc-700'
                              }`}
                            >
                              <p className="font-semibold">{formatted}</p>
                              {isBest ? <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em]">Best value</p> : null}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-zinc-700">Type</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="px-4 py-3 text-zinc-600">
                      {college.type}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-zinc-700">Stream</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="px-4 py-3 text-zinc-600">
                      {college.stream}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {metricTrend.length > 0 ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Placement trend</p>
                <div className="mt-3 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metricTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
                      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 16, color: '#0f172a' }} />
                      <Bar dataKey="placement" fill="#2563eb" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : null}
            {radarData.length > 0 ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Radar overview</p>
                <div className="mt-3 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData[0] ? Object.entries(radarData[0]).filter(([key]) => key !== 'college').map(([key, value]) => ({ metric: key, value })) : []}>
                      <PolarGrid stroke="rgba(15,23,42,0.08)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
                      <Radar dataKey="value" stroke="#2563eb" fill="#60a5fa" fillOpacity={0.28} />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 16, color: '#0f172a' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-6">
          <div className="flex items-center gap-2 text-brand-700">
            <Sparkles className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.24em]">Insights</p>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-950">{college.name}</h3>
                  <p className="text-sm text-zinc-500">{college.city}, {college.state}</p>
                </div>
                <div className="rounded-2xl border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">
                  {percentage(college.placementPct)}
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-zinc-600">
                <div className="flex items-center justify-between"><span>Fees</span><span>{rupee(college.fees)}</span></div>
                <div className="flex items-center justify-between"><span>Avg package</span><span>{rupee(college.avgPackage)}</span></div>
                <div className="flex items-center justify-between"><span>NIRF</span><span>{college.nirfRank ? `#${college.nirfRank}` : 'N/A'}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
