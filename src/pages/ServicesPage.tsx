import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Search, Shield, Users } from "lucide-react";
import serviceRecovery from "@/assets/service-recovery.jpg";
import serviceInvestigation from "@/assets/service-investigation.jpg";
import serviceCompliance from "@/assets/service-compliance.jpg";
import serviceManagement from "@/assets/service-management.jpg";

const services = [
  {
    title: "Digital Asset Recovery",
    description: "Specialized recovery of lost, stolen, or inaccessible cryptocurrency and digital assets.",
    image: serviceRecovery,
    icon: Shield,
    features: [
      "Wallet recovery and key restoration",
      "Exchange account recovery",
      "Smart contract fund retrieval",
      "Lost password and seed phrase recovery",
    ],
  },
  {
    title: "Blockchain Investigation",
    description: "Comprehensive tracing and analysis of blockchain transactions to identify fraud.",
    image: serviceInvestigation,
    icon: Search,
    features: [
      "Transaction tracing across multiple chains",
      "Fraudulent address identification",
      "Evidence gathering for legal proceedings",
      "Real-time monitoring and alerts",
    ],
  },
  {
    title: "Compliance & Anti-Fraud Clearance",
    description: "Expert clearance services and fraud prevention strategies for digital assets.",
    image: serviceCompliance,
    icon: CheckCircle2,
    features: [
      "KYC/AML compliance verification",
      "Risk assessment and mitigation",
      "Fraud prevention protocols",
      "Regulatory guidance and support",
    ],
  },
  {
    title: "Personalized Case Management",
    description: "Dedicated support from assigned agents throughout your recovery journey.",
    image: serviceManagement,
    icon: Users,
    features: [
      "24/7 dedicated case manager",
      "Regular progress updates",
      "Secure document portal",
      "Direct communication channels",
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-primary-foreground/90">
                Comprehensive solutions for digital asset recovery and blockchain security
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`animate-fade-in ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <service.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="default" asChild>
                      <a href="https://wa.me/639933632857" target="_blank" rel="noopener noreferrer">
                        Get Started
                      </a>
                    </Button>
                  </div>
                  
                  <Card className={`overflow-hidden shadow-elegant animate-scale-in ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover aspect-video"
                    />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="p-12 text-center shadow-elegant max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Recovery?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our expert team is standing by to help you recover your digital assets. 
                Contact us today for a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="action" size="lg" asChild>
                  <a href="https://wa.me/639933632857" target="_blank" rel="noopener noreferrer">
                    Contact on WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact">Send Email</a>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
