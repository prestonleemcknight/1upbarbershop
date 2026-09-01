import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBar } from './components/MobileBar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import LocationPage from './pages/Location';
import ContactPage from './pages/Contact';
import BookPage from './pages/Book';
import EmploymentPage from './pages/Employment';
import SocialsPage from './pages/Socials';
import GiftCardsPage from './pages/GiftCards';

export default function App() {
  return (
    /* basename keeps routes matching under the GitHub Pages sub-path. */
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[4px] focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/employment" element={<EmploymentPage />} />
          <Route path="/socials" element={<SocialsPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
    </BrowserRouter>
  );
}
