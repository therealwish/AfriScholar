import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scholarship } from "@/lib/types";

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <Card 
      className="flex flex-col shadow-none hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="mb-3">
        <Badge tone="forest">{scholarship.level}</Badge>
      </div>

      <h3 className="text-xl text-ink leading-tight mt-1">
        {scholarship.title}
      </h3>
      <p className="text-sm text-ink-soft mt-1">
        {scholarship.institution} • {scholarship.location}
      </p>

      <div className="mt-auto pt-6 flex items-end justify-between border-t border-ink/10">
        <div className="flex flex-col">
          <span className="font-mono text-[0.65rem] text-ink-faint uppercase">Deadline</span>
          <span className="font-mono text-sm text-clay mt-0.5">
            {scholarship.deadline}
          </span>
        </div>
        
        <a 
          href={scholarship.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-1 text-sm text-forest hover:text-forest-soft transition-colors pb-0.5 border-b-2 border-transparent hover:border-forest-soft"
        >
          Details
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
      </div>
    </Card>
  );
}