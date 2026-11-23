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

      {/* Social Proof Section */}
      <section className="bg-paper border-t-2 border-ink px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl text-forest mb-10">
            Trusted by young African leaders.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="border-2 border-ink p-6 bg-paper-deep">
              <p className="text-ink-soft italic mb-4">
                {"\"I found the DAAD scholarship on AfriScholar. The 1-page business plan guide helped me structure my application perfectly.\""}
              </p>
              <p className="font-mono text-sm text-forest uppercase">- Tinashe, Harare</p>
            </div>
            <div className="border-2 border-ink p-6 bg-paper-deep">
              <p className="text-ink-soft italic mb-4">
                {"\"The Matcher engine saved me hours. It filtered out everything I wasn't eligible for and showed me exactly what I could win.\""}
              </p>
              <p className="font-mono text-sm text-forest uppercase">- Rudo, Bulawayo</p>
            </div>
            <div className="border-2 border-ink p-6 bg-paper-deep">
              <p className="text-ink-soft italic mb-4">
                {"\"I shared my business idea on the Community Wall and found a technical co-founder. We are applying for the Tony Elumelu grant together.\""}
              </p>
              <p className="font-mono text-sm text-forest uppercase">- Farai, Gweru</p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CallToAction />
    </div>
  );
}