import { createContext, useContext } from 'react';

/**
 * The booking panel is opened from the header, the mobile menu and the sticky
 * mobile bar, so its open state lives in a context rather than in any one of
 * them. Kept out of the component file so that file only exports components.
 */
export const BookingContext = createContext<{ open: () => void } | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
