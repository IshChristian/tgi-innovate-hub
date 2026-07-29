import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  sort_order: number | null;
  published: boolean | null;
}

const mockTeam: TeamMember[] = [
  {
    id: "alex",
    name: "Dr. Alex Rutger",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    sort_order: 1,
    published: true,
  },
  {
    id: "christian",
    name: "Christian Ishimwe",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    sort_order: 2,
    published: true,
  },
  {
    id: "sarah",
    name: "Sarah Kayitesi",
    role: "Head of AI & Product",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    sort_order: 3,
    published: true,
  },
];

const Team = () => {
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data && data.length > 0 ? data : mockTeam;
    },
    // Prevent crash by falling back to mockTeam immediately
    initialData: mockTeam,
  });

  return (
    <section id="team" className="section-padding bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in max-w-2xl mx-auto space-y-4">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Our Experts</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-lg">
            The multi-disciplinary creators, engineers, and visionaries driving our technology products and client growth.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card 
              key={member.id} 
              className="group overflow-hidden rounded-2xl border border-border/80 bg-background transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(20,38,62,0.12)] hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0 text-center">
                {/* Image container with hover overlays */}
                <div className="relative overflow-hidden aspect-[4/5] bg-muted">
                  <img
                    src={member.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette gradient on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                </div>
                
                {/* Text Details */}
                <div className="p-6 bg-background relative z-10 border-t border-border/40">
                  <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  
                  {/* Dynamic Department badge based on Role */}
                  <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5">
                    {member.role.toLowerCase().includes("ceo") || member.role.toLowerCase().includes("founder") 
                      ? "Executive" 
                      : member.role.toLowerCase().includes("cto") || member.role.toLowerCase().includes("engineer") || member.role.toLowerCase().includes("technology")
                      ? "Engineering" 
                      : "Product & Strategy"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
