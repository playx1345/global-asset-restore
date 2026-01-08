import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Globe, ArrowRight } from "lucide-react";
import indexCtaImage from "@/assets/index-cta-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Trust Metrics Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Trusted Worldwide", desc: "Serving clients in 50+ countries" },
              { icon: Zap, title: "Fast Recovery", desc: "Average recovery time: 2-4 weeks" },
              { icon: Globe, title: "All Blockchains", desc: "Support for 20+ major networks" },
            ].map((item, index) => (
              <Card
                key={index}
                variant="gradient"
                className="p-8 text-center group opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 bg-accent/10 rounded-2xl mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <Testimonials />

      {/* Final CTA */}
      <section className="relative py-24 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={indexCtaImage}
            alt="Security and protection"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/70" />
          <div className="absolute inset-0 bg-mesh opacity-40" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-fluid-2xl font-bold mb-6 opacity-0 animate-fade-in"
            >
              Don't Let Scammers Win
            </h2>
            <p
              className="text-fluid-lg text-primary-foreground/90 mb-10 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Every minute counts. Start your recovery process today and take back what's yours.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button variant="hero" size="xl" asChild className="gap-2">
                <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                  Contact Us on WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="glass" size="xl" asChild>
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
