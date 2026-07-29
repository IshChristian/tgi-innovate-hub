import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { insights } from "@/data/insights";

const Insights = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper metadata to make cards look extremely rich and complete
  const getInsightMetadata = (id: string) => {
    const meta: Record<string, { readingTime: string; author: string; authorRole: string }> = {
      "ai-trends-2025": {
        readingTime: "5 min read",
        author: "Dr. Alex Rutger",
        authorRole: "Director of AI Research",
      },
      "iot-security": {
        readingTime: "7 min read",
        author: "Sarah Kayitesi",
        authorRole: "IoT Security Architect",
      },
      "digital-transformation": {
        readingTime: "6 min read",
        author: "Christian Ishimwe",
        authorRole: "Chief Technology Officer",
      },
    };
    return meta[id] || { readingTime: "4 min read", author: "Tian Team", authorRole: "Innovation Consultant" };
  };

  return (
    <section id="insights" className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Perspectives</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">Insights & Perspectives</h2>
          <p className="text-xl text-muted-foreground">
            Stay ahead of the curve with expert opinions and insights into technical trends shaping the business landscape.
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => {
            const meta = getInsightMetadata(insight.id);
            return (
              <Card
                key={insight.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(175,100,36,0.08)] hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  <CardHeader className="p-6 pb-2 space-y-4">
                    {/* Badge & Reading Time */}
                    <div className="flex items-center justify-between">
                      <Badge className="bg-secondary text-secondary-foreground font-semibold px-2.5 py-1 text-xs hover:bg-secondary/80">
                        {insight.category}
                      </Badge>
                      <span className="flex items-center text-xs text-muted-foreground gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        {meta.readingTime}
                      </span>
                    </div>

                    <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {insight.title}
                    </CardTitle>

                    {/* Publish Date & Author */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground border-b border-border/40 pb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        {formatDate(insight.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-accent" />
                        {meta.author}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-2">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {insight.excerpt}
                    </CardDescription>
                  </CardContent>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full group/btn text-primary hover:text-white hover:bg-accent transition-all duration-300 rounded-xl font-medium border border-transparent hover:border-accent"
                    onClick={() => window.location.href = insight.url}
                  >
                    <span>Read Article</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Insights;
