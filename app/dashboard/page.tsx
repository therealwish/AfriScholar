"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Roadmap } from "@/components/dashboard/roadmap";
import { allGuides } from "@/lib/learn";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { supabase } from "@/lib/supabase";
import { Scholarship } from "@/lib/types";
import { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const recommendedGuides = allGuides.slice(0, 2);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Get Session from the browser
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/auth");
        return;
      }
      
      setUser(session.user);

      // 2. Fetch Saved Scholarships
      const { data: savedData } = await supabase
        .from("saved_scholarships")
        .select(`
          scholarship_id,
          scholarships (*)
        `)
        .eq("user_id", session.user.id);

      if (savedData) {
        type SavedItem = { scholarships: Scholarship[] };
        const extracted = savedData
          .map((item: SavedItem) => item.scholarships[0])
          .filter((s): s is Scholarship => !!s);
        
        setSavedScholarships(extracted);
      }
      
      setLoading(false);
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center">
        <p className="font-mono text-sm uppercase text-ink-faint">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) return null; // Will redirect in useEffect

  return (
    <div className="bg-paper min-h-screen pb-20">
      <div className="border-b-2 border-ink px-6 py-12 bg-paper-deep">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-sm text-ink-faint uppercase tracking-wider mb-2">
              Dashboard
            </p>
            <h1 className="text-4xl md:text-5xl text-forest tracking-tight">
              Welcome back, {user.user_metadata?.full_name || "Founder"}.
            </h1>
          </div>
          <div className="flex gap-4">
            <Link href="/scholarships" className="text-sm font-medium text-forest hover:text-forest-soft transition-colors underline underline-offset-4">
              Browse scholarships
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 pt-12">
        <div className="mx-auto max-w-5xl space-y-16">
          <section>
            <div className="mb-6">
              <h2 className="text-2xl text-ink">Your Roadmap.</h2>
              <p className="text-ink-soft mt-1 text-sm">Click a step to mark it as complete.</p>
            </div>
            <Roadmap />
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Saved Scholarships Section */}
            <section>
              <div className="flex items-end justify-between mb-6 border-b-2 border-ink/10 pb-2">
                <h2 className="text-2xl text-ink">Saved Opportunities.</h2>
                <Link href="/scholarships" className="text-sm text-forest hover:underline underline-offset-4">
                  Find more
                </Link>
              </div>
              
              {savedScholarships.length === 0 ? (
                <div className="border-2 border-ink/10 p-6 text-center bg-paper-deep">
                  <p className="text-ink-soft text-sm">
                    {"You haven't saved any scholarships yet. Click \"Save\" on any card to keep it here."}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedScholarships.map((scholarship: Scholarship) => (
                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>
              )}
            </section>

            {/* Recommended Reading Section */}
            <section>
              <div className="flex items-end justify-between mb-6 border-b-2 border-ink/10 pb-2">
                <h2 className="text-2xl text-ink">Recommended Reading.</h2>
                <Link href="/learn" className="text-sm text-forest hover:underline underline-offset-4">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedGuides.map((guide) => (
                  <Link 
                    key={guide.id} 
                    href={`/learn/${guide.id}`}
                    className="group block border-2 border-ink/20 p-5 hover:border-forest transition-colors"
                  >
                    <h3 className="text-lg text-ink group-hover:text-forest transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-1 line-clamp-2">
                      {guide.summary}
                    </p>
                    <span className="font-mono text-xs text-ink-faint uppercase mt-3 block">
                      {guide.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}