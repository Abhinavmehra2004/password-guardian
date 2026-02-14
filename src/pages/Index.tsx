import { ShieldCheck } from "lucide-react";
import PasswordAnalyzerCard from "@/components/PasswordAnalyzerCard";

const Index = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <ShieldCheck className="h-8 w-8 text-primary animate-pulse-glow" />
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-wide">
            Password <span className="text-primary text-glow">Analyzer</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Secure Your Digital Life — Check your password strength and get actionable tips to stay protected.
        </p>

      </header>

      {/* Main Content */}
      <section className="flex-1 flex items-start justify-center px-4 pb-16">
        <PasswordAnalyzerCard />
      </section>
    </main>
  );
};

export default Index;
