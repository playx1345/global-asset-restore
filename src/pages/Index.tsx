import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Globe, ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import indexCtaImage from "@/assets/index-cta-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* Trust Metrics Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Blockchain grid background */}
        <div className="absolute inset-0 blockchain-grid opacity-20 pointer-events-none" />
        
        {/* Background mesh */}
        <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: Shield, 
                title: "Trusted Worldwide", 
                number: 50, 
                suffix: "+", 
                label: "countries served",
                color: "cyan" 
              },
              { 
                icon: Zap, 
                title: "Fast Recovery", 
                number: 2, 
                suffix: "-4 weeks", 
                label: "average recovery time",
                color: "purple" 
              },
              { 
                icon: Globe, 
                title: "All Blockchains", 
                number: 20, 
                suffix: "+", 
                label: "major networks supported",
                color: "green" 
              },
            ].map((item, index) => (
              <Card
                key={index}
                variant="neon"
                className="p-8 text-center group opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-5 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                  <item.icon className="h-8 w-8 text-primary icon-glow" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">{item.title}</h3>
                <div className="text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={item.number} suffix={item.suffix} duration={2000} />
                </div>
                <p className="text-muted-foreground text-sm">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <Testimonials />

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={indexCtaImage}
            alt="Security and protection"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
        </div>
        
        {/* Blockchain grid overlay */}
        <div className="absolute inset-0 z-[1] blockchain-grid opacity-30" />
        
        {/* Background mesh */}
        <div className="absolute inset-0 z-[1] bg-mesh opacity-60" />
        
        {/* Floating orbs */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-float-slow opacity-15"
            style={{ background: "radial-gradient(circle, hsl(var(--neon-cyan)) 0%, transparent 70%)" }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] animate-float opacity-10"
            style={{ background: "radial-gradient(circle, hsl(var(--neon-purple)) 0%, transparent 70%)", animationDelay: "-2s" }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-fluid-2xl font-bold mb-6 opacity-0 animate-fade-in"
            >
              <span className="text-foreground">Don't Let </span>
              <span className="gradient-text-animated">Scammers Win</span>
            </h2>
            <p
              className="text-fluid-lg text-muted-foreground mb-10 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Every minute counts. Start your recovery process today and take back what's yours.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button variant="neon" size="xl" asChild className="gap-2">
                <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                  Contact Us on WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="cyber" size="xl" asChild>
                <a href="/contact">Send Email</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;