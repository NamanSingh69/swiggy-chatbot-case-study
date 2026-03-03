import HeroSection from "./components/HeroSection";
import EvidenceSection from "./components/EvidenceSection";
import ArchitectureBreakdown from "./components/ArchitectureBreakdown";
import ProposedSolution from "./components/ProposedSolution";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Sticky nav dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {[
          { href: "#hero", label: "Hero" },
          { href: "#evidence", label: "Evidence" },
          { href: "#architecture", label: "Architecture" },
          { href: "#solution", label: "Solution" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            title={item.label}
            className="w-2.5 h-2.5 rounded-full bg-foreground/20 hover:bg-cyan hover:scale-125 transition-all"
          />
        ))}
      </nav>

      <HeroSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <EvidenceSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ArchitectureBreakdown />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <ProposedSolution />
    </main>
  );
}
