import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const Testimonials = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute -top-24 left-10 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Success Stories</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">Trusted by Industry Leaders</h2>
          <p className="text-xl text-muted-foreground">
            See how we help forward-thinking organizations achieve success, scale operations, and lead digital change.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(20,38,62,0.08)] hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Soft decorative blur inside card */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full filter blur-2xl group-hover:bg-accent/10 transition-colors duration-500"></div>

              <CardContent className="p-8 pt-10 flex flex-col justify-between h-full space-y-6">
                <Quote className="h-10 w-10 text-accent/20 group-hover:text-accent/40 transition-colors duration-500" />
                
                <p className="text-muted-foreground text-base leading-relaxed italic relative z-10 flex-grow">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-border/40 relative z-10">
                  <Avatar className="h-12 w-12 border-2 border-accent/20 bg-accent text-white group-hover:border-accent transition-colors duration-500 shadow-sm">
                    <AvatarFallback className="font-bold bg-accent text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-accent font-semibold mt-0.5">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
