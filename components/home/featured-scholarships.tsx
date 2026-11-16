import Link from "next/link";
import { featuredScholarships } from "@/lib/data";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { buttonStyles } from "@/components/ui/button";

export function FeaturedScholarships() {
  return (
    <section className="bg-paper-deep border-t-2 border-ink px-6 py-16">
      <div className="mx-auto max-w-5xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl text-forest">
              Closing soon.
            </h2>
            <p className="mt-2 text-ink-soft">
              Do not miss these verified opportunities.
            </p>
          </div>
          <Link href="/scholarships" className={buttonStyles("secondary", "sm")}>
            View all scholarships
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredScholarships.map((item) => (
            <ScholarshipCard key={item.id} scholarship={item} />
          ))}
        </div>
      </div>
    </section>
  );
}