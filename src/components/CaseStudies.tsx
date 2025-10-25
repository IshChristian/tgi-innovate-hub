import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define TypeScript interface for projects
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  published: boolean;
  sort_order: number;
  category?: string;
  technologies?: string[];
  created_at: string;
}

const CaseStudies = () => {
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center">
            <p>Loading case studies...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="projects" className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center">
            <p>Error loading case studies: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-muted">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">Proven Impact</h2>
          <p className="text-xl text-muted-foreground">
            Real-world projects powered by innovation.
          </p>
        </div>

        {/* Projects grid */}
        {projects.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">No case studies found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:card-shadow-hover transition-all duration-300 hover:-translate-y-2 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.image || "/placeholder-project.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-project.jpg";
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="default"
                    className="w-full group/btn"
                    onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                  >
                    Visit the Website
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;