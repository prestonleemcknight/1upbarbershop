import { useEffect, useRef, useState, type ElementType, type ReactNode, type Ref } from 'react';
import { bookHref, bookLinkProps } from '../data/business';
import { ArrowIcon } from './Icons';
import { Logo } from './Logo';

/* ── Buttons ────────────────────────────────────────────────────────────── */

const buttonBase =
  'inline-flex items-center justify-center gap-2 min-h-[48px] px-6 text-[0.95rem] font-bold uppercase tracking-[0.08em] rounded-[4px] transition-[background-color,color,transform,border-color] duration-200 active:translate-y-px';

export const buttonPrimary = `${buttonBase} bg-brand text-white hover:bg-brand-deep`;
export const buttonOnLight = `${buttonBase} bg-ink text-bone hover:bg-brand`;
export const buttonGhostDark = `${buttonBase} border border-hairline text-bone hover:border-brand-lift hover:text-brand-lift`;
export const buttonGhostLight = `${buttonBase} border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone`;

type BookProps = { children?: ReactNode; className?: string; label?: string; withArrow?: boolean };

/** The single primary conversion action. Falls back to click-to-call when no booking URL is set. */
export function BookButton({ children, className = buttonPrimary, label, withArrow = true }: BookProps) {
  return (
    <a href={bookHref} {...bookLinkProps} className={className} data-cta="book" aria-label={label}>
      {children}
      {withArrow && <ArrowIcon className="h-[18px] w-[18px]" />}
    </a>
  );
}

/* ── Section scaffolding ────────────────────────────────────────────────── */

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: 'dark' | 'light' | 'panel';
  as?: ElementType;
  /** Faint 1UP mark behind the content. Used on the inner pages. */
  watermark?: boolean;
};

const tones = {
  dark: 'bg-ink text-bone',
  panel: 'bg-ink-2 text-bone',
  light: 'bg-bone text-ink',
};

export function Section({
  id,
  children,
  className = '',
  tone = 'dark',
  as: Tag = 'section',
  watermark = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`${tones[tone]} ${watermark ? 'relative isolate overflow-hidden' : ''} ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {watermark && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <Logo className="w-[min(115vw,64rem)] max-w-none opacity-[0.045]" />
        </div>
      )}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28 xl:py-32">{children}</div>
    </Tag>
  );
}

type HeadingProps = { id: string; eyebrow?: string; title: ReactNode; lede?: ReactNode; tone?: 'dark' | 'light' };

export function SectionHeading({ id, eyebrow, title, lede, tone = 'dark' }: HeadingProps) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className={`eyebrow mb-4 ${tone === 'dark' ? 'text-brand-lift' : 'text-brand-deep'}`}>{eyebrow}</p>
      )}
      <h2 id={`${id}-heading`} className="display-xl text-[clamp(2rem,6vw,3.4rem)]">
        {title}
      </h2>
      {lede && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${tone === 'dark' ? 'text-muted' : 'text-muted-ink'}`}>
          {lede}
        </p>
      )}
    </header>
  );
}

/* ── "Needs real info" marker ───────────────────────────────────────────── */

/** Visible, honest flag for a business detail that has not been confirmed yet. */
export function NeedsInfo({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border border-dashed border-amber-400/60 bg-amber-400/10 px-2 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-amber-300 ${className}`}
    >
      <span aria-hidden>✎</span>
      {children}
    </span>
  );
}

/** Full-width banner explaining which real business detail a section is waiting on. */
export function EditorNote({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <p
      className={`mt-8 flex flex-col items-start gap-2 rounded-[4px] border border-dashed px-4 py-3 text-[0.88rem] leading-relaxed sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 ${
        dark ? 'border-amber-400/45 bg-amber-400/5 text-amber-200/90' : 'border-amber-600/45 bg-amber-500/8 text-amber-900'
      }`}
    >
      {dark ? <NeedsInfo>Editor note</NeedsInfo> : <NeedsInfoLight>Editor note</NeedsInfoLight>}
      <span className="min-w-0 sm:flex-1">{children}</span>
    </p>
  );
}

/** Inline code reference inside an editor note. */
export function Code({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <code
      className={`rounded px-1.5 py-0.5 text-[0.82rem] [overflow-wrap:anywhere] ${
        tone === 'dark' ? 'bg-ink-3 text-bone' : 'bg-ink/8 text-ink'
      }`}
    >
      {children}
    </code>
  );
}

export function NeedsInfoLight({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border border-dashed border-amber-600/60 bg-amber-500/12 px-2 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-amber-800 ${className}`}
    >
      <span aria-hidden>✎</span>
      {children}
    </span>
  );
}

/* ── Scroll reveal ──────────────────────────────────────────────────────── */

/**
 * Adds `.is-visible` once in view. Reduced-motion users see content immediately (CSS).
 * `as` keeps list semantics intact when revealing an `<li>`.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement & HTMLLIElement>}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
