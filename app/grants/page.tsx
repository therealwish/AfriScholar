import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { GrantCard } from "@/components/grants/grant-card";
import { Grant } from "@/lib/types";

// ADD THIS LINE:
export const dynamic = "force-dynamic";

async function GrantList() {
  const { data: grants } = await supabase
    .from("grants")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="px-6 pt-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-sm text-ink-faint uppercase mb-6">
          Showing {grants?.length || 0} opportunities
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {grants?.map((grant: Grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GrantsPage() {
  return (
    <div className="bg-paper min-h-screen pb-20">
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

      <Suspense fallback={
        <div className="px-6 pt-12 text-center text-ink-soft">
          <p className="font-mono text-sm uppercase">Loading grants...</p>
        </div>
      }>
        <GrantList />
      </Suspense>
    </div>
  );
}