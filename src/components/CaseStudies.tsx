import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  published: boolean | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
  category: string | null;
  technologies: string | null;
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

  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-muted/60">
        <div className="section-container">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="mt-4 text-muted-foreground font-medium">Loading case studies...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section-padding bg-muted/60">
        <div className="section-container">
          <div className="text-center py-12 text-destructive">
            <p className="font-semibold">Error loading case studies</p>
            <p className="text-sm opacity-80">{error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-muted/50 relative overflow-hidden">
      {/* Background design glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Case Studies</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">Proven Impact</h2>
          <p className="text-xl text-muted-foreground">
            Explore our portfolio of successfully deployed products and digital platforms across multiple industries.
          </p>
        </div>

        {/* Projects grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No case studies found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const tags = project.technologies?.split(",").map(tag => tag.trim()).filter(Boolean) || [];
              return (
                <Card
                  key={project.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(20,38,62,0.12)] hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div>
                    {/* Image section with overlay */}
                    <div className="relative aspect-video overflow-hidden bg-muted border-b border-border/40">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                        <span className="text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md bg-white/20 px-3 py-1.5 rounded-full border border-white/10">
                          <Layers className="h-3 w-3" />
                          View Case Study Details
                        </span>
                      </div>
                      
                      {/* Category Badge on top-left of image */}
                      <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-wider bg-primary text-white border border-white/10 px-3 py-1.5 rounded-md shadow-lg">
                        {project.category || "Project"}
                      </span>
                    </div>

                    <CardHeader className="p-6 pb-2">
                      <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-sm leading-relaxed mt-2 line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <CardContent className="p-6 pt-2 space-y-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] py-0.5 px-2 bg-secondary/60 text-secondary-foreground font-medium rounded">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action button */}
                    <Button asChild variant="default" className="w-full bg-primary hover:bg-accent text-white rounded-xl"><Link to={`/projects/${project.id}`}>Explore case study <Layers className="ml-2 h-4 w-4" /></Link></Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;