import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import CaseStudyGrid from "@/components/case-study-grid";
import About from "@/components/about";
import Timeline from "@/components/timeline";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="py-10 border-y border-hairline overflow-hidden">
        <Marquee
          items={[
            "Flipkart",
            "Reliance Retail",
            "Collective Artists Network",
            "Nagarro",
            "Under 25",
            "Buthey",
            "Reliance Jio",
          ]}
        />
      </div>

      <CaseStudyGrid />

      <Timeline />

      <About />
    </>
  );
}
