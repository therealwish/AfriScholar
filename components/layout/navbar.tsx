"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import { buttonStyles } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
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

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-semibold text-forest hover:text-forest-soft transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
                Log out
              </button>
            </>
          ) : (
            <>
              {/* UPDATED LINK HERE */}
              <Link href="/auth?mode=login" className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
                Log in
              </Link>
              {/* UPDATED LINK HERE */}
              <Link href="/auth?mode=signup" className={buttonStyles("primary", "sm")}>
                Join free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-ink bg-paper-deep px-6 py-4 space-y-4 flex flex-col">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold text-ink hover:text-forest transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t-2 border-ink/10 pt-4 flex flex-col gap-4">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-forest">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-left text-lg font-semibold text-ink-soft">
                  Log out
                </button>
              </>
            ) : (
              <>
                {/* UPDATED MOBILE LINK HERE */}
                <Link href="/auth?mode=login" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-ink-soft">
                  Log in
                </Link>
                {/* UPDATED MOBILE LINK HERE */}
                <Link href="/auth?mode=signup" onClick={() => setIsMenuOpen(false)} className={buttonStyles("primary", "md", "w-full text-center")}>
                  Join free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}