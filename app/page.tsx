import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import WorkExp from "@/components/WorkExp";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <div>
      <Hero />
      <WorkExp />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}
