import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Bell, UserCheck, Globe, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal identification information (name, email address, phone number)",
      "Case-related information you provide during consultations",
      "Technical data such as IP address, browser type, and device information",
      "Usage data including pages visited and time spent on our site",
      "Cookies and similar tracking technologies",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "To provide and maintain our recovery services",
      "To communicate with you about your case and our services",
      "To improve our website and user experience",
      "To comply with legal obligations and protect our rights",
      "To send periodic emails regarding your case or other services (with consent)",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We implement industry-standard encryption for data transmission",
      "All sensitive information is stored in secure, access-controlled systems",
      "Regular security audits and vulnerability assessments are conducted",
      "Employee access to personal data is strictly limited and monitored",
      "We maintain comprehensive incident response procedures",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Right to access: Request copies of your personal data",
      "Right to rectification: Request correction of inaccurate data",
      "Right to erasure: Request deletion of your personal data",
      "Right to restrict processing: Request limitation of data processing",
      "Right to data portability: Request transfer of your data",
      "Right to object: Object to processing of your personal data",
    ],
  },
  {
    icon: Globe,
    title: "Cookies & Tracking",
    content: [
      "Essential cookies: Required for basic website functionality",
      "Analytics cookies: Help us understand how visitors use our site",
      "Marketing cookies: Used to deliver relevant advertisements (with consent)",
      "You can control cookie preferences through your browser settings",
      "We respect Do Not Track browser signals",
    ],
  },
  {
    icon: Bell,
    title: "Third-Party Services",
    content: [
      "We may share data with trusted service providers who assist our operations",
      "All third parties are bound by confidentiality agreements",
      "We do not sell your personal information to third parties",
      "Payment processors may collect payment information directly",
      "Analytics providers help us improve our services",
    ],
  },
];

const Privacy = () => {
  const lastUpdated = "February 1, 2026";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-primary-foreground py-24 md:py-32 overflow-hidden">
          {/* Animated mesh overlay */}
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Legal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Privacy <span className="gradient-text-animated">Policy</span>
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <p className="text-sm text-primary-foreground/70 mt-4">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card variant="gradient" className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Commitment to Privacy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At Global Tech Recovery, we are committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing our website or using our services, you consent to the practices described 
                  in this Privacy Policy. If you do not agree with the terms of this policy, please do 
                  not access the site or use our services.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, index) => (
                <Card 
                  key={index} 
                  variant="elevated" 
                  className="p-6 md:p-8 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-xl shrink-0">
                      <section.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card variant="interactive" className="p-8">
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We retain your personal information only for as long as necessary to fulfill the 
                  purposes for which it was collected, including to satisfy legal, accounting, or 
                  reporting requirements.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Case-related information may be retained for up to 7 years after case closure for 
                  legal and compliance purposes. You may request deletion of your data at any time, 
                  subject to legal retention requirements.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly 
                  collect personal information from children. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us immediately so 
                  we can take appropriate action.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 bg-gradient-accent text-accent-foreground relative overflow-hidden">
                <div className="absolute inset-0 shimmer opacity-20" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6" />
                    <h2 className="text-2xl font-bold">Contact Us About Privacy</h2>
                  </div>
                  <p className="text-accent-foreground/90 leading-relaxed mb-6">
                    If you have any questions about this Privacy Policy, wish to exercise your data 
                    rights, or have concerns about how we handle your information, please contact us:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> globaltechrecovery134@gmail.com</p>
                    <p><strong>WhatsApp:</strong> +1 (249) 527-5672</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on 
                this page with an updated revision date. We encourage you to review this Privacy 
                Policy periodically for any changes. Your continued use of our services after any 
                modifications indicates your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
