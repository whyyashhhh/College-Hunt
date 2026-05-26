import Link from 'next/link';
import { BrandLogo } from '@/components/brand-logo';

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="space-y-5">
            <BrandLogo variant="horizontal" showTagline theme="light" />
            <p className="max-w-2xl text-sm leading-6 text-zinc-600">
              A premium college discovery experience built to help students compare placements, fees, rankings, and admissions across India with clarity.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Search', value: 'Fast, live filters' },
                { label: 'Compare', value: 'Side-by-side decisions' },
                { label: 'Shortlist', value: 'Saved across devices' }
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-zinc-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-600">
                <Link href="/" className="transition hover:text-zinc-900">Home</Link>
                <Link href="/compare" className="transition hover:text-zinc-900">Compare</Link>
                <Link href="/shortlist" className="transition hover:text-zinc-900">Shortlist</Link>
                <Link href="/brand" className="transition hover:text-zinc-900">Brand</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Product</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-600">
                <span>Premium UI</span>
                <span>Framer Motion</span>
                <span>Next.js 14</span>
                <span>Prisma + PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
