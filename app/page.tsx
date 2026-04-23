import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Index from '@/components/Index';
import Work from '@/components/Work';
import Manifesto from '@/components/Manifesto';
import Dispatch from '@/components/Dispatch';

export default function HomePage() {
  return (
    <div className="grain relative min-h-[100dvh] bg-cream-100 text-charcoal-900">
      <Nav />
      <main>
        <Hero />
        <Index />
        <Work />
        <Manifesto />
        <Dispatch />
      </main>
      <Footer />
    </div>
  );
}
