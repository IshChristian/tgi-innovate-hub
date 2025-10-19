import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  return (
    <section id="case-studies" className="section-padding bg-muted">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">Proven Impact</h2>
          <p className="text-xl text-muted-foreground">
            Real-world success stories from our global clients.
          </p>
        </div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card
              key={study.id}
              className="group hover:card-shadow-hover transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <Badge className="w-fit mb-2 bg-accent text-accent-foreground">{study.category}</Badge>
                <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-base">{study.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-accent">{study.metric}</div>
                <Button
                  variant="ghost"
                  className="w-full group/btn text-primary hover:text-accent hover:bg-accent/10"
                  onClick={() => window.location.href = study.url}
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
