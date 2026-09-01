import { Hero } from '../components/Hero';
import { Offer } from '../components/Offer';
import { WhyUs } from '../components/WhyUs';
import { ChooseBarber } from '../components/ChooseBarber';
import { Faq } from '../components/Faq';
import { FinalCta } from '../components/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Offer />
      <WhyUs />
      <ChooseBarber />
      <Faq />
      <FinalCta />
    </>
  );
}
