import { Send, X } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingTelegram = () => {
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
        <div className="animate-fade-in glass-crypto shadow-glow rounded-2xl p-4 max-w-[260px] relative border-primary/20">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close tooltip"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm text-foreground font-medium mb-1">Need help recovering your account?</p>
          <p className="text-xs text-muted-foreground">Chat with our experts on Telegram for immediate assistance.</p>
          {/* Tooltip arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 glass-crypto border-r border-b border-primary/20 rotate-45" />
        </div>
      )}

      {/* Expanded chat options */}
      {isExpanded && (
        <div className="animate-scale-fade-in glass-crypto border-primary/20 shadow-glow rounded-2xl p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2AABEE] to-[#0088cc] flex items-center justify-center shadow-glow">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Recovery Support</p>
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

          <div className="bg-muted/50 rounded-xl p-3 mb-4 border border-border">
            <p className="text-sm text-muted-foreground">
              👋 Hi there! How can we help you today? Click below to start a conversation.
            </p>
          </div>

          <a
            href="https://t.me/spectrace"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#2AABEE] to-[#0088cc] hover:from-[#1FA2E0] hover:to-[#0077B5] text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-glow"
          >
            <Send className="h-5 w-5" />
            Chat on Telegram
          </a>
        </div>
      )}

      {/* Main floating button with neon effect */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          setShowTooltip(false);
        }}
        className={`group relative flex items-center gap-2 bg-gradient-to-r from-[#2AABEE] to-[#0088cc] text-white px-4 py-3.5 rounded-full shadow-glow hover:shadow-[0_0_40px_rgba(42,171,238,0.6)] transition-all duration-300 ${
          isExpanded ? "scale-90" : "hover:scale-105"
        }`}
        aria-label="Contact us on Telegram"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#2AABEE] animate-ping opacity-20" />

        <span className="relative flex items-center gap-2">
          {isExpanded ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline font-medium text-sm">Chat with Us</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default FloatingTelegram;
