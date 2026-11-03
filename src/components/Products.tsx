import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// Where MOTA lives: the web app, no install needed.
const MOTA_WEB_APP = "https://mota.tiangroupinv.rw";

const motaFeatures = [
  { title: "Fair prices", body: "Passengers offer a price and nearby drivers answer in seconds." },
  { title: "Live tracking", body: "Rider and driver see each other on the map, with distance and arrival time." },
  { title: "Driver earnings", body: "Wallet, savings, fuel vouchers and fine loans built for moto drivers." },
  { title: "Web & Android", body: "Works in any browser, with an Android app for drivers on the road." },
];

const others = [
  { name: "BrightCoders", area: "Learning community", body: "Coding, design and mentorship for Rwanda's next builders.", image: "/products/brightcoders.webp", href: "#applications" },
  { name: "EJWI", area: "Student voice", body: "University of Rwanda students report campus issues and follow them to resolution.", image: "/products/ejwi.webp", href: "#projects" },
];

const scrollTo = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const target = document.getElementById(id);
  if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
};

const Products = () => {
  return (
    <section id="products" className="section-padding bg-[#f4f6f8]">
      <div className="section-container">
        <SectionHeader
          title="MOTA is our flagship."
          intro="The ride and driver-earnings app for Kigali — built, launched and run by our team."
          action={
            <a href={MOTA_WEB_APP} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-white hover:bg-primary/90">
              Open the web app <ArrowUpRight className="h-4 w-4" />
            </a>
          }
        />

        {/* Spotlight */}
        <div className="overflow-hidden rounded-3xl bg-[#0b0f17] text-white">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between gap-12">
              <img src="/products/mota-logo.png" alt="MOTA" width={633} height={138} className="h-9 w-auto self-start" />
              <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {motaFeatures.map((f) => (
                  <div key={f.title}>
                    <dt className="text-lg font-semibold">{f.title}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-white/60">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative lg:col-span-7 min-h-[320px] sm:min-h-[420px]">
              <img
                src="/products/mota-desktop.webp"
                alt="MOTA web app: a passenger choosing a destination with nearby drivers on the map"
                width={1440}
                height={900}
                loading="lazy"
                className="absolute inset-y-8 left-8 right-0 lg:inset-y-12 lg:left-0 h-[calc(100%-4rem)] lg:h-[calc(100%-6rem)] w-[calc(100%-2rem)] lg:w-full rounded-l-2xl object-cover object-left-top"
              />
            </div>
          </div>
        </div>

        {/* The rest of the studio */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {others.map((p) => (
            <a key={p.name} href={p.href} onClick={(e) => scrollTo(e, p.href.slice(1))} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                <img src={p.image} alt={`${p.name} screen`} width={1440} height={900} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-primary">{p.name}</h3>
                  <p className="mt-1 text-[15px] text-muted-foreground">{p.area} — {p.body}</p>
                </div>
                <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
