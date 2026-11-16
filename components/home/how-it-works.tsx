export function HowItWorks() {
  return (
    <section className="bg-paper border-t-2 border-ink px-6 py-20">
      <div className="mx-auto max-w-5xl">
        
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl text-forest leading-[1.05]">
            The path to your next opportunity.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            We cut out the noise. AfriScholar gives you the exact tools you need to go from finding an opportunity to securing it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Step 1 */}
          <div className="border-t-4 border-forest pt-6">
            <h3 className="text-2xl font-bold text-ink mb-3">Discover.</h3>
            <p className="text-ink-soft leading-relaxed">
              Find verified scholarships and grants matched to your level, location, and goals. No fake links, no paywalls.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-t-4 border-forest pt-6">
            <h3 className="text-2xl font-bold text-ink mb-3">Prepare.</h3>
            <p className="text-ink-soft leading-relaxed">
              Access free guides on writing a business plan, pricing your product, and acing the application process.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-t-4 border-forest pt-6">
            <h3 className="text-2xl font-bold text-ink mb-3">Apply.</h3>
            <p className="text-ink-soft leading-relaxed">
              Send your application directly to the funder. No middlemen, no hidden agents taking a cut of your future.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}