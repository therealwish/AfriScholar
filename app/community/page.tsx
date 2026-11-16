import { CommunityWall } from "@/components/community/community-wall";

export default function CommunityPage() {
  return (
    <div className="bg-paper min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="border-b-2 border-ink px-6 py-16 md:py-24 bg-paper-deep">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl text-forest tracking-tight">
            Community.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl">
            Pitch your idea. Find a co-founder. Ask for feedback. This is where the next generation of African businesses starts.
          </p>
        </div>
      </div>

      {/* The Wall */}
      <div className="px-6 pt-12">
        <CommunityWall />
      </div>

    </div>
  );
}