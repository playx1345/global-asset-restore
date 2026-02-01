import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="relative glass-crypto border border-primary/20 rounded-2xl p-5 md:p-6 shadow-glow">
              {/* Close button */}
              <button
                onClick={handleDecline}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                {/* Icon */}
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 pr-6 md:pr-0">
                  <h3 className="font-semibold text-foreground mb-1">We value your privacy</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies.{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Learn more
                    </a>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 shrink-0 w-full md:w-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDecline}
                    className="flex-1 md:flex-none text-muted-foreground hover:text-foreground"
                  >
                    Decline
                  </Button>
                  <Button
                    variant="neon"
                    size="sm"
                    onClick={handleAccept}
                    className="flex-1 md:flex-none"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
