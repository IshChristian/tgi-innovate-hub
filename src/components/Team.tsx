import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

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
    <section id="team" className="section-padding bg-background">
      <div className="section-container">
        <SectionHeader
          title="The people behind our products."
          intro="Engineers, designers and builders working from Kigali."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {team.map((member) => (
            <figure key={member.id}>
              <TeamPhoto member={member} />
              <figcaption className="mt-4">
                <span className="block text-xl font-semibold text-primary capitalize">{member.name}</span>
                <span className="block text-[15px] text-muted-foreground">{member.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/** The member's photo, or their initials on navy when there is no photo or it fails to load. */
const TeamPhoto = ({ member }: { member: TeamMember }) => {
  const [failed, setFailed] = useState(!member.image);
  const initials = member.name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
  return (
    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center font-display text-5xl font-semibold text-white/80">{initials}</div>
      ) : (
        <img src={member.image} alt={member.name} loading="lazy" className="h-full w-full object-cover" onError={() => setFailed(true)} />
      )}
    </div>
  );
};

export default Team;
