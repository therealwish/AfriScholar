import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grant } from "@/lib/data";

export function GrantCard({ grant }: { grant: Grant }) {
  return (
    <Card 
      className="flex flex-col shadow-none hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="mb-3">
        <Badge tone="clay">Grant</Badge>
      </div>

      <h3 className="text-xl text-ink leading-tight mt-1">
        {grant.title}
      </h3>
      <p className="text-sm text-ink-soft mt-1">
        {grant.funder}
      </p>

      <div className="mt-auto pt-6 flex items-end justify-between border-t border-ink/10">
        <div className="flex flex-col">
          <span className="font-mono text-[0.65rem] text-ink-faint uppercase">Amount</span>
          <span className="font-mono text-sm text-forest mt-0.5">
            {grant.amount}
          </span>
        </div>
        
        <a 
          href={grant.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-1 text-sm text-forest hover:text-forest-soft transition-colors pb-0.5 border-b-2 border-transparent hover:border-forest-soft"
        >
          Apply
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>
      </div>
    </Card>
  );
}