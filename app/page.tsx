import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import CaseStudyGrid from "@/components/case-study-grid";
import About from "@/components/about";
import Moments from "@/components/moments";
import Timeline from "@/components/timeline";

const brands = [
  { name: "Flipkart", slug: "flipkart" },
  { name: "Reliance Retail", slug: "reliance-retail" },
  { name: "Nagarro", slug: "nagarro" },
  { name: "Reliance Jio", slug: "reliance-jio" },
  { name: "War Room", slug: "warroom" },
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
        <div className="py-6 md:py-8 pb-7 md:pb-9">
          <Marquee items={brands} />
        </div>
      </section>

      <About />

      <CaseStudyGrid />

      <Moments />

      <Timeline />
    </>
  );
}
