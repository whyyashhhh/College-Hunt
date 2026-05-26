import type { ReactNode } from 'react';
import { BrandLogo } from '@/components/brand-logo';

const palette = [
  { label: 'Background', value: '#ffffff' },
  { label: 'Surface', value: '#f8fafc' },
  { label: 'Cyan', value: '#06b6d4' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Violet', value: '#8b5cf6' },
  { label: 'Text', value: '#0f172a' }
];

const useCases = [
  'Navbar wordmark',
  'App icon / favicon',
  'Hero logo lockup',
  'Sidebar monogram',
  'Light mode inverse',
  'Dark mode primary'
];

export function BrandKit() {
  return (
    <div className="space-y-8 text-zinc-900">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/40 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-600">Brand identity</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">CollegeHunt visual system</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base">
          A modern college platform identity built around a compass-like mark, clean surfaces, and subtle color accents.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-zinc-900">Logo system</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <BrandTile label="Main logo">
              <BrandLogo showTagline theme="light" />
            </BrandTile>
            <BrandTile label="Horizontal">
              <BrandLogo variant="horizontal" showTagline theme="light" />
            </BrandTile>
            <BrandTile label="Icon only">
              <BrandLogo variant="icon" theme="light" />
            </BrandTile>
            <BrandTile label="Monogram">
              <BrandLogo variant="monogram" theme="light" />
            </BrandTile>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 backdrop-blur-xl">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Guidelines</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
              <li>Use the icon-only mark for favicon, app icon, and compact UI surfaces.</li>
              <li>Use the full logo lockup in navbar, onboarding, and marketing headers.</li>
              <li>Keep logo uses on white or soft neutral surfaces with restrained accent color.</li>
              <li>Prefer ample spacing and soft shadow instead of hard outlines or cluttered strokes.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.24em] text-zinc-500">Use cases</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {useCases.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-zinc-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-zinc-900">Palette</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {palette.map((color) => (
              <div key={color.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-2xl border border-white/10" style={{ background: color.value }} />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{color.label}</p>
                    <p className="text-xs text-zinc-400">{color.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-zinc-900">Typography</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Primary</p>
              <p className="mt-2 text-3xl font-semibold text-zinc-900">Inter</p>
              <p className="mt-1 text-sm text-zinc-400">UI, content, and dashboard text.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Display</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Space Grotesk</p>
              <p className="mt-1 text-sm text-zinc-400">Headings and premium editorial style moments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BrandTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <div className="mt-5 flex min-h-[96px] items-center justify-center">{children}</div>
    </div>
  );
}
