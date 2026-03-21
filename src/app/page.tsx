import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import HowItWorks from "@/components/home/HowItWorks";
import InvestmentCorridors from "@/components/home/InvestmentCorridors";

import Testimonials from "@/components/home/Testimonials";
import LeadCapture from "@/components/home/LeadCapture";
import MarketReportCTA from "@/components/home/MarketReportCTA";
import { getAllProperties } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProperties properties={properties} />
      <HowItWorks />
      <InvestmentCorridors />

      <Testimonials />
      <LeadCapture />
      <MarketReportCTA />
    </>
  );
}
