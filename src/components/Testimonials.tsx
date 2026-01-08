import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Cryptocurrency Investor",
    content:
      "I thought my Bitcoin was gone forever after a wallet hack. Global Tech Recovery traced and recovered 95% of my funds. Their professionalism and expertise gave me hope when I had none.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Business Owner",
    content:
      "After falling victim to a sophisticated scam, I was devastated. Silas and his team worked tirelessly to recover my assets. They kept me informed every step of the way and delivered results beyond my expectations.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Tech Entrepreneur",
    content:
      "The best in the business. They recovered funds I lost to a fraudulent investment platform within weeks. Their blockchain investigation techniques are cutting-edge. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleIndicatorClick = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-fluid-2xl font-bold mb-4 opacity-0 animate-fade-in">
            What Our Clients Say
          </h2>
          <p
            className="text-muted-foreground text-fluid-base max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Real stories from real people who trusted us with their recovery
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card
            variant="elevated"
            className="p-8 md:p-12 border-accent/20 relative overflow-hidden opacity-0 animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Decorative quote mark */}
            <Quote className="absolute top-6 left-6 h-16 w-16 text-accent/10" />

            <div
              className={`transition-all duration-300 ${
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6 justify-center">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                    style={{
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-center mb-8 text-foreground italic leading-relaxed relative z-10">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-accent flex items-center justify-center">
                  <span className="text-lg font-bold text-accent-foreground">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <div
                key={currentIndex}
                className="h-full bg-accent rounded-r-full animate-progress-fill"
              />
            </div>
          </Card>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  index === currentIndex
                    ? "w-10 bg-accent shadow-glow"
                    : "w-2.5 bg-secondary hover:bg-secondary/80"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
