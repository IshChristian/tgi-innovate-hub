import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Partners = () => {
  const { data: partners = [], error } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("partners").select("*").eq("published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
  if (error || partners.length === 0) return null;
  return <section id="partners" className="section-padding bg-background" aria-labelledby="partners-heading">
    <div className="section-container text-center"><p className="text-accent font-semibold uppercase tracking-wider text-sm">Our network</p><h2 id="partners-heading" className="text-4xl font-bold text-primary mt-3 mb-5">Our Partners</h2><p className="text-muted-foreground max-w-2xl mx-auto mb-12">Organizations we collaborate with to deliver meaningful technology.</p>
      <div className="flex flex-wrap justify-center gap-5">{partners.map(partner => {
        const content = <><img src={partner.logo_url} alt={`${partner.name} logo`} loading="lazy" className="max-w-full max-h-20 object-contain" /><span className="sr-only">{partner.name}</span></>;
        return partner.website_url ? <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-48 h-32 p-5 rounded-2xl border bg-card hover:border-accent transition-colors" aria-label={`Visit ${partner.name}`}>{content}</a> : <div key={partner.id} className="flex items-center justify-center w-48 h-32 p-5 rounded-2xl border bg-card">{content}</div>;
      })}</div>
    </div>
  </section>;
};
export default Partners;
