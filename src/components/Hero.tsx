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
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/70" />
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh opacity-60" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "-1.5s" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust Badge */}
          <div
            className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full border-accent/30 shadow-glow opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              Trusted by clients worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-fluid-3xl font-bold text-primary-foreground leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Lost Crypto?
            <br />
            <span className="gradient-text-animated">We Recover What Matters.</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-fluid-lg text-primary-foreground/90 max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Professional blockchain investigation and digital asset recovery services.
            Your funds, your security, our expertise.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                Start Your Recovery
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/how-it-works">How It Works</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: CheckCircle2, label: "$2M+ Recovered" },
              { icon: TrendingUp, label: "98% Success Rate" },
              { icon: Shield, label: "Bank-Grade Security" },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-center gap-3 p-4 glass rounded-xl border-accent/20 hover:border-accent/40 hover:shadow-glow transition-all duration-300"
              >
                <item.icon className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="text-primary-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }}>
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/60 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
