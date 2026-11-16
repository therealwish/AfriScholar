import { Hero } from "@/components/home/hero";
import { FeaturedScholarships } from "@/components/home/featured-scholarships";
import { HowItWorks } from "@/components/home/how-it-works";
import { CallToAction } from "@/components/home/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedScholarships />
      <HowItWorks />
      <CallToAction />
    </div>
  );
}