import Link from "next/link";
import { site } from "@/lib/site";
import { buttonStyles } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xs bg-forest text-paper font-display font-bold text-lg group-hover:bg-forest-soft transition-colors">
            A
          </div>
          <span className="font-display font-bold text-xl tracking-tight mt-0.5">
            {site.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-ink-soft hover:text-forest transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Call to Action */}
        <div className="flex items-center gap-4">
          <Link href="/auth" className="hidden text-sm font-semibold text-ink-soft hover:text-ink sm:block">
            Log in
          </Link>
          <Link href="/auth" className={buttonStyles("primary", "sm")}>
            Join free
          </Link>
        </div>
        
      </div>
    </header>
  );
}