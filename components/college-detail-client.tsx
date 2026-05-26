"use client";

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { BookOpen, Compass, GraduationCap, IndianRupee, Landmark, ShieldCheck, Sparkles } from 'lucide-react';
import { CollegeActions } from '@/components/college-actions';
import { CollegeBadges } from '@/components/college-badges';
import { compactNumber, percentage, rupee } from '@/lib/format';
import type { CollegeCardData } from '@/lib/college-utils';

type CollegeWithCourses = CollegeCardData & {
  courses: Array<{ id: string; name: string; duration: string; fees: number }>;
};

type Props = {
  college: CollegeWithCourses;
};

const tabItems = ['Overview', 'Placements', 'Fees', 'Courses', 'Admissions'] as const;

export function CollegeDetailClient({ college }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof tabItems)[number]>('Overview');

  const placementData = useMemo(
    () => [
      { label: 'Placement %', value: college.placementPct },
      { label: 'Avg package', value: college.avgPackage / 100000 },
      { label: 'Fees', value: Math.max(5, 120 - college.fees / 50000) },
      { label: 'Rank', value: college.nirfRank ? Math.max(5, 100 - college.nirfRank) : 55 }
    ],
    [college]
  );

  const barData = useMemo(
    () =>
      college.courses.map((course) => ({
        name: course.name.length > 18 ? `${course.name.slice(0, 18)}...` : course.name,
        fees: course.fees / 1000
      })),
    [college.courses]
  );

  const admissionScore = Math.min(100, Math.round(college.placementPct * 0.72 + (college.nirfRank ? 100 - college.nirfRank : 55) * 0.18));

  return (
    <div className="space-y-8 text-zinc-900">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="grid min-h-[420px] grid-cols-2 gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <div className="col-span-2 rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,rgba(47,122,247,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.18),transparent_26%),linear-gradient(135deg,#eef5ff,#fff)] p-5 text-zinc-900">
                <div className="flex items-center justify-between gap-3">
                  <CollegeBadges stream={college.stream} type={college.type} />
                  <div className="rounded-full border border-white/70 bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 shadow-sm">
                    {college.nirfRank ? `#${college.nirfRank}` : 'Ranked'}
                  </div>
                </div>
                <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-zinc-500">Campus preview</p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">{college.name}</h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                      {college.city}, {college.state}. A modern property-page style view for fees, placements, courses, and admissions.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Placement</p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-950">{percentage(college.placementPct)}</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Avg package</p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-950">{rupee(college.avgPackage)}</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Fees</p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-950">{rupee(college.fees)}</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Courses</p>
                      <p className="mt-2 text-2xl font-semibold text-zinc-950">{compactNumber(college.courses.length)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {[
                { title: 'Placements', value: percentage(college.placementPct), tone: 'from-brand-50 to-white' },
                { title: 'Fees', value: rupee(college.fees), tone: 'from-amber-50 to-white' },
                { title: 'Rank', value: college.nirfRank ? `#${college.nirfRank}` : 'N/A', tone: 'from-sky-50 to-white' },
                { title: 'Admission score', value: `${admissionScore}%`, tone: 'from-emerald-50 to-white' }
              ].map((item) => (
                <div key={item.title} className={`rounded-[1.5rem] border border-slate-200 bg-gradient-to-br ${item.tone} p-4 shadow-sm`}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.title}</p>
                  <p className="mt-3 text-2xl font-semibold text-zinc-950">{item.value}</p>
                </div>
              ))}
            </div>

            <aside className="space-y-4 xl:sticky xl:top-28">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">Quick actions</p>
                <div className="mt-5">
                  <CollegeActions collegeId={college.id} />
                </div>
              </motion.div>

              <div className="grid gap-4">
                <MetricCard label="Annual fees" value={rupee(college.fees)} description="Approximate tuition and academic cost" icon={IndianRupee} />
                <MetricCard label="Placement rate" value={percentage(college.placementPct)} description="Latest known placement signal" icon={GraduationCap} />
                <MetricCard label="Courses" value={compactNumber(college.courses.length)} description="Programs fetched from the relation table" icon={BookOpen} />
                <MetricCard label="Admission score" value={`${admissionScore}%`} description="A simple decision support indicator" icon={ShieldCheck} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof tabItems)[number])}>
            <TabsList className="mb-6 inline-flex flex-wrap rounded-full border border-slate-200 bg-slate-50 p-1">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item}
                  value={item}
                  className="rounded-full px-4 py-2 text-sm font-medium text-zinc-500 transition data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="Overview" className="space-y-4 outline-none">
              <div className="grid gap-4 sm:grid-cols-3">
                <MiniStat label="College type" value={college.type} />
                <MiniStat label="Stream" value={college.stream} />
                <MiniStat label="Location" value={`${college.city}, ${college.state}`} />
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Overview</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                  Use shortlist and compare actions to build a focused application plan with fee and placement context.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="Placements" className="space-y-4 outline-none">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="h-[320px] rounded-[1.5rem] border border-slate-200 bg-white p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={placementData}>
                      <PolarGrid stroke="rgba(15,23,42,0.08)" />
                      <PolarAngleAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Radar dataKey="value" stroke="#2563eb" fill="#60a5fa" fillOpacity={0.3} />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 16, color: '#0f172a' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Placement chance', value: percentage(college.placementPct) },
                    { label: 'Average package', value: rupee(college.avgPackage) },
                    { label: 'Admission score', value: `${admissionScore}%` },
                    { label: 'NIRF rank', value: college.nirfRank ? `#${college.nirfRank}` : 'N/A' }
                  ].map((item) => (
                    <div key={item.label} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-zinc-950">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Fees" className="space-y-4 outline-none">
              <div className="h-[320px] rounded-[1.5rem] border border-slate-200 bg-white p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,23,42,0.08)" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 16, color: '#0f172a' }} />
                    <Bar dataKey="fees" fill="url(#feesGradient)" radius={[12, 12, 0, 0]} />
                    <defs>
                      <linearGradient id="feesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="Courses" className="space-y-4 outline-none">
              <div className="grid gap-4 md:grid-cols-2">
                {college.courses.map((course) => (
                  <motion.article
                    key={course.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Course</p>
                    <h3 className="mt-3 text-lg font-semibold text-zinc-950">{course.name}</h3>
                    <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
                      <span>{course.duration}</span>
                      <span>{rupee(course.fees)}</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Admissions" className="space-y-4 outline-none">
              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Admission predictor</p>
                  <p className="mt-3 text-3xl font-semibold text-zinc-950">{admissionScore}%</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-sky-500" style={{ width: `${admissionScore}%` }} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    High placement quality and ranking signals make this college a strong shortlist candidate.
                  </p>
                </div>
                <div className="grid gap-3">
                  {[
                    'Check eligibility by stream and entrance score.',
                    'Review placement and package signals for fit.',
                    'Use compare and shortlist to build a final application list.',
                    'Open the chart tabs for a deeper decision review.'
                  ].map((item) => (
                    <div key={item} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-7 text-zinc-600 shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center gap-2 text-brand-700">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.24em]">Admission snapshot</p>
            </div>
            <div className="mt-5 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-zinc-600">
                  <span>Admission chance</span>
                  <span className="font-semibold text-zinc-950">{admissionScore}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-sky-500" style={{ width: `${admissionScore}%` }} />
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-zinc-600">
                This profile balances placement strength, fees, and ranking signal well enough to justify a shortlist slot.
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {[
              { label: 'Fees', value: rupee(college.fees) },
              { label: 'Placement', value: percentage(college.placementPct) },
              { label: 'Avg package', value: rupee(college.avgPackage) },
              { label: 'NIRF', value: college.nirfRank ? `#${college.nirfRank}` : 'N/A' }
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-zinc-950">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ icon: Icon, label, value }: { icon: typeof Compass; label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm">
      <Icon className="h-4 w-4 text-brand-600" />
      <span className="text-zinc-500">{label}</span>
      <span className="font-semibold text-zinc-950">{value}</span>
    </div>
  );
}

function MetricCard({ label, value, description, icon: Icon }: { label: string; value: string; description: string; icon: typeof Compass }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-zinc-950">{value}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-brand-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-500">{description}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-zinc-950">{value}</p>
    </div>
  );
}
