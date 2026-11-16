import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-paper border-t-2 border-ink px-6 py-12">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-xs bg-forest text-paper font-display text-sm">
            A
          </div>
          <span className="font-display text-lg tracking-tight mt-1">
            {site.name}
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-ink-soft">
          <Link href="/scholarships" className="hover:text-ink transition-colors">Scholarships</Link>
          <Link href="/grants" className="hover:text-ink transition-colors">Grants</Link>
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
          <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
        </nav>

        <p className="font-mono text-xs text-ink-faint">
          © 2026 {site.name}
        </p>

      </div>
    </footer>
  );
}