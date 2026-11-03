import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";

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

  // Our own screenshot of a product, used when the CMS image is missing or broken.
  const localScreen = (title: string) => {
    const t = title.toLowerCase();
    if (/coder/.test(t)) return "/products/brightcoders.webp";
    if (/ijwi|ejwi/.test(t)) return "/products/ejwi.webp";
    if (/mota/.test(t)) return "/products/mota-desktop.webp";
    return "/placeholder.svg";
  };

  // A short category from the project title (the CMS has no category field).
  const categoryFor = (title: string) => {
    const t = title.toLowerCase();
    if (/mota|ride|moto|mobility/.test(t)) return "Mobility";
    if (/coder|community|learn|academy/.test(t)) return "Learning community";
    if (/ijwi|ejwi|citizen|civic|complaint/.test(t)) return "Student voice";
    if (/logistic|supply/.test(t)) return "Logistics";
    if (/finance|bank|loan|pay/.test(t)) return "Financial services";
    if (/retail|insight|analytics/.test(t)) return "Data & analytics";
    return "Digital platform";
  };

  const header = (
    <SectionHeader
      title="Everything we have shipped."
      intro="Products and platforms built by our team, live and in use today."
    />
  );

  if (isLoading || error) {
    return (
      <section id="projects" className="section-padding bg-[#f4f6f8]">
        <div className="section-container">
          {header}
          <p className={`text-sm ${error ? "text-destructive" : "text-muted-foreground"}`}>
            {error ? `The portfolio could not be loaded. ${error.message}` : "Loading the portfolio…"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-[#f4f6f8]">
      <div className="section-container">
        {header}

        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects published yet.</p>
        ) : (
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                  <img
                    src={project.image || localScreen(project.title)}
                    alt={project.title}
                    loading="lazy"
                    // Our screenshots fill the frame; uploaded images (logos, flyers) are shown whole.
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${project.image ? "object-contain p-6" : "object-cover object-top"}`}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      const fallback = localScreen(project.title);
                      if (!img.src.endsWith(fallback)) { img.src = fallback; img.className = "h-full w-full object-cover object-top"; }
                    }}
                  />
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{categoryFor(project.title)}</p>
                <h3 className="mt-1 text-xl font-semibold text-primary capitalize">{project.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>
                <span className="text-link mt-4">Visit website <ArrowUpRight className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;