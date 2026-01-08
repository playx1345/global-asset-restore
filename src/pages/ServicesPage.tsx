import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Search, Shield, Users, FileSearch, Heart, TrendingUp, UserCheck, Mail, MessageCircle, ArrowRight, Copy, Camera, Facebook, HardDrive } from "lucide-react";
import serviceRecovery from "@/assets/service-recovery.jpg";
import serviceInvestigation from "@/assets/service-investigation.jpg";
import serviceCompliance from "@/assets/service-compliance.jpg";
import serviceManagement from "@/assets/service-management.jpg";
import serviceForensics from "@/assets/service-forensics.jpg";
import serviceRomanceScam from "@/assets/service-romance-scam.jpg";
import serviceInvestmentFraud from "@/assets/service-investment-fraud.jpg";
import serviceSocialRecovery from "@/assets/service-social-recovery.jpg";
import servicePhishing from "@/assets/service-phishing.jpg";
import servicesHeroImage from "@/assets/services-hero-bg.jpg";
import serviceWhatsapp from "@/assets/service-whatsapp.jpg";
import serviceWhatsappClone from "@/assets/service-whatsapp-clone.jpg";
import serviceInstagram from "@/assets/service-instagram.jpg";
import serviceFacebook from "@/assets/service-facebook.jpg";
import serviceEmail from "@/assets/service-email.jpg";
import serviceData from "@/assets/service-data.jpg";

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
    title: "WhatsApp Account Recovery",
    description: "Expert assistance recovering hacked, suspended, or locked WhatsApp accounts with verification support.",
    image: serviceWhatsapp,
    icon: MessageCircle,
    features: [
      "Account verification assistance",
      "Two-factor authentication recovery",
      "Business account recovery",
      "Chat history restoration guidance",
    ],
  },
  {
    title: "WhatsApp Clone Detection & Recovery",
    description: "Detect unauthorized WhatsApp clones and secure your account from SIM swap and cloning attacks.",
    image: serviceWhatsappClone,
    icon: Copy,
    features: [
      "Clone detection and removal",
      "SIM swap fraud investigation",
      "Device security audit",
      "Prevention measures implementation",
    ],
  },
  {
    title: "Instagram Account Recovery",
    description: "Professional recovery of hacked, disabled, or impersonated Instagram accounts.",
    image: serviceInstagram,
    icon: Camera,
    features: [
      "Hacked account recovery",
      "Disabled account appeals",
      "Impersonation report assistance",
      "Security hardening setup",
    ],
  },
  {
    title: "Facebook Account Recovery",
    description: "Complete Facebook and Meta account recovery including business pages and ad accounts.",
    image: serviceFacebook,
    icon: Facebook,
    features: [
      "Personal account recovery",
      "Business page recovery",
      "Ad account reinstatement",
      "Identity verification support",
    ],
  },
  {
    title: "Email Account Recovery",
    description: "Professional recovery of compromised email accounts across all major providers.",
    image: serviceEmail,
    icon: Mail,
    features: [
      "Gmail/Google account recovery",
      "Microsoft/Outlook recovery",
      "Yahoo and other providers",
      "Password reset assistance",
    ],
  },
  {
    title: "Data Recovery Services",
    description: "Comprehensive digital data recovery from devices, cloud storage, and corrupted files.",
    image: serviceData,
    icon: HardDrive,
    features: [
      "Cloud storage recovery",
      "Device data recovery",
      "Corrupted file restoration",
      "Backup recovery assistance",
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
    title: "Romance Scam Recovery",
    description: "Compassionate support and recovery assistance for victims of romance and dating scams, helping you reclaim your funds and peace of mind.",
    image: serviceRomanceScam,
    icon: Heart,
    features: [
      "Scammer identification and profile tracing",
      "Fund recovery investigation",
      "Evidence documentation for law enforcement",
      "Emotional support resources and guidance",
    ],
  },
  {
    title: "Investment Fraud Assistance",
    description: "Specialized help for victims of fraudulent investment schemes, Ponzi schemes, and fake trading platforms.",
    image: serviceInvestmentFraud,
    icon: TrendingUp,
    features: [
      "Fake platform identification and investigation",
      "Asset tracing and recovery strategies",
      "Regulatory reporting assistance",
      "Legal documentation support",
    ],
  },
  {
    title: "Digital Forensics Consulting",
    description: "Expert analysis to help you understand security breaches, trace unauthorized access, and gather digital evidence for legal proceedings.",
    image: serviceForensics,
    icon: FileSearch,
    features: [
      "Security breach investigation and analysis",
      "Digital evidence collection and preservation",
      "Incident response and root cause analysis",
      "Expert witness testimony for legal proceedings",
    ],
  },
  {
    title: "Social Media Account Recovery",
    description: "Expert help recovering compromised or hacked social media and online accounts with enhanced security measures.",
    image: serviceSocialRecovery,
    icon: UserCheck,
    features: [
      "Account recovery procedures",
      "Identity verification assistance",
      "Security hardening recommendations",
      "Prevention strategies for future attacks",
    ],
  },
  {
    title: "Phishing & Email Fraud Recovery",
    description: "Comprehensive assistance for victims of phishing attacks, business email compromise, and email-based scams.",
    image: servicePhishing,
    icon: Mail,
    features: [
      "Phishing attack analysis",
      "Compromised account recovery",
      "Financial recovery investigation",
      "Security awareness training",
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
        <section className="relative text-primary-foreground py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={servicesHeroImage} 
              alt="Cybersecurity operations center" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/80" />
            {/* Animated mesh overlay */}
            <div className="absolute inset-0 bg-mesh opacity-30" />
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                What We Offer
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text-animated">Services</span>
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Comprehensive solutions for digital asset recovery, account recovery, fraud investigation, and cybersecurity protection
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`animate-fade-in ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-accent/10 rounded-xl">
                        <service.icon className="h-6 w-6 text-accent" />
                      </div>
                      <span className="text-sm font-medium text-accent">Service {String(index + 1).padStart(2, '0')}</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                    
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 group">
                          <div className="p-1 bg-accent/10 rounded-full mt-0.5 group-hover:bg-accent/20 transition-colors">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="action" asChild className="group">
                      <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                  
                  <Card 
                    variant="elevated"
                    className={`overflow-hidden group ${index % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-mesh opacity-10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Card variant="gradient" className="p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
              
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                  Ready to Start?
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Recovery?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our expert team is standing by to help you recover your digital assets. 
                  Contact us today for a free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="action" size="lg" asChild className="group">
                    <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Contact on WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="hover-lift">
                    <a href="/contact">Send Email</a>
                  </Button>
                </div>
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
