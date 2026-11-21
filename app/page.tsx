import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { FeaturedScholarships } from "@/components/home/featured-scholarships";
import { HowItWorks } from "@/components/home/how-it-works";
import { CallToAction } from "@/components/home/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Wrap the database component in Suspense */}
      <Suspense fallback={
        <div className="bg-paper-deep border-t-2 border-ink px-6 py-16 text-center">
          <p className="font-mono text-sm uppercase text-ink-faint">Loading featured opportunities...</p>
        </div>
      }>
        <FeaturedScholarships />
      </Suspense>

      <HowItWorks />
      <CallToAction />
    </div>
  );
}