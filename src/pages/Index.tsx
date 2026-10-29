import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Globe, ArrowRight, Coins, SearchCheck, Lock, FileSearch, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "@/components/homepage.css";

const reasons = [
  { icon: Lock, title: "Strict Confidentiality", text: "Your identity and case details are treated with care and shared only as needed for your case." },
  { icon: FileSearch, title: "Evidence-First", text: "Transaction trails and documented findings guide the investigation, not promises." },
  { icon: MessageCircle, title: "Personal Support", text: "Understand your options and stay informed throughout your recovery journey." },
  { icon: Globe, title: "Global Perspective", text: "Support for cross-border digital asset and account recovery cases." },
];
const steps = [
  { title: "Confidential Intake", text: "Tell us what happened and share the evidence you already have." },
  { title: "Case Assessment", text: "We review your situation and explain feasible next steps." },
  { title: "Clear Engagement", text: "Agree on scope, pricing, and expectations before work begins." },
  { title: "Investigation & Recovery", text: "We document findings and pursue lawful recovery options. Outcomes vary by case." },
];

const Index = () => (
  <div className="reference-home min-h-screen">
    <SEO title="SPECTRA TRACE | Digital Asset Recovery & Investigations" description="Confidential digital asset recovery, blockchain investigations, and account recovery. Start your case assessment with SPECTRA TRACE." path="/" />
    <Navigation compact />
    <main>
      <Hero />
      <div className="home-container home-stats" aria-label="Our approach">
        {[ ["Global", "Case support"], ["Discreet", "Client-first approach"], ["Evidence-led", "Investigations"], ["Lawful", "Recovery methods"] ].map(([title, label]) => <div key={title}><strong>{title}</strong><span>{label}</span></div>)}
      </div>
      <section className="home-container home-section">
        <p className="home-section-label">Operations</p><h2>What We Do</h2>
        <p className="home-section-intro">Two specialised practices, one principle: a clean, evidence-led path back to your assets or to the answers you need.</p>
        <div className="home-practices">
          <article className="home-practice"><Coins /><h3>Asset Recovery</h3><p>Crypto, investment fraud, and online scams. We trace funds, organise evidence, and help you pursue lawful recovery.</p><Link to="/services">Explore recovery <ArrowRight size={16} /></Link></article>
          <article className="home-practice"><SearchCheck /><h3>Digital Investigations</h3><p>Account compromise, email fraud, and data loss. Understand the incident, recover access where possible, and strengthen your security.</p><Link to="/services">Explore investigations <ArrowRight size={16} /></Link></article>
        </div>
      </section>
      <section className="home-container home-section"><p className="home-section-label">Why SPECTRA TRACE</p><h2>Why Clients Choose Us</h2><p className="home-section-intro">A careful, transparent approach to your most sensitive matters.</p><div className="home-reasons">{reasons.map(({icon: Icon, title, text}) => <div className="home-reason" key={title}><Icon /><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="home-container home-section"><p className="home-section-label">Process</p><h2>How It Works</h2><p className="home-section-intro">A clear path from your first message to the next step.</p><div className="home-reasons">{steps.map((step, i) => <div className="home-reason" key={step.title}><span className="home-step">0{i + 1}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></section>
      <Testimonials />
      <FAQ />
      <section className="home-container home-section home-final"><Shield className="mx-auto mb-5 text-primary" /><h2>Let’s take the next step.</h2><p className="home-section-intro">Tell us what happened. We’ll help you understand your options.</p><div className="home-actions"><Button asChild className="home-primary"><Link to="/start">Start Your Assessment <ArrowRight /></Link></Button><Button asChild variant="outline" className="home-secondary"><a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">Talk on WhatsApp</a></Button></div></section>
    </main>
    <Footer />
  </div>
);
export default Index;