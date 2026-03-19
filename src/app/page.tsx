import Hero from "@/components/home/Hero";
import WhyUs from "@/components/home/WhyUs";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import InvestmentCorridors from "@/components/home/InvestmentCorridors";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import LeadCapture from "@/components/home/LeadCapture";
import { getAllProperties } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <>
      <Hero />
      <WhyUs />
      <section id="properties">
        <FeaturedProperties properties={properties} />
      </section>
      <InvestmentCorridors />
      <HowItWorks />
      <Testimonials />
      <LeadCapture />
    </>
  );
}
