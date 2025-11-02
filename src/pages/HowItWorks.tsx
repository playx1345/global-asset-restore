import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileSearch, Wallet, CheckCircle2, Shield, DollarSign } from "lucide-react";
import howItWorksHeroImage from "@/assets/how-it-works-hero-bg.jpg";
import howItWorksCtaImage from "@/assets/how-it-works-cta-bg.jpg";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    icon: MessageCircle,
    description: "Contact us via WhatsApp or email. Share your case details and we'll assess your situation within 24 hours.",
    details: ["Free consultation", "Confidential review", "Quick response time"],
  },
  {
    number: "02",
    title: "Case Analysis",
    icon: FileSearch,
    description: "Our experts analyze your case using advanced blockchain forensics to determine recovery feasibility.",
    details: ["Blockchain tracing", "Evidence gathering", "Recovery plan development"],
  },
  {
    number: "03",
    title: "Fee Agreement",
    icon: DollarSign,
    description: "We present transparent pricing with no hidden costs. You only pay when we successfully recover your assets.",
    details: ["Success-based fees", "Transparent pricing", "No upfront charges"],
  },
  {
    number: "04",
    title: "Recovery Process",
    icon: Wallet,
    description: "Our team executes the recovery plan while keeping you informed with regular updates throughout the process.",
    details: ["Real-time updates", "Secure protocols", "Expert execution"],
  },
  {
    number: "05",
    title: "Asset Return",
    icon: CheckCircle2,
    description: "Once recovered, your assets are securely transferred to your designated wallet with full documentation.",
    details: ["Secure transfer", "Complete documentation", "Post-recovery support"],
  },
];

const features = [
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your data and recovered assets are protected with military-grade encryption",
  },
  {
    icon: MessageCircle,
    title: "24/7 Support",
    description: "Dedicated case managers available around the clock for your peace of mind",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Process",
    description: "Clear communication and regular updates throughout your recovery journey",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative text-primary-foreground py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={howItWorksHeroImage} 
              alt="Recovery process collaboration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
              <p className="text-xl text-primary-foreground/90">
                Our proven 5-step process for successful digital asset recovery
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-16 top-24 w-0.5 h-20 bg-accent/30" />
                  )}
                  
                  <Card className="p-8 shadow-elegant hover:shadow-glow transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-32 h-32 bg-gradient-accent rounded-full flex items-center justify-center">
                            <step.icon className="h-12 w-12 text-accent-foreground" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-background">
                            {step.number}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground text-lg mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, dIndex) => (
                            <li key={dIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Process?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-8 text-center hover:shadow-elegant transition-shadow animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative max-w-3xl mx-auto overflow-hidden rounded-lg shadow-elegant">
              <div className="absolute inset-0 z-0">
                <img 
                  src={howItWorksCtaImage} 
                  alt="Partnership and trust" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/80" />
              </div>
              <div className="relative z-10 p-12 text-center text-primary-foreground">
                <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Recovery?</h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Don't wait another day. Contact us now for a free consultation and take the first step 
                  toward recovering your digital assets.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                    Start Free Consultation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
