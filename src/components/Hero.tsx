import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Digital Asset Recovery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/50 shadow-glow">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Trusted by clients worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
            Lost Crypto?
            <br />
            <span className="text-accent">We Recover What Matters.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Professional blockchain investigation and digital asset recovery services. 
            Your funds, your security, our expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" asChild className="text-lg px-8 py-6">
              <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                Start Your Recovery
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6 bg-card/50 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-card/70">
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-accent/30">
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
              <span className="text-primary-foreground font-medium">$2M+ Recovered</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-accent/30">
              <TrendingUp className="h-6 w-6 text-accent flex-shrink-0" />
              <span className="text-primary-foreground font-medium">98% Success Rate</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-accent/30">
              <Shield className="h-6 w-6 text-accent flex-shrink-0" />
              <span className="text-primary-foreground font-medium">Bank-Grade Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
