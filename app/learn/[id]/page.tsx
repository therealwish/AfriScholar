import Link from "next/link";
import { notFound } from "next/navigation";
import { allGuides } from "@/lib/learn";

// THIS IS THE FIX FOR THE VERCEL BUILD ERROR:
export function generateStaticParams() {
  return allGuides.map((guide) => ({
    id: guide.id,
  }));
}

export default async function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  // Get the ID from the URL
  const { id } = await params;
  
  // Find the matching guide in our data
  const guide = allGuides.find((g) => g.id === id);

  // If the guide doesn't exist, show a 404
  if (!guide) {
    notFound();
  }

  return (
    <div className="bg-paper min-h-screen pb-24">
      
      {/* Header */}
      <div className="border-b-2 border-ink px-6 py-16 md:py-24 bg-paper-deep">
        <div className="mx-auto max-w-3xl">
          <Link 
            href="/learn" 
            className="font-mono text-sm text-ink-faint hover:text-forest transition-colors mb-8 inline-block"
          >
            ← Back to all guides
          </Link>
          <h1 className="text-4xl md:text-6xl text-forest tracking-tight leading-[1.1]">
            {guide.title}
          </h1>
          <p className="mt-6 font-mono text-sm text-ink-soft uppercase tracking-wider">
            {guide.readTime}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-12">
        <div className="mx-auto max-w-3xl">
          {/* whitespace-pre-wrap preserves the line breaks from the data file */}
          <div className="text-lg text-ink-soft leading-relaxed whitespace-pre-wrap font-sans">
            {guide.content}
          </div>
          
          <div className="mt-16 pt-8 border-t-2 border-ink/10 text-center">
            <Link 
              href="/learn" 
              className="inline-flex items-center gap-2 text-forest hover:text-forest-soft transition-colors font-medium"
            >
              ← Read another guide
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}