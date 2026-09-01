import { useCallback, useEffect, useRef, useState } from 'react';
import { business, gallery, galleryCategories, type GalleryItem } from '../data/business';
import { Code, EditorNote, Section, SectionHeading, buttonGhostDark } from './ui';
import { CloseIcon, InstagramIcon } from './Icons';
import { asset } from '../lib/asset';
import { ChairPicker } from './ChairPicker';

type Filter = 'All' | (typeof galleryCategories)[number];
const filters: Filter[] = ['All', ...galleryCategories];

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
      if (e.key === 'Tab') {
        // Trap focus inside the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink/97 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${items.length}`}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-4">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-muted">
          {item.category} · {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-hairline text-bone hover:border-brand-lift"
        >
          <span className="sr-only">Close gallery</span>
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center py-4">
        <img
          src={asset(item.src)}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="max-h-full w-auto max-w-full rounded-[4px] object-contain"
        />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4">
        <button type="button" onClick={() => onStep(-1)} className={`${buttonGhostDark} !min-h-[44px] !px-4 !text-[0.8rem]`}>
          Previous
        </button>
        <p className="hidden max-w-md text-center text-[0.85rem] text-muted sm:block">{item.alt}</p>
        <button type="button" onClick={() => onStep(1)} className={`${buttonGhostDark} !min-h-[44px] !px-4 !text-[0.8rem]`}>
          Next
        </button>
      </div>
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const items = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter);
  const anyPlaceholder = gallery.some((g) => g.placeholder);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
    },
    [items.length],
  );

  return (
    <Section id="gallery" tone="dark">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="gallery"
          eyebrow="The Chairs"
          title={<>Choose a Barber</>}
          lede="Ten chairs in the shop. Tap one to see who cuts there, call them or book straight into their chair."
        />
        <a href={business.instagram} target="_blank" rel="noopener" className={`${buttonGhostDark} shrink-0`}>
          <InstagramIcon className="h-[18px] w-[18px]" />
          {business.instagramHandle}
        </a>
      </div>

      <div className="mt-10">
        <ChairPicker />
      </div>

      {/* Work photos keep their place below the picker, under their own label. */}
      <h3 className="eyebrow mt-16 border-t border-hairline pt-10 text-brand-lift">Recent work</h3>

      {anyPlaceholder && (
        <EditorNote>
          These are labeled placeholders. Swap in real photos of your own cuts (keep the descriptive filenames) and
          update each alt description in <Code>src/data/business.ts</Code>.
        </EditorNote>
      )}

      <div className="mt-8" role="group" aria-label="Filter gallery by type of work">
        <ul className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <li key={f}>
              <button
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`inline-flex min-h-[44px] items-center rounded-[4px] border px-4 text-[0.8rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                  filter === f
                    ? 'border-brand bg-brand text-white'
                    : 'border-hairline text-muted hover:border-brand-lift hover:text-bone'
                }`}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul data-gallery-grid className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
              className="group block w-full overflow-hidden rounded-[4px] border border-hairline bg-ink-2 transition-colors hover:border-brand-lift"
            >
              <img
                src={asset(item.src)}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="flex items-center justify-between gap-2 px-3 py-2.5 text-left text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                <span className="truncate">{item.category}</span>
                <span
                  className="hidden shrink-0 text-brand-lift opacity-0 transition-opacity group-hover:opacity-100 sm:inline"
                  aria-hidden
                >
                  View
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && <Lightbox items={items} index={openIndex} onClose={close} onStep={step} />}
    </Section>
  );
}
