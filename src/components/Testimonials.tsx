import { Card } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
  {
    name: "James Thompson",
    role: "Day Trader",
    content:
      "Lost access to my exchange account with significant funds inside. Global Tech Recovery helped navigate the recovery process and I got everything back within 3 weeks. Incredible service!",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "NFT Collector",
    content:
      "My NFT collection was stolen through a phishing attack. I thought it was hopeless, but this team tracked down the assets and helped me recover most of my valuable pieces. Forever grateful!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Blockchain grid background */}
      <div className="absolute inset-0 blockchain-grid opacity-20 pointer-events-none" />
      
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-fluid-2xl font-bold mb-4 opacity-0 animate-fade-in">
            <span className="text-foreground">What Our </span>
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p
            className="text-muted-foreground text-fluid-base max-w-2xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Real stories from real people who trusted us with their recovery
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/50 hover:shadow-neon-cyan transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-foreground hover:bg-primary/20 hover:border-primary/50 hover:shadow-neon-cyan transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <Card
                    variant="neon"
                    className={`p-8 md:p-12 relative overflow-hidden transition-all duration-500 ${
                      selectedIndex === index 
                        ? "opacity-100 scale-100" 
                        : "opacity-50 scale-95"
                    }`}
                  >
                    {/* Decorative quote mark with neon glow */}
                    <Quote className="absolute top-6 left-6 h-16 w-16 text-primary/10" />
                    
                    {/* Floating orb decoration */}
                    <div 
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 animate-float-slow"
                      style={{ background: "radial-gradient(circle, hsl(var(--neon-cyan)) 0%, transparent 70%)" }}
                    />
                    <div 
                      className="absolute -bottom-20 -left-20 w-32 h-32 rounded-full blur-3xl opacity-15 animate-float"
                      style={{ background: "radial-gradient(circle, hsl(var(--neon-purple)) 0%, transparent 70%)", animationDelay: "-2s" }}
                    />

                    {/* Star Rating with glow */}
                    <div className="flex gap-1 mb-6 justify-center">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-primary text-primary animate-glow-pulse"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-center mb-8 text-foreground italic leading-relaxed relative z-10">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary via-neon-purple to-neon-green p-[2px] shadow-neon-cyan">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                          <span className="text-xl font-bold gradient-text">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators with neon effect */}
          <div className="flex justify-center gap-3 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                  index === selectedIndex
                    ? "w-10 bg-gradient-to-r from-primary to-neon-purple shadow-neon-cyan"
                    : "w-2.5 bg-muted hover:bg-muted-foreground/50"
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
