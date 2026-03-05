import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Showcase from "@/components/Showcase";
import Technology from "@/components/Technology";
import About from "@/components/About";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <>
      <PageTransition />
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Showcase />
        <Technology />
        <About />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
