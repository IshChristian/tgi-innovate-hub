import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Applications from "@/components/Applications";
import CaseStudies from "@/components/CaseStudies";
import Insights from "@/components/Insights";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Applications />
        <CaseStudies />
        <Insights />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
