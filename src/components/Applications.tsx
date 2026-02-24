import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define TypeScript interface for applications
interface Application {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  published: boolean | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}

const Applications = () => {
  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: async (): Promise<Application[]> => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className="h-12 w-12" /> : null;
  };

  const getImageOrIcon = (app: Application) => {
    // If image looks like a URL, show it; otherwise try as Lucide icon name
    if (app.image.startsWith('http') || app.image.startsWith('/')) {
      return <img src={app.image} alt={app.title} className="h-12 w-12 object-contain" />;
    }
    return getIcon(app.image);
  };

  // Loading state
  if (isLoading) {
    return (
      <section id="applications" className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center">
            <p>Loading applications...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="applications" className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center">
            <p>Error loading applications: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="applications" className="section-padding bg-background">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">Our Applications</h2>
          <p className="text-xl text-muted-foreground">
            Innovative solutions engineered for performance and growth.
          </p>
        </div>

        {/* Applications grid */}
        {applications.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">No applications found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <Card
                key={app.id}
                className="group hover:card-shadow-hover transition-all duration-300 hover:-translate-y-2 animate-scale-in border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                    {getImageOrIcon(app)}
                  </div>
                  <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">
                    {app.title}
                  </CardTitle>
                  <CardDescription className="text-base">{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full group/btn border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                    onClick={() => window.location.href = app.url}
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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

export default Applications;