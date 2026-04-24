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

      <div className="py-8 bg-cream border-y-[1.5px] border-ink/90 overflow-hidden">
        <Marquee items={brands} />
      </div>

      <CaseStudyGrid />

      <Timeline />

      <About />
    </>
  );
}
