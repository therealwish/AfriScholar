import Link from "next/link";
import { allGuides } from "@/lib/learn";

export default function LearnPage() {
  return (
    <div className="bg-paper min-h-screen pb-20">
      <div className="border-b-2 border-ink px-6 py-16 md:py-24 bg-paper-deep">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl text-forest tracking-tight">Learn.</h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl">
            Practical, zero-fluff guides to help you start a business, price your product, and secure funding.
          </p>
        </div>
      </div>
      <div className="px-6 pt-12">
        <div className="mx-auto max-w-5xl">
          <div className="border-t-2 border-ink/10">
            {allGuides.map((guide) => (
              <Link 
                key={guide.id} 
                href={`/learn/${guide.id}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b-2 border-ink/10 hover:bg-paper-deep/50 transition-colors px-4 -mx-4"
              >
                <div className="max-w-3xl">
                  <h2 className="text-2xl md:text-3xl text-ink group-hover:text-forest transition-colors">
                    {guide.title}
                  </h2>
                  <p className="mt-2 text-ink-soft leading-relaxed">{guide.summary}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-6 shrink-0">
                  <span className="font-mono text-xs text-ink-faint uppercase tracking-wider">
                    {guide.readTime}
                  </span>
                  <span className="text-2xl text-forest group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}