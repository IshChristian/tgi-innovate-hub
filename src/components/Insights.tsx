import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { insights } from "@/data/insights";

const Insights = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="insights" className="section-padding bg-background">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">Insights & Perspectives</h2>
          <p className="text-xl text-muted-foreground">
            Exploring trends and strategies shaping the innovation landscape.
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <Card
              key={insight.id}
              className="group hover:card-shadow-hover transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <Badge className="w-fit mb-2 bg-secondary text-secondary-foreground">{insight.category}</Badge>
                <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                  {insight.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(insight.date)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">{insight.excerpt}</CardDescription>
                <Button
                  variant="ghost"
                  className="w-full group/btn text-primary hover:text-accent hover:bg-accent/10"
                  onClick={() => window.location.href = insight.url}
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

export default Insights;
