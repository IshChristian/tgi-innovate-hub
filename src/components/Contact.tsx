import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionHeader from "@/components/SectionHeader";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: `Thank you for reaching out, ${formData.name}. We'll get back to you soon.`,
      });
      setFormData({ name: "", company: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const field = "rounded-xl h-12 border-border bg-[#f8f9fb] focus-visible:ring-accent";
  const channels = [
    { icon: Mail, label: "Email", value: "contact@tiangroupinnovation.com", href: "mailto:contact@tiangroupinnovation.com" },
    { icon: Phone, label: "Phone", value: "+250 788 123 456", href: "tel:+250788123456", note: "Monday to Friday, 9:00–17:00 CAT" },
    { icon: MapPin, label: "Office", value: "Tech City Hub, Floor 4, Kigali, Rwanda" },
  ];

  return (
    <section id="contact" className="section-padding bg-[#f4f6f8]">
      <div className="section-container">
        <SectionHeader
          title="Let's build something together."
          intro="Partnerships, product questions or press — tell us what you have in mind and the team will reply."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact details */}
          <ul className="lg:col-span-4 space-y-8">
            {channels.map(({ icon: Icon, label, value, href, note }) => (
              <li key={label} className="flex gap-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block text-lg font-medium text-primary hover:underline underline-offset-4 break-all">{value}</a>
                  ) : (
                    <p className="mt-1 text-lg font-medium text-primary">{value}</p>
                  )}
                  {note ? <p className="mt-1 text-sm text-muted-foreground">{note}</p> : null}
                </div>
              </li>
            ))}
          </ul>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 rounded-3xl bg-white p-6 sm:p-10 space-y-6 ring-1 ring-black/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-primary">Your name</label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Jean Mugisha" disabled={isSubmitting} className={field} />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-primary">Organisation <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Company or institution" disabled={isSubmitting} className={field} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" disabled={isSubmitting} className={field} />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-primary">Message</label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="What would you like to talk about?" disabled={isSubmitting} className="rounded-xl border-border bg-[#f8f9fb] focus-visible:ring-accent resize-none" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-muted-foreground">We usually reply within two working days.</p>
              <Button type="submit" className="h-12 rounded-full bg-primary hover:bg-primary/90 text-white px-7 text-[15px] font-semibold" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : (<>Send message <Send className="ml-2 h-4 w-4" /></>)}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
