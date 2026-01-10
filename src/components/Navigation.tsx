import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong shadow-glow border-b border-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with Glow */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg lg:text-xl z-50 group"
          >
            <Shield className="h-6 w-6 lg:h-7 lg:w-7 text-primary group-hover:scale-110 transition-all duration-300 icon-glow" />
            <span className="text-foreground group-hover:text-primary transition-colors duration-300">
              Global Tech Recovery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
                {/* Animated neon underline */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                    isActive(item.path) 
                      ? "w-1/2 bg-gradient-to-r from-primary to-neon-purple shadow-neon-cyan" 
                      : "w-0 bg-primary"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/portal">Portal</Link>
                </Button>
                <Button variant="neon" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-muted-foreground hover:text-primary"
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="neon" size="sm" className="gap-2" asChild>
                  <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" />
                    Start Recovery
                  </a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors z-50 ${
              isOpen
                ? "text-foreground"
                : "text-foreground hover:bg-primary/10"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`lg:hidden fixed inset-0 glass-strong backdrop-blur-2xl transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background mesh */}
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 relative z-10">
          {/* Mobile Nav Links */}
          <div className="flex flex-col items-center gap-2 w-full max-w-sm">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`w-full text-center py-4 text-lg font-medium rounded-xl transition-all duration-500 ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10 shadow-glow"
                    : "text-foreground hover:bg-primary/5 hover:text-primary"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(-20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Actions */}
          <div
            className="flex flex-col items-center gap-3 w-full max-w-sm mt-8 pt-8 border-t border-border"
            style={{
              transitionDelay: isOpen ? "375ms" : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(-20px)",
              opacity: isOpen ? 1 : 0,
              transition: "all 0.5s ease",
            }}
          >
            {user ? (
              <>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link to="/portal" onClick={() => setIsOpen(false)}>
                    Portal
                  </Link>
                </Button>
                <Button
                  variant="neon"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button variant="neon" className="w-full gap-2" size="lg" asChild>
                  <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-5 w-5" />
                    Start Recovery
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;