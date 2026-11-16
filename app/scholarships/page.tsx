import Link from "next/link";
import { allScholarships } from "@/lib/data";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { buttonStyles } from "@/components/ui/button";

export default function ScholarshipsPage() {
  return (
    <div className="bg-paper min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="border-b-2 border-ink px-6 py-16 md:py-24 bg-paper-deep">
        <div className="mx-auto max-w-5xl flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          
          {/* Left side: Title & description */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl text-forest tracking-tight">
              Scholarships.
            </h1>
            <p className="mt-6 text-lg text-ink-soft">
              Verified funding opportunities for African students. We check every link so you do not waste time on dead ends or fake applications.
            </p>
          </div>

          {/* Right side: Matcher Call to Action */}
          <div className="bg-paper border-2 border-ink p-6 shadow-none w-full lg:max-w-sm shrink-0">
            <h2 className="text-xl text-ink mb-2">Not sure where to start?</h2>
            <p className="text-sm text-ink-soft mb-5">
              Answer a few quick questions and our matching engine will filter out what you do not qualify for.
            </p>
            <Link 
              href="/matcher" 
              className={buttonStyles("primary", "md", "w-full")}
            >
              Find your fit →
            </Link>
          </div>

        </div>
      </div>

      {/* Scholarship Grid */}
      <div className="px-6 pt-12">
        <div className="mx-auto max-w-5xl">
          
          <p className="font-mono text-sm text-ink-faint uppercase mb-6">
            Showing {allScholarships.length} opportunities
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allScholarships.map((scholarship) => (
              <ScholarshipCard 
                key={scholarship.id} 
                scholarship={scholarship} 
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}