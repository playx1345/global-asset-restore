import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Shield, Clock, DollarSign, Lock, Users } from "lucide-react";

const faqs = [
  {
    icon: Shield,
    question: "What types of crypto scams can you help recover from?",
    answer:
      "We handle a wide range of crypto-related fraud including romance scams, phishing attacks, fake investment platforms, Ponzi schemes, rug pulls, unauthorized wallet access, SIM swap attacks, and social engineering fraud. Our forensic team has experience tracing funds across all major blockchains.",
  },
  {
    icon: Clock,
    question: "How long does the recovery process typically take?",
    answer:
      "Recovery timelines vary based on case complexity. Simple cases may resolve in 2-4 weeks, while complex international cases can take 2-6 months. We begin our investigation immediately upon engagement and provide regular updates throughout the process. The sooner you contact us after the incident, the better our chances of successful recovery.",
  },
  {
    icon: DollarSign,
    question: "What are your fees and payment structure?",
    answer:
      "We operate on a hybrid fee structure: a modest initial consultation fee to begin the investigation, followed by a success-based recovery fee. This means we're incentivized to achieve the best possible outcome for you. We never charge for cases we believe are unrecoverable, and we provide transparent pricing before any work begins.",
  },
  {
    icon: Lock,
    question: "Is my information kept confidential?",
    answer:
      "Absolutely. Client confidentiality is paramount. All case information is protected by strict NDAs and stored using military-grade encryption. We never share client details publicly and only disclose information to law enforcement when required by law or with your explicit consent.",
  },
  {
    icon: Users,
    question: "Do you work with law enforcement agencies?",
    answer:
      "Yes, we maintain partnerships with law enforcement agencies worldwide including the FBI, Interpol, and various national cybercrime units. When appropriate, we prepare comprehensive forensic reports that can be used as evidence in criminal proceedings, significantly strengthening your case.",
  },
  {
    icon: HelpCircle,
    question: "What information do I need to provide to start a case?",
    answer:
      "To begin, we need: transaction IDs/hashes, wallet addresses involved, screenshots of communications with scammers, any platform or website URLs, dates and amounts of transactions, and a detailed timeline of events. Don't worry if you don't have everything—our team will guide you through the process and help gather necessary evidence.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Blockchain grid background */}
      <div className="absolute inset-0 blockchain-grid opacity-20 pointer-events-none" />

      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] animate-float-slow opacity-10"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--neon-purple)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[250px] h-[250px] rounded-full blur-[80px] animate-float opacity-10"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--neon-cyan)) 0%, transparent 70%)",
            animationDelay: "-3s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Common Questions
            </span>
          </div>
          <h2 className="text-fluid-2xl font-bold mb-4">
            <span className="text-foreground">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-fluid-base max-w-2xl mx-auto">
            Get answers to the most common questions about our crypto recovery
            services and process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 overflow-hidden data-[state=open]:border-primary/30 data-[state=open]:shadow-glow transition-all duration-300"
              >
                <AccordionTrigger className="py-5 hover:no-underline group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="flex-shrink-0 p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-data-[state=open]:bg-primary/20 transition-colors">
                      <faq.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pt-0 pl-[60px] text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Contact our support team
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
