import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import CaseStudyGrid from "@/components/case-study-grid";
import About from "@/components/about";
import Timeline from "@/components/timeline";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="py-6 border-y-2 border-ink bg-ink text-cream">
        <Marquee
          items={[
            "Flipkart",
            "Reliance",
            "Polygon",
            "Collective Artists",
            "Under 25",
            "Buthey",
            "Nagarro",
          ]}
        />
      </div>

      <CaseStudyGrid />

      <Timeline />

      <About />
    </>
  );
}
