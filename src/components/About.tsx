import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Cpu, Globe2, Lightbulb } from "lucide-react";

const About = () => {
  const handleContactClick = () => {
    const target = document.getElementById("contact");
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-muted/40 to-background relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Visual Metric Card */}
          <div className="lg:col-span-5 relative h-[380px] md:h-[460px] rounded-2xl overflow-hidden shadow-xl border border-border bg-gradient-to-tr from-primary to-primary/80 animate-slide-in-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(175,100,36,0.15),transparent_60%)]"></div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/15 px-2.5 py-1 rounded">Established 2023</span>
                <h3 className="text-xl font-bold">Tian Group Innovation</h3>
              </div>

              <div className="text-center py-6">
                <span className="text-7xl font-extrabold text-accent block">3+</span>
                <span className="text-lg font-medium text-white/90 uppercase tracking-widest mt-2 block">Years of Excellence</span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed text-center">
                Engineering intelligent software products, routing configurations, and robust enterprise platforms.
              </p>
            </div>
          </div>

          {/* Column 2: Value Proposition Copy */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            <div className="space-y-3">
              <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Company Profile</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">Who We Are</h2>
            </div>
            
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Tian Group Innovation is a premier technology and implementation company. We engineer custom enterprise systems, machine learning architectures, and IoT hardware integrations designed to scale and optimize client pipelines.
              </p>
              <p>
                Our core mission is to enable digital change. We deliver high-reliability platforms that empower enterprises to make data-driven decisions and automate repetitive tasks.
              </p>
            </div>

            {/* Core Values grid */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-accent/10 border border-accent/25 rounded-lg shrink-0">
                  <Cpu className="h-4.5 w-4.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Advanced Automation</h4>
                  <p className="text-xs text-muted-foreground mt-1">Replacing workflows with high-efficiency scripts and AI services.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-accent/10 border border-accent/25 rounded-lg shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Enterprise Security</h4>
                  <p className="text-xs text-muted-foreground mt-1">Enforcing end-to-end encryption and compliance gates.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-accent/10 border border-accent/25 rounded-lg shrink-0">
                  <Globe2 className="h-4.5 w-4.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Scalable Architecture</h4>
                  <p className="text-xs text-muted-foreground mt-1">Cloud deployments built to handle heavy data throughput.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-accent/10 border border-accent/25 rounded-lg shrink-0">
                  <Lightbulb className="h-4.5 w-4.5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Client Centricity</h4>
                  <p className="text-xs text-muted-foreground mt-1">Building custom tailored components aligned to your team.</p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <Button onClick={handleContactClick} className="bg-primary hover:bg-accent text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300">
                <span>Work With Us</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
