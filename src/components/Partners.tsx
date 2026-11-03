import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SectionHeader from "@/components/SectionHeader";

const Partners = () => {
  const { data: partners = [], error } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("partners").select("*").eq("published", true).order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
  // Hidden until partners are published from the dashboard.
  if (error || partners.length === 0) return null;
  return (
    <section id="partners" className="section-padding bg-background" aria-labelledby="partners-heading">
      <div className="section-container">
        <SectionHeader title={<span id="partners-heading">Partners we work with.</span>} intro="Organisations we collaborate with to build and deliver meaningful technology." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner) => {
            const logo = <img src={partner.logo_url} alt={`${partner.name} logo`} loading="lazy" className="max-h-14 max-w-full object-contain" />;
            const box = "flex aspect-[3/2] items-center justify-center rounded-2xl bg-[#f4f6f8] p-6";
            return partner.website_url ? (
              <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className={`${box} transition-colors hover:bg-[#eceff3]`} aria-label={`Visit ${partner.name}`}>{logo}</a>
            ) : (
              <div key={partner.id} className={box}>{logo}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Partners;
