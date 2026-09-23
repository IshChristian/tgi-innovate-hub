import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ExternalLink } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id!).eq("published", true).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background"><Header />
      <main className="section-container pt-32 pb-20">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-accent font-semibold mb-10"><ArrowLeft size={18} /> Back to projects</Link>
        {isLoading ? <p>Loading project...</p> : error ? <p role="alert">Unable to load this project. Please try again later.</p> : !project ? (
          <div className="py-20"><h1 className="text-4xl font-bold text-primary">Project unavailable</h1><p className="mt-4 text-muted-foreground">This project may be unpublished or the link may have changed.</p></div>
        ) : <article className="space-y-14">
          <header className="max-w-4xl space-y-5">
            {project.category && <p className="text-accent font-semibold uppercase tracking-wide">{project.category}</p>}
            <h1 className="text-4xl md:text-6xl font-bold text-primary">{project.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
            {project.url && <Button asChild><a href={project.url} target="_blank" rel="noopener noreferrer">Visit project <ExternalLink className="ml-2 h-4 w-4" /></a></Button>}
          </header>
          <img src={project.image || "/placeholder.svg"} alt={`${project.title} showcase`} className="w-full max-h-[620px] object-cover rounded-3xl border" />
          <div className="grid md:grid-cols-2 gap-8">
            {([ ["The challenge", project.challenge], ["Our solution", project.solution], ["Outcomes", project.outcomes], ["Technologies", project.technologies] ] as const).filter(([, value]) => !!value).map(([heading, value]) => (
              <section key={heading} className="rounded-2xl border bg-card p-8"><h2 className="text-2xl font-bold text-primary mb-4">{heading}</h2><p className="text-muted-foreground whitespace-pre-line leading-relaxed">{value}</p></section>
            ))}
          </div>
          {!!project.gallery_urls?.length && <section><h2 className="text-3xl font-bold text-primary mb-6">Project gallery</h2><div className="grid md:grid-cols-2 gap-6">{project.gallery_urls.map((url, index) => <img key={`${url}-${index}`} src={url} alt={`${project.title} gallery image ${index + 1}`} loading="lazy" className="w-full aspect-video object-cover rounded-2xl border" />)}</div></section>}
        </article>}
      </main><Footer />
    </div>
  );
};
export default ProjectDetail;
