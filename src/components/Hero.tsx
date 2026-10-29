import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/home-security-bg.jpg";

const Hero = () => (
  <section className="home-hero">
    <img src={heroImage} alt="Blue security shield and blockchain tracing grid" width={1600} height={1008} className="home-hero-image" fetchPriority="high" />
    <div className="home-container home-hero-content">
      <div className="home-hero-copy">
        <span className="home-eyebrow">● DISCREET · ETHICAL · EVIDENCE-FIRST</span>
        <h1>SPECTRA TRACE.<br /><span className="home-highlight">Your path back to<br />what matters.</span><br />Let’s handle your case.</h1>
        <p>Digital asset recovery and security investigations — discreet, focused, and evidence-led. Clear scope and pricing before work begins.</p>
        <div className="home-actions">
          <Button asChild className="home-primary"><Link to="/start">Start <ArrowRight /></Link></Button>
          <Button asChild variant="outline" className="home-secondary"><Link to="/services">Explore Investigations</Link></Button>
        </div>
        <div className="home-tags"><span>Clear, upfront scope</span><span>Lawful recovery only</span><span>Confidential intake</span></div>
      </div>
    </div>
  </section>
);

export default Hero;