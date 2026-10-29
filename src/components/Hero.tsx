import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Digital Asset Recovery"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
      </div>

      {/* Animated Mesh Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-mesh opacity-80" />
      
      {/* Blockchain Grid Pattern */}
      <div className="absolute inset-0 z-[1] blockchain-grid opacity-40" />
      
      {/* Particle Effect */}
      <div className="absolute inset-0 z-[2] particles opacity-60" />

      {/* Floating Neon Orbs */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {/* Large cyan orb */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-float-slow opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--neon-cyan)) 0%, transparent 70%)" }}
        />
        {/* Purple orb */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] animate-float opacity-15"
          style={{ 
            background: "radial-gradient(circle, hsl(var(--neon-purple)) 0%, transparent 70%)",
            animationDelay: "-3s" 
          }}
        />
        {/* Small accent orb */}
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full blur-[80px] animate-float-fast opacity-25"
          style={{ 
            background: "radial-gradient(circle, hsl(var(--neon-green)) 0%, transparent 70%)",
            animationDelay: "-1.5s" 
          }}
        />
        
        {/* Orbiting element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit opacity-30">
            <div className="w-2 h-2 rounded-full bg-primary shadow-neon-cyan" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20 sm:py-28 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Trust Badge with Glow */}
          <div
            className="inline-flex items-center gap-2 glass-crypto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-glow opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary animate-glow-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground">
              Vetted · Discreet · Evidence-first
            </span>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1
            className="text-fluid-3xl font-bold leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-foreground">Elite Digital Forensics.</span>
            <br />
            <span className="gradient-text-animated text-glow">Trace. Recover. Restore.</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Blockchain tracing, account recovery and fraud investigation by certified specialists.
            Free 24-hour assessment. Clear pricing before any work begins.
          </p>

          {/* CTA Buttons with Neon Effects */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4 sm:px-0 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="neon" size="xl" asChild className="w-full sm:w-auto">
              <Link to="/start">Start Free Assessment</Link>
            </Button>
            <Button variant="glass" size="xl" asChild className="w-full sm:w-auto">
              <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">Talk to a Specialist</a>
            </Button>
          </div>

          {/* Trust Indicators with Neon Glow */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 sm:pt-12 max-w-3xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: CheckCircle2, label: "Upfront pricing", color: "neon-green" },
              { icon: TrendingUp, label: "24h triage", color: "neon-cyan" },
              { icon: Shield, label: "Encrypted intake", color: "neon-purple" },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 glass-crypto rounded-xl border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-500 tilt-3d"
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:scale-110 transition-all duration-300 icon-glow shrink-0" />
                <span className="text-foreground text-sm sm:text-base font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Neon Glow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }}>
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center p-2 shadow-glow">
          <div className="w-1 h-2 bg-primary rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default Hero;