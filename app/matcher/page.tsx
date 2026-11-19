import { QuizForm } from "@/components/matcher/quiz-form";
import { supabase } from "@/lib/supabase";
import { Scholarship } from "@/lib/types";

export default async function MatcherPage() {
  const { data: scholarships } = await supabase.from("scholarships").select("*");

  return (
    <div className="bg-paper min-h-screen pb-20">
      <div className="border-b-2 border-ink px-6 py-16 md:py-20 bg-paper-deep">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl text-forest tracking-tight">Find your fit.</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Answer a few questions. Our engine filters out what you do not qualify for, and matches you with opportunities you can actually win.
          </p>
        </div>
      </div>
      <div className="px-6 pt-12">
        <div className="mx-auto max-w-3xl">
          <QuizForm databaseScholarships={(scholarships as Scholarship[]) || []} />
        </div>
      </div>
    </div>
  );
}