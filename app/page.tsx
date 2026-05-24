import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import HowBuilt from "@/components/HowBuilt";
import CVSection from "@/components/CVSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <CaseStudies />
      <HowBuilt />
      <CVSection />
      <Contact />
      <Footer />
    </main>
  );
}
