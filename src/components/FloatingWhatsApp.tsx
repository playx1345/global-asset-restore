import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      {showTooltip && !isExpanded && (
        <div className="animate-fade-in bg-background border border-border shadow-elegant rounded-2xl p-4 max-w-[260px] relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close tooltip"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm text-foreground font-medium mb-1">Need help recovering your account?</p>
          <p className="text-xs text-muted-foreground">Chat with our experts on WhatsApp for immediate assistance.</p>
          {/* Tooltip arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-background border-r border-b border-border rotate-45" />
        </div>
      )}

      {/* Expanded chat options */}
      {isExpanded && (
        <div className="animate-scale-fade-in bg-background border border-border shadow-elegant rounded-2xl p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Recovery Support</p>
                <p className="text-xs text-muted-foreground">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close chat options"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-muted/50 rounded-xl p-3 mb-4">
            <p className="text-sm text-muted-foreground">
              👋 Hi there! How can we help you today? Click below to start a conversation.
            </p>
          </div>

          <a
            href="https://wa.me/12495275672?text=Hi%2C%20I%20need%20help%20with%20account%20recovery"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Start Chat
          </a>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          setShowTooltip(false);
        }}
        className={`group flex items-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isExpanded ? "scale-90" : "hover:scale-105"
        }`}
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        
        <span className="relative flex items-center gap-2">
          {isExpanded ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline font-medium text-sm">Chat with Us</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
