import LocalNavBar from "@/components/LocalNavBar";
import Hero from "@/components/Hero";
import BentoPillars from "@/components/BentoPillars";
import Products from "@/components/Products";
import TechSpecs from "@/components/TechSpecs";
import Journey from "@/components/Journey";
import Milestones from "@/components/Milestones";
import ResumeCenter from "@/components/ResumeCenter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#080807] overflow-x-hidden relative">
      {/* Background visionOS radial accent lighting effects */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00698c]/5 filter blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute top-[55%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#292823]/10 filter blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-[#00698c]/5 filter blur-[120px] pointer-events-none select-none z-0" />

      <LocalNavBar />
      <main className="flex-1 w-full relative z-10">
        <Hero />
        <BentoPillars />
        <Products />
        <TechSpecs />
        <Journey />
        <Milestones />
        <ResumeCenter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

