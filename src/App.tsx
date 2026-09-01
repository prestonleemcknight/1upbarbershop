import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Barbers } from './components/Barbers';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Offer } from './components/Offer';
import { LocationHours } from './components/LocationHours';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { MobileBar } from './components/MobileBar';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[4px] focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <Offer />
        <WhyUs />
        <Barbers />
        <Gallery />
        <Reviews />
        <LocationHours />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
