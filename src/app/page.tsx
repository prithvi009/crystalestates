import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import InvestmentCorridors from "@/components/home/InvestmentCorridors";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import LeadCapture from "@/components/home/LeadCapture";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <section id="properties">
        <FeaturedProperties />
      </section>
      <InvestmentCorridors />
      <HowItWorks />
      <Testimonials />
      <LeadCapture />
    </>
  );
}
