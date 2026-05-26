"use client";

import { motion } from 'framer-motion';

const stats = [
  { label: 'Colleges', value: '25+' },
  { label: 'Streams', value: '3' },
  { label: 'Cities', value: '17' },
  { label: 'Shortlist Sync', value: 'Local + DB' }
];

export function StatsSection() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/40 backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">{stat.value}</p>
        </motion.div>
      ))}
    </section>
  );
}
