import { business, ratingInfo, reviews, reviewsReady } from '../data/business';
import { NeedsInfoLight, Reveal, Section, SectionHeading, buttonGhostLight } from './ui';
import { StarIcon } from './Icons';

export function Reviews() {
  const hasReviewsLink = business.googleReviewsUrl.length > 0;

  return (
    <Section id="reviews" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="reviews"
          tone="light"
          eyebrow="Reviews"
          title={<>What San Antonio says</>}
          lede={
            reviewsReady
              ? 'Every review below is copied from Google word for word — nothing written for us, nothing edited.'
              : 'Reviews are pulled straight from Google, word for word. Nothing here is written on the shop’s behalf.'
          }
        />

        {/* Rating and count print only when verified against the live Google profile. */}
        {ratingInfo.verified && (
          <div className="shrink-0">
            <p className="flex items-center gap-2 text-[2rem] font-extrabold leading-none">
              <StarIcon className="h-6 w-6 text-brand-deep" />
              {ratingInfo.rating}
            </p>
            <p className="mt-1 text-[0.85rem] font-semibold text-muted-ink">
              {ratingInfo.reviewCount} Google reviews
            </p>
          </div>
        )}
      </div>

      {!ratingInfo.verified && (
        <p className="mt-8 flex flex-wrap items-center gap-3 rounded-[4px] border border-dashed border-amber-600/50 bg-amber-500/8 px-4 py-3 text-[0.9rem] text-amber-900">
          <NeedsInfoLight>Editor note</NeedsInfoLight>
          The Google rating and review count are not verified, so nothing is displayed. Check the live Google Business
          Profile, then set <code className="rounded bg-ink/8 px-1.5 py-0.5 text-[0.82rem]">ratingInfo</code> in{' '}
          <code className="rounded bg-ink/8 px-1.5 py-0.5 text-[0.82rem]">src/data/business.ts</code>.
        </p>
      )}

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal key={i} as="li" delay={i * 70} className="flex h-full flex-col rounded-[4px] border border-ink/12 bg-white p-6">
              {reviewsReady ? (
                <>
                  <blockquote className="flex-1 text-[1rem] leading-relaxed text-ink">“{review.quote}”</blockquote>
                  <footer className="mt-5 border-t border-ink/10 pt-4 text-[0.85rem] font-semibold text-muted-ink">
                    {review.author} · via {review.source}
                  </footer>
                </>
              ) : (
                <>
                  <NeedsInfoLight>Review {i + 1}</NeedsInfoLight>
                  <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-muted-ink">
                    Paste a real Google review here, word for word, with the reviewer’s first name. Nothing is
                    written on the shop’s behalf.
                  </p>
                  <p className="mt-5 border-t border-ink/10 pt-4 text-[0.85rem] font-semibold text-muted-ink">
                    Reviewer name · via Google
                  </p>
                </>
              )}
          </Reveal>
        ))}
      </ul>

      <div className="mt-10">
        {hasReviewsLink ? (
          <a href={business.googleReviewsUrl} target="_blank" rel="noopener" className={buttonGhostLight}>
            Read all reviews on Google
          </a>
        ) : (
          <a href={business.googleMapsUrl} target="_blank" rel="noopener" className={buttonGhostLight}>
            Find us on Google
          </a>
        )}
      </div>
    </Section>
  );
}
