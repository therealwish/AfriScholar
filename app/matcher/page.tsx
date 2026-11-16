import { QuizForm } from "@/components/matcher/quiz-form";

export default function MatcherPage() {
  return (
    <div className="bg-paper min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="border-b-2 border-ink px-6 py-16 md:py-20 bg-paper-deep">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl text-forest tracking-tight">
            Find your fit.
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Answer a few questions. Our engine filters out what you do not qualify for, and matches you with opportunities you can actually win.
          </p>
        </div>
      </div>

      {/* The Quiz */}
      <div className="px-6 pt-12">
        <div className="mx-auto max-w-3xl">
          <QuizForm />
        </div>
      </div>

    </div>
  );
}