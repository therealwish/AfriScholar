import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-4xl text-center">
        
        <h1 className="text-5xl md:text-7xl text-forest tracking-tight text-balance leading-[0.95]">
          Building the next generation of African leaders.
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-ink-soft max-w-2xl mx-auto text-balance">
          Discover verified scholarships, access business grants, and learn the skills to build your future. No paywalls. Just opportunities.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/scholarships" className={buttonStyles("primary", "lg", "w-full sm:w-auto")}>
            Find a scholarship
          </Link>
          <Link href="/grants" className={buttonStyles("secondary", "lg", "w-full sm:w-auto")}>
            Browse grants
          </Link>
        </div>

      </div>
    </section>
  );
}