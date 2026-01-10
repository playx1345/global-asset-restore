import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Search,
  FileCheck,
  Award
} from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Romance Scam Recovery",
    category: "Romance Scam",
    client: "Sarah M.",
    location: "United States",
    duration: "6 weeks",
    beforeAmount: 187500,
    recoveredAmount: 162000,
    recoveryRate: 86,
    challenge: "Client was manipulated into transferring Bitcoin to a fake crypto trading platform by someone they met on a dating app. Funds were moved through multiple wallets across different blockchains.",
    solution: "Our team traced the funds across 47 wallet addresses using advanced blockchain forensics. We identified the exchange endpoints and worked with law enforcement in 3 countries to freeze and recover the assets.",
    timeline: [
      { phase: "Initial Investigation", days: 5 },
      { phase: "Blockchain Tracing", days: 12 },
      { phase: "Legal Coordination", days: 18 },
      { phase: "Asset Recovery", days: 7 }
    ],
    testimonial: "I thought I'd never see my money again. Global Tech Recovery gave me hope when no one else could help.",
    image: "romance"
  },
  {
    id: 2,
    title: "Investment Fraud Case",
    category: "Investment Fraud",
    client: "Michael T.",
    location: "United Kingdom",
    duration: "8 weeks",
    beforeAmount: 425000,
    recoveredAmount: 389000,
    recoveryRate: 91,
    challenge: "High-net-worth individual lost funds to a sophisticated fake investment platform promising guaranteed returns. The scammers used professional-looking websites and fake trading dashboards.",
    solution: "Comprehensive forensic analysis revealed connections to a known fraud network. We partnered with international cybercrime units and leveraged our network of crypto compliance contacts to trace and recover funds from multiple exchanges.",
    timeline: [
      { phase: "Case Assessment", days: 3 },
      { phase: "Deep Forensics", days: 20 },
      { phase: "Exchange Coordination", days: 25 },
      { phase: "Fund Recovery", days: 8 }
    ],
    testimonial: "The professionalism and expertise of the team was outstanding. They recovered over 90% of what I thought was lost forever.",
    image: "investment"
  },
  {
    id: 3,
    title: "Phishing Attack Recovery",
    category: "Phishing",
    client: "David & Lisa K.",
    location: "Australia",
    duration: "4 weeks",
    beforeAmount: 78000,
    recoveredAmount: 71500,
    recoveryRate: 92,
    challenge: "Couple clicked on a fake MetaMask email and unknowingly gave access to their wallet containing multiple crypto assets. Funds were drained within minutes.",
    solution: "Quick response was critical. We immediately began tracing the stolen assets and identified they were being laundered through DeFi protocols. Our team worked around the clock to freeze funds before they could be converted.",
    timeline: [
      { phase: "Emergency Response", days: 1 },
      { phase: "Asset Tracking", days: 8 },
      { phase: "Protocol Coordination", days: 12 },
      { phase: "Recovery Execution", days: 7 }
    ],
    testimonial: "We contacted Global Tech Recovery within hours of the theft. Their rapid response was crucial to getting our crypto back.",
    image: "phishing"
  },
  {
    id: 4,
    title: "Exchange Hack Victim",
    category: "Exchange Fraud",
    client: "Anonymous Corporate Client",
    location: "Singapore",
    duration: "12 weeks",
    beforeAmount: 1250000,
    recoveredAmount: 980000,
    recoveryRate: 78,
    challenge: "Corporate treasury funds held on an exchange that was hacked. The company's assets were among those stolen in a large-scale security breach affecting thousands of users.",
    solution: "We led a coordinated effort with other victims and worked directly with law enforcement agencies. Our blockchain analysis helped identify mixer services and destination wallets, contributing to a larger recovery operation.",
    timeline: [
      { phase: "Coalition Building", days: 14 },
      { phase: "Forensic Investigation", days: 30 },
      { phase: "Legal Proceedings", days: 28 },
      { phase: "Asset Distribution", days: 12 }
    ],
    testimonial: "Global Tech Recovery's expertise in corporate-level crypto recovery was invaluable. They navigated complex legal frameworks across multiple jurisdictions.",
    image: "exchange"
  }
];

const overallStats = [
  { label: "Total Recovered", value: 2100000, prefix: "$", suffix: "+" },
  { label: "Success Rate", value: 94, suffix: "%" },
  { label: "Cases Solved", value: 850, suffix: "+" },
  { label: "Countries Served", value: 45, suffix: "+" }
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 blockchain-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 border-neon-cyan/50 text-neon-cyan px-4 py-1.5">
              <Award className="w-4 h-4 mr-2" />
              Proven Track Record
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text-animated">Success Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Real case studies from clients we've helped recover their crypto assets. 
              Each story represents hope restored and funds returned.
            </p>
          </div>
          
          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {overallStats.map((stat, index) => (
              <Card key={index} variant="neon" className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
                    {stat.prefix}
                    <AnimatedCounter end={stat.value} duration={2000} />
                    {stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-24">
            {caseStudies.map((caseStudy, index) => (
              <div key={caseStudy.id} className="relative">
                {/* Case Study Card */}
                <Card variant="crypto" className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Left: Details */}
                      <div className="p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-6">
                          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                            {caseStudy.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {caseStudy.location}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                          {caseStudy.title}
                        </h2>
                        
                        <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-neon-cyan" />
                            {caseStudy.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-neon-green" />
                            {caseStudy.client}
                          </span>
                        </div>
                        
                        {/* Before/After Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                            <AlertTriangle className="w-5 h-5 text-destructive mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Lost</p>
                            <p className="text-lg font-bold text-destructive">
                              ${caseStudy.beforeAmount.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-neon-green/10 border border-neon-green/20">
                            <CheckCircle2 className="w-5 h-5 text-neon-green mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Recovered</p>
                            <p className="text-lg font-bold text-neon-green">
                              ${caseStudy.recoveredAmount.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                            <TrendingUp className="w-5 h-5 text-neon-cyan mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Rate</p>
                            <p className="text-lg font-bold text-neon-cyan">
                              {caseStudy.recoveryRate}%
                            </p>
                          </div>
                        </div>
                        
                        {/* Challenge & Solution */}
                        <div className="space-y-4 mb-8">
                          <div>
                            <h4 className="text-sm font-semibold text-neon-purple mb-2 flex items-center gap-2">
                              <Search className="w-4 h-4" />
                              The Challenge
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {caseStudy.challenge}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-neon-green mb-2 flex items-center gap-2">
                              <FileCheck className="w-4 h-4" />
                              Our Solution
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {caseStudy.solution}
                            </p>
                          </div>
                        </div>
                        
                        {/* Testimonial */}
                        <blockquote className="relative pl-4 border-l-2 border-neon-cyan/50 italic text-muted-foreground">
                          "{caseStudy.testimonial}"
                          <footer className="mt-2 text-sm font-semibold text-foreground not-italic">
                            — {caseStudy.client}
                          </footer>
                        </blockquote>
                      </div>
                      
                      {/* Right: Timeline Visual */}
                      <div className="bg-card/50 p-8 md:p-12 border-l border-border/50">
                        <h4 className="text-lg font-semibold mb-8 flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-neon-cyan" />
                          Recovery Timeline
                        </h4>
                        
                        <div className="space-y-6">
                          {caseStudy.timeline.map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="relative">
                              <div className="flex items-start gap-4">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center text-neon-cyan font-bold text-sm">
                                    {phaseIndex + 1}
                                  </div>
                                  {phaseIndex < caseStudy.timeline.length - 1 && (
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
                                  )}
                                </div>
                                <div className="flex-1 pt-2">
                                  <p className="font-medium">{phase.phase}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {phase.days} days
                                  </p>
                                </div>
                                <div className="pt-2">
                                  <CheckCircle2 className="w-5 h-5 text-neon-green" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-12">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Recovery Progress</span>
                            <span className="text-neon-green font-semibold">{caseStudy.recoveryRate}% Complete</span>
                          </div>
                          <div className="h-3 bg-background rounded-full overflow-hidden border border-border">
                            <div 
                              className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-green rounded-full transition-all duration-1000"
                              style={{ width: `${caseStudy.recoveryRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Decorative Element */}
                {index < caseStudies.length - 1 && (
                  <div className="flex justify-center py-8">
                    <div className="w-px h-16 bg-gradient-to-b from-neon-cyan/50 via-neon-purple/50 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 blockchain-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />
        
        <div className="container relative z-10">
          <Card variant="glow" className="max-w-4xl mx-auto text-center p-12">
            <CardContent className="p-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text-animated">Ready to Recover Your Assets?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every case is unique, but our proven track record speaks for itself. 
                Start your recovery journey today with a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="neon" size="lg" asChild>
                  <Link to="/contact">
                    Start Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/how-it-works">
                    Learn Our Process
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
