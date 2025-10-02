import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Zap, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Trust Metrics Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Trusted Worldwide", desc: "Serving clients in 50+ countries" },
              { icon: Zap, title: "Fast Recovery", desc: "Average recovery time: 2-4 weeks" },
              { icon: Globe, title: "All Blockchains", desc: "Support for 20+ major networks" },
            ].map((item, index) => (
              <Card 
                key={index} 
                className="p-8 text-center hover:shadow-elegant transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
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
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't Let Scammers Win
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Every minute counts. Start your recovery process today and take back what's yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="https://wa.me/639933632857" target="_blank" rel="noopener noreferrer">
                  Contact Us on WhatsApp
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="bg-card/50 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-card/70"
              >
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
