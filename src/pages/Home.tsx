import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { Offer } from '../components/Offer';
import { WhyUs } from '../components/WhyUs';
import { Gallery } from '../components/Gallery';
import { Faq } from '../components/Faq';
import { FinalCta } from '../components/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Offer />
      <WhyUs />
      <Gallery />
      <Faq />
      <FinalCta />
    </>
  );
}
