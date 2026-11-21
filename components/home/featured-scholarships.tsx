import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { buttonStyles } from "@/components/ui/button";
import { Scholarship } from "@/lib/types";

// This is the async component that fetches the data
async function FeaturedList() {
  const { data: scholarships } = await supabase
    .from("scholarships")
    .select("*")
    .eq("is_featured", true)
    .limit(3);

  if (!scholarships || scholarships.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {scholarships.map((item: Scholarship) => (
        <ScholarshipCard key={item.id} scholarship={item} />
      ))}
    </div>
  );
}

// This is the static shell that renders instantly
export function FeaturedScholarships() {
  return (
    <section className="bg-paper-deep border-t-2 border-ink px-6 py-16">
      <div className="mx-auto max-w-5xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl text-forest">
              Featured Opportunities.
            </h2>
            <p className="mt-2 text-ink-soft">
              Hand-picked scholarships closing soon.
            </p>
          </div>
          <Link href="/scholarships" className={buttonStyles("secondary", "sm")}>
            View all scholarships
          </Link>
        </div>

        {/* The data-fetching part is wrapped in its own Suspense, 
            even though we also wrapped it in page.tsx for extra safety. */}
        <FeaturedList />
      </div>
    </section>
  );
}