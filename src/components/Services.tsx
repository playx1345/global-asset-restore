import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import serviceRecovery from "@/assets/service-recovery.jpg";
import serviceInvestigation from "@/assets/service-investigation.jpg";
import serviceRomanceScam from "@/assets/service-romance-scam.jpg";
import serviceInvestmentFraud from "@/assets/service-investment-fraud.jpg";
import serviceForensics from "@/assets/service-forensics.jpg";
import serviceManagement from "@/assets/service-management.jpg";

const services = [
  {
    title: "Digital Asset Recovery",
    description:
      "Specialized recovery of lost, stolen, or inaccessible cryptocurrency and digital assets through advanced blockchain forensics.",
    image: serviceRecovery,
  },
  {
    title: "Blockchain Investigation",
    description:
      "Comprehensive tracing and analysis of blockchain transactions to identify fraud, track stolen funds, and gather evidence.",
    image: serviceInvestigation,
  },
  {
    title: "Romance Scam Recovery",
    description:
      "Compassionate support and recovery assistance for victims of romance and dating scams.",
    image: serviceRomanceScam,
  },
  {
    title: "Investment Fraud Assistance",
    description:
      "Specialized help for victims of fraudulent investment schemes, Ponzi schemes, and fake trading platforms.",
    image: serviceInvestmentFraud,
  },
  {
    title: "Digital Forensics Consulting",
    description:
      "Expert analysis to help you understand security breaches, trace unauthorized access, and gather digital evidence.",
    image: serviceForensics,
  },
  {
    title: "Case Management",
    description:
      "Personalized support from dedicated agents who guide you through every step of the recovery process.",
    image: serviceManagement,
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-fluid-2xl font-bold mb-4 opacity-0 animate-fade-in">
            Our Services
          </h2>
          <p
            className="text-muted-foreground text-fluid-base max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Comprehensive solutions for digital asset recovery and fraud protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="interactive"
              className="overflow-hidden group opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div
          className="text-center opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <Button variant="default" size="lg" asChild className="gap-2">
            <Link to="/services">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
