import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-primary-foreground/90">
                Get in touch with our team for a free consultation
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <Card className="p-8 shadow-elegant animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      placeholder="John Doe"
                      className={`mt-2 ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={255}
                      placeholder="john@example.com"
                      className={`mt-2 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      maxLength={200}
                      placeholder="Recovery Inquiry"
                      className={`mt-2 ${errors.subject ? "border-destructive" : ""}`}
                    />
                    {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={2000}
                      placeholder="Tell us about your situation..."
                      rows={6}
                      className={`mt-2 ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>
                  
                  <Button type="submit" variant="action" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help 24/7. Reach out through any of these channels and our team 
                    will respond promptly to assist you with your recovery needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 hover:shadow-elegant transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">WhatsApp</h3>
                        <a 
                          href="https://wa.me/12495275672" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          +1 (249) 527-5672
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Fastest response time
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-elegant transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-accent">support@globaltechrecovery.com</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-elegant transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Available</h3>
                        <p className="text-muted-foreground">24/7 Support</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Always here when you need us
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-elegant transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Global Service</h3>
                        <p className="text-muted-foreground">Worldwide Coverage</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Serving clients in 50+ countries
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 bg-gradient-accent text-accent-foreground">
                  <h3 className="font-bold text-lg mb-2">Emergency Case?</h3>
                  <p className="mb-4 text-accent-foreground/90">
                    For urgent recovery needs, contact us immediately on WhatsApp
                  </p>
                  <Button variant="hero" asChild className="w-full bg-background/20 hover:bg-background/30">
                    <a href="https://wa.me/12495275672" target="_blank" rel="noopener noreferrer">
                      Contact Now
                    </a>
                  </Button>
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
