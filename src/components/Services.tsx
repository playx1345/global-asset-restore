import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import serviceRecovery from "@/assets/service-recovery.jpg";
import serviceInvestigation from "@/assets/service-investigation.jpg";
import serviceRomanceScam from "@/assets/service-romance-scam.jpg";
import serviceInvestmentFraud from "@/assets/service-investment-fraud.jpg";
import serviceForensics from "@/assets/service-forensics.jpg";
import serviceManagement from "@/assets/service-management.jpg";

const services = [
  {
    title: "Digital Asset Recovery",
    description: "Specialized recovery of lost, stolen, or inaccessible cryptocurrency and digital assets through advanced blockchain forensics.",
    image: serviceRecovery,
  },
  {
    title: "Blockchain Investigation",
    description: "Comprehensive tracing and analysis of blockchain transactions to identify fraud, track stolen funds, and gather evidence.",
    image: serviceInvestigation,
  },
  {
    title: "Romance Scam Recovery",
    description: "Compassionate support and recovery assistance for victims of romance and dating scams.",
    image: serviceRomanceScam,
  },
  {
    title: "Investment Fraud Assistance",
    description: "Specialized help for victims of fraudulent investment schemes, Ponzi schemes, and fake trading platforms.",
    image: serviceInvestmentFraud,
  },
  {
    title: "Digital Forensics Consulting",
    description: "Expert analysis to help you understand security breaches, trace unauthorized access, and gather digital evidence.",
    image: serviceForensics,
  },
  {
    title: "Case Management",
    description: "Personalized support from dedicated agents who guide you through every step of the recovery process.",
    image: serviceManagement,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive solutions for digital asset recovery and fraud protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group hover:shadow-elegant transition-all duration-300 border-border animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
