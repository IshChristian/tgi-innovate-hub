import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name.trim(), company: formData.company.trim() || null,
      email: formData.email.trim(), message: formData.message.trim(),
    });
    setIsSubmitting(false);
    if (error) {
      toast({ title: "Message not sent", description: "Please try again later or email us directly.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent", description: "Thank you. Our team will get back to you." });
    setFormData({ name: "", company: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-muted/40 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">Let's Shape the Future Together</h2>
          <p className="text-xl text-muted-foreground">
            Ready to scale or automate your business? Get in touch with our engineering team.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Contact form (Column span 7) */}
          <Card className="lg:col-span-7 overflow-hidden rounded-2xl border border-border/80 bg-background/60 backdrop-blur-sm shadow-sm animate-scale-in">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-primary">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Jean Doe"
                      disabled={isSubmitting}
                      className="rounded-xl h-11 border-border bg-background focus:border-accent/50 focus:ring-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-semibold text-primary">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Enterprise Ltd"
                      disabled={isSubmitting}
                      className="rounded-xl h-11 border-border bg-background focus:border-accent/50 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. contact@company.com"
                    disabled={isSubmitting}
                    className="rounded-xl h-11 border-border bg-background focus:border-accent/50 focus:ring-accent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-primary">
                    Project Requirements / Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Outline your project timeline, requirements, or general inquiries..."
                    disabled={isSubmitting}
                    className="rounded-xl border-border bg-background focus:border-accent/50 focus:ring-accent resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-xl transition-all duration-300 shadow-md h-11"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4.5 w-4.5 border-b-2 border-white"></span>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Inquiries
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact information (Column span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            
            <Card className="border border-border/80 bg-background/60 backdrop-blur-sm shadow-sm hover:border-accent/30 transition-all flex-grow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-accent/10 border border-accent/25 rounded-xl shrink-0">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base mb-1">Email Correspondence</h3>
                  <p className="text-muted-foreground text-sm">Our technical managers monitor inbox channels daily.</p>
                  <a href="mailto:contact@tiangroupinnovation.com" className="text-accent font-semibold text-sm hover:underline block mt-2">
                    contact@tiangroupinnovation.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-background/60 backdrop-blur-sm shadow-sm hover:border-accent/30 transition-all flex-grow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-accent/10 border border-accent/25 rounded-xl shrink-0">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base mb-1">Direct Call Support</h3>
                  <p className="text-muted-foreground text-sm">Available Monday to Friday, 9:00 AM - 5:00 PM CAT.</p>
                  <a href="tel:+250788123456" className="text-accent font-semibold text-sm hover:underline block mt-2">
                    +250 788 123 456
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/80 bg-background/60 backdrop-blur-sm shadow-sm hover:border-accent/30 transition-all flex-grow">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 bg-accent/10 border border-accent/25 rounded-xl shrink-0">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base mb-1">Visit Headquarters</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                    Tech City Hub, Floor 4<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
