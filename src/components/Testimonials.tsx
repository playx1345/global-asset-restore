import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Cryptocurrency Investor",
    content: "I thought my Bitcoin was gone forever after a wallet hack. Global Tech Recovery traced and recovered 95% of my funds. Their professionalism and expertise gave me hope when I had none.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Business Owner",
    content: "After falling victim to a sophisticated scam, I was devastated. Silas and his team worked tirelessly to recover my assets. They kept me informed every step of the way and delivered results beyond my expectations.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Tech Entrepreneur",
    content: "The best in the business. They recovered funds I lost to a fraudulent investment platform within weeks. Their blockchain investigation techniques are cutting-edge. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real people who trusted us with their recovery
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 shadow-elegant border-accent/20 animate-scale-in">
            <div className="flex gap-1 mb-6 justify-center">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl text-center mb-8 text-foreground italic">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <div className="text-center">
              <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
              <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
            </div>
          </Card>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-accent" : "w-2 bg-secondary"
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
