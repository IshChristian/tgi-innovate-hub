import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const Testimonials = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">Trusted by Industry Leaders</h2>
          <p className="text-xl text-muted-foreground">
            Hear from our clients about their experiences working with us.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="relative animate-scale-in hover:card-shadow-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6 space-y-4">
                <Quote className="h-10 w-10 text-accent opacity-50" />
                <p className="text-base text-muted-foreground italic">{testimonial.content}</p>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="h-12 w-12 bg-accent text-accent-foreground">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
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
