import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import CaseStudyGrid from "@/components/case-study-grid";
import About from "@/components/about";
import Timeline from "@/components/timeline";

const brands = [
  { name: "Flipkart", slug: "flipkart" },
  { name: "Reliance Retail", slug: "reliance-retail" },
  { name: "Nagarro", slug: "nagarro" },
  { name: "Reliance Jio", slug: "reliance-jio" },
  { name: "Swadesh", slug: "swadesh" },
  { name: "Under 25", slug: "under-25" },
  { name: "Buthey", slug: "buthey" },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section
        aria-label="Brands worked with"
        className="relative bg-cream border-y-[1.5px] border-ink overflow-hidden"
      >
        {/* Header rail */}
        <div className="relative z-10 flex items-center justify-between gap-4 max-w-7xl mx-auto px-6 pt-5 md:pt-6">
          <span className="inline-flex items-center gap-2 bg-ink text-cream rounded-full pl-2.5 pr-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] shadow-[0_3px_0_0_#BFFF3D]">
            <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-lime text-ink text-[9px] font-bold">★</span>
            built with
          </span>
          <span className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/60">
            <span>{brands.length.toString().padStart(2, "0")} partners</span>
            <span className="opacity-30">·</span>
            <span>2017 → now</span>
          </span>
        </div>

        {/* Marquee row */}
        <div className="py-6 md:py-8">
          <Marquee items={brands} />
        </div>

        {/* Footer rail */}
        <div className="relative border-t border-dashed border-ink/25">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cherry opacity-75 animate-ping_slow" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cherry" />
              </span>
              currently shipping at reliance retail
            </span>
            <span className="hidden md:inline">signed / bengaluru</span>
          </div>
        </div>
      </section>

      <About />

      <CaseStudyGrid />

      <Timeline />
    </>
  );
}
