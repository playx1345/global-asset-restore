import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Users, Target, Award } from "lucide-react";
import aboutHeroImage from "@/assets/about-hero-bg.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative text-primary-foreground py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={aboutHeroImage} 
              alt="Global Tech Recovery team" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-accent/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Global Tech Recovery</h1>
              <p className="text-xl text-primary-foreground/90">
                Leading the way in digital asset recovery with expertise, empathy, and results
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  At Global Tech Recovery, we believe that no one should lose their hard-earned digital assets to fraud, technical failures, or sophisticated scams. Our mission is to restore what matters most—your financial security and peace of mind.
                </p>
                <p className="text-lg text-muted-foreground">
                  We combine cutting-edge blockchain forensics, legal expertise, and compassionate client care to deliver results that exceed expectations.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 animate-slide-up">
                {[
                  { icon: Shield, label: "Trustworthy", desc: "Bank-grade security" },
                  { icon: Users, label: "Empathetic", desc: "We understand your stress" },
                  { icon: Target, label: "Results-Driven", desc: "98% success rate" },
                  { icon: Award, label: "Professional", desc: "Expert team" },
                ].map((item, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-elegant transition-shadow">
                    <item.icon className="h-10 w-10 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Founder Section */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12 shadow-elegant animate-scale-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Meet Our Founder</h2>
                  <p className="text-muted-foreground">Leading with expertise and integrity</p>
                </div>
                
                <div className="space-y-4 text-center">
                  <h3 className="text-2xl font-bold">Silas Tomson</h3>
                  <p className="text-accent font-medium">Founder & Lead Recovery Specialist</p>
                  
                  <div className="max-w-2xl mx-auto text-muted-foreground space-y-4 mt-6">
                    <p>
                      With over a decade of experience in blockchain technology and financial forensics, Silas founded Global Tech Recovery to help victims of digital asset theft and fraud reclaim what's rightfully theirs.
                    </p>
                    <p>
                      His expertise spans cryptocurrency tracing, smart contract analysis, and international financial law. Under his leadership, the team has successfully recovered millions in digital assets for clients worldwide.
                    </p>
                    <p>
                      Silas believes in transparency, results, and treating every case with the urgency and care it deserves.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
              <div className="max-w-3xl mx-auto space-y-8">
                {[
                  { year: "2019", title: "Foundation", desc: "Global Tech Recovery was founded with a mission to help crypto fraud victims" },
                  { year: "2021", title: "Milestone", desc: "Successfully recovered $1M in digital assets for clients worldwide" },
                  { year: "2023", title: "Expansion", desc: "Expanded team and services to cover all major blockchains" },
                  { year: "2024", title: "Today", desc: "Over $2M recovered with a 98% success rate and growing" },
                ].map((milestone, index) => (
                  <div key={index} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex-shrink-0 w-20 font-bold text-accent text-xl">{milestone.year}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
