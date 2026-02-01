import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Clock, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data with zod
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }
    
    // Clear errors on successful validation
    setErrors({});
    
    // Properly encode each field for URL safety to prevent injection
    const encodedName = encodeURIComponent(result.data.name);
    const encodedEmail = encodeURIComponent(result.data.email);
    const encodedSubject = encodeURIComponent(result.data.subject);
    const encodedMessage = encodeURIComponent(result.data.message);
    
    // Create WhatsApp message with properly encoded form data
    const whatsappMessage = `New Contact Form Submission:%0A%0AName: ${encodedName}%0AEmail: ${encodedEmail}%0ASubject: ${encodedSubject}%0AMessage: ${encodedMessage}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/12495275672?text=${whatsappMessage}`, "_blank");
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+1 (249) 527-5672",
      href: "https://wa.me/12495275672",
      subtitle: "Fastest response time",
    },
    {
      icon: Mail,
      title: "Email",
      value: "globaltechrecovery134@gmail.com",
      href: "mailto:globaltechrecovery134@gmail.com",
      subtitle: "We'll respond within 24 hours",
    },
    {
      icon: Clock,
      title: "Available",
      value: "24/7 Support",
      subtitle: "Always here when you need us",
    },
    {
      icon: MapPin,
      title: "Global Service",
      value: "Worldwide Coverage",
      subtitle: "Serving clients in 50+ countries",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-primary-foreground py-24 md:py-32 overflow-hidden">
          {/* Animated mesh overlay */}
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contact <span className="gradient-text-animated">Us</span>
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Get in touch with our team for a free consultation
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card variant="gradient" className="p-8 animate-fade-in relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground mb-6">Fill out the form and we'll get back to you shortly.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        placeholder="John Doe"
                        className={`mt-2 transition-all duration-300 focus:shadow-glow ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    
                    <div className="group">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={255}
                        placeholder="john@example.com"
                        className={`mt-2 transition-all duration-300 focus:shadow-glow ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                    
                    <div className="group">
                      <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        maxLength={200}
                        placeholder="Recovery Inquiry"
                        className={`mt-2 transition-all duration-300 focus:shadow-glow ${errors.subject ? "border-destructive" : ""}`}
                      />
                      {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                    </div>
                    
                    <div className="group">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={2000}
                        placeholder="Tell us about your situation..."
                        rows={6}
                        className={`mt-2 transition-all duration-300 focus:shadow-glow ${errors.message ? "border-destructive" : ""}`}
                      />
                      {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                    </div>
                    
                    <Button type="submit" variant="action" size="lg" className="w-full group">
                      <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8 stagger-children">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                    Contact Information
                  </span>
                  <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    We're here to help 24/7. Reach out through any of these channels and our team 
                    will respond promptly to assist you with your recovery needs.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card 
                      key={index} 
                      variant="interactive" 
                      className="p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                          <method.icon className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{method.title}</h3>
                          {method.href ? (
                            <a 
                              href={method.href} 
                              target={method.href.startsWith("http") ? "_blank" : undefined}
                              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-accent hover:underline link-underline"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{method.value}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.subtitle}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-gradient-accent text-accent-foreground relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-30" />
                  
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Emergency Case?</h3>
                    <p className="mb-4 text-accent-foreground/90">
                      For urgent recovery needs, contact us immediately on WhatsApp
                    </p>
                    <Button variant="hero" asChild className="w-full bg-background/20 hover:bg-background/30">
                      <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Contact Now
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
