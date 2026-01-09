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
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust Badge with Glow */}
          <div
            className="inline-flex items-center gap-2 glass-crypto px-5 py-2.5 rounded-full shadow-glow opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
            <span className="text-sm font-medium text-foreground">
              Trusted by clients worldwide
            </span>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1
            className="text-fluid-3xl font-bold leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-foreground">Lost Crypto?</span>
            <br />
            <span className="gradient-text-animated text-glow">We Recover What Matters.</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Professional blockchain investigation and digital asset recovery services.
            Your funds, your security, our expertise.
          </p>

          {/* CTA Buttons with Neon Effects */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="neon" size="xl" asChild>
              <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                Start Your Recovery
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>

          {/* Trust Indicators with Neon Glow */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: CheckCircle2, label: "$2M+ Recovered", color: "neon-green" },
              { icon: TrendingUp, label: "98% Success Rate", color: "neon-cyan" },
              { icon: Shield, label: "Bank-Grade Security", color: "neon-purple" },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-center gap-3 p-4 glass-crypto rounded-xl border-primary/20 hover:border-primary/40 hover:shadow-glow transition-all duration-500 tilt-3d"
              >
                <item.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-all duration-300 icon-glow" />
                <span className="text-foreground font-medium">{item.label}</span>
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