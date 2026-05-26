import Link from 'next/link';
import { cn } from '@/lib/cn';

type BrandLogoProps = {
  variant?: 'full' | 'icon' | 'horizontal' | 'monogram';
  theme?: 'dark' | 'light';
  className?: string;
  href?: string;
  showTagline?: boolean;
};

export function BrandLogo({ variant = 'full', theme = 'light', className, href = '/', showTagline = false }: BrandLogoProps) {
  const isLight = theme === 'light';
  const wrapper = cn('inline-flex items-center gap-3', variant === 'icon' && 'gap-0', className);
  const textColor = isLight ? 'text-zinc-900' : 'text-white';
  const taglineColor = isLight ? 'text-zinc-500' : 'text-zinc-400';
  const badge = isLight ? 'border-zinc-200 bg-white shadow-sm' : 'border-white/10 bg-white/5';

  const mark = (
    <span
      className={cn(
        'relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border',
        badge,
        'shadow-[0_0_30px_rgba(34,211,238,0.18)]'
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.9),rgba(59,130,246,0.75),rgba(139,92,246,0.92))]" />
      <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35),transparent_35%)] opacity-70" />
      <svg viewBox="0 0 48 48" className="relative h-7 w-7 drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8.5c8.56 0 15.5 6.94 15.5 15.5S32.56 39.5 24 39.5 8.5 32.56 8.5 24 15.44 8.5 24 8.5Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" opacity="0.55" />
        <path d="M24 13.5 16 24l8 10.5 8-10.5-8-10.5Z" fill="rgba(255,255,255,0.92)" fillOpacity="0.9" />
        <path d="M24 11v26" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13.7 31.2 24 11.5l10.3 19.7" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const wordmark = (
    <div className={variant === 'icon' ? 'sr-only' : 'flex flex-col leading-none'}>
      <span className={cn('font-semibold tracking-tight', textColor, variant === 'monogram' ? 'text-xl' : 'text-base')}>
        CollegeHunt
      </span>
      {showTagline ? <span className={cn('text-xs', taglineColor)}>Discover. Compare. Shortlist.</span> : null}
    </div>
  );

  if (variant === 'horizontal') {
    return (
      <Link href={href} className={wrapper}>
        {mark}
        <div className="flex items-center gap-3">
          <span className={cn('h-px w-8', isLight ? 'bg-zinc-300' : 'bg-white/15')} />
          {wordmark}
        </div>
      </Link>
    );
  }

  if (variant === 'monogram') {
    return (
      <Link href={href} className={wrapper} aria-label="CollegeHunt">
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-[1.15rem] border text-sm font-semibold tracking-[0.2em]',
            isLight ? 'border-zinc-200 bg-white text-zinc-900' : 'border-white/10 bg-white/5 text-white'
          )}
        >
          CH
        </span>
      </Link>
    );
  }

  if (variant === 'icon') {
    return (
      <Link href={href} className={wrapper} aria-label="CollegeHunt">
        {mark}
      </Link>
    );
  }

  return (
    <Link href={href} className={wrapper}>
      {mark}
      {wordmark}
    </Link>
  );
}
