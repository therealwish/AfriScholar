import { allGrants } from "@/lib/data";
import { GrantCard } from "@/components/grants/grant-card";

export default function GrantsPage() {
  return (
    <div className="bg-paper min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="border-b-2 border-ink px-6 py-16 md:py-24 bg-paper-deep">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl text-forest tracking-tight">
            Grants.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl">
            Funding to start, scale, or sustain your business. We track verified opportunities for young African entrepreneurs.
          </p>
        </div>
      </div>

      {/* Grant Grid */}
      <div className="px-6 pt-12">
        <div className="mx-auto max-w-5xl">
          
          <p className="font-mono text-sm text-ink-faint uppercase mb-6">
            Showing {allGrants.length} opportunities
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allGrants.map((grant) => (
              <GrantCard 
                key={grant.id} 
                grant={grant} 
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}