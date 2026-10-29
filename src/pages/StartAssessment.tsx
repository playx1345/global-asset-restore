import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import IntakeWizard from "@/components/IntakeWizard";
import { ShieldCheck, Lock, Clock } from "lucide-react";

const StartAssessment = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Start Your Case Assessment | SPECTRA TRACE"
      description="Answer a few questions and get a confidential, free preliminary assessment from SPECTRA TRACE digital forensics and asset recovery specialists."
      path="/start"
    />
    <Navigation />
    <main className="relative pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 blockchain-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 glass-crypto px-4 py-2 rounded-full text-xs sm:text-sm text-foreground mb-5">
            <Lock className="h-4 w-4 text-primary" /> Encrypted · Confidential · No obligation
          </span>
          <h1 className="text-fluid-2xl font-bold mb-4">
            <span className="text-foreground">Start your </span>
            <span className="gradient-text-animated">case assessment</span>
          </h1>
          <p className="text-muted-foreground">
            Four quick steps. A specialist reviews every submission.
          </p>
          <div className="flex items-center justify-center gap-6 mt-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> About 2 minutes</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Free triage</span>
          </div>
        </header>
        <IntakeWizard />
      </div>
    </main>
    <Footer />
  </div>
);

export default StartAssessment;
