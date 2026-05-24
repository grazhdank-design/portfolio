import Hero from "@/components/Hero";
import About from "@/components/About";
import HowBuilt from "@/components/HowBuilt";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <HowBuilt />
      <CaseStudies />
      <Contact />
      <Footer />
    </main>
  );
}
