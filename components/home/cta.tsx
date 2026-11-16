import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-forest px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-6xl text-paper tracking-tight leading-tight">
          Stop searching. Start applying.
        </h2>
        <p className="mt-6 text-lg text-paper/80 max-w-xl mx-auto">
          Join thousands of young Africans using AfriScholar to find the funding they need to build their future.
        </p>
                <div className="mt-10 flex justify-center">
          <Link href="/auth" className={buttonStyles("primary", "lg")}>
            Create a free account
          </Link>
        </div>
      </div>
    </section>
  );
}