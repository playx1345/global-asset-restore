import { Link } from "react-router-dom";
import { Shield, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-card text-foreground overflow-hidden border-t border-border">
      {/* Gradient decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Blockchain grid pattern */}
      <div className="absolute inset-0 blockchain-grid opacity-10 pointer-events-none" />
      
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <Shield className="h-7 w-7 text-primary group-hover:scale-110 transition-all duration-300 icon-glow" />
              <span className="font-bold text-xl">Global Tech Recovery</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional digital asset recovery and blockchain investigation services.
              Trusted by clients worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "How It Works", path: "/how-it-works" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 link-neon"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Digital Asset Recovery</li>
              <li>Blockchain Investigation</li>
              <li>Compliance & Anti-Fraud</li>
              <li>Case Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://wa.me/12344528385"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>+1 (234) 452-8385</span>
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span>Send us a message</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Global Tech Recovery. All rights reserved.
          </p>

          {/* Back to top button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;