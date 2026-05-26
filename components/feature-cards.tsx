"use client";

import { motion } from 'framer-motion';
import { Bot, GitCompareArrows, LineChart, BookmarkCheck } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Recommendations',
    description: 'Surface the strongest colleges for your stream, budget, and placement goals.'
  },
  {
    icon: GitCompareArrows,
    title: 'College Comparison',
    description: 'Compare fees, packages, and rankings with a premium dashboard-style UI.'
  },
  {
    icon: LineChart,
    title: 'Placement Insights',
    description: 'Visualize outcomes with charts, rank badges, and sharper decision signals.'
  },
  {
    icon: BookmarkCheck,
    title: 'Smart Shortlisting',
    description: 'Keep your shortlist synced and accessible across the browsing flow.'
  }
];

export function FeatureCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature, index) => (
        <motion.article
          key={feature.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/40 backdrop-blur-xl"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-600 transition group-hover:scale-110">
            <feature.icon className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-zinc-900">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{feature.description}</p>
        </motion.article>
      ))}
    </section>
  );
}
