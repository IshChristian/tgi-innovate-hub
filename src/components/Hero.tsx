import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

const SLIDE_MS = 7000;

type Slide = {
  id: string;
  name: string;
  area: string;
  color: string; // the product's own accent
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  domain: string;
  screen: string;
  screenAlt: string;
  phone?: string;
  logo?: string;
};

// Each slide shows a real screen from the product.
const slides: Slide[] = [
  {
    id: "mota",
    name: "MOTA",
    area: "Mobility",
    color: "#E63946",
    title: "Ride, drive and earn in Kigali.",
    body: "Passengers book a moto or car at a price they agree on and follow the driver live. Drivers get requests nearby, a wallet, savings and fuel support.",
    primary: { label: "Explore MOTA", href: "https://mota.tiangroupinv.rw" },
    secondary: { label: "How it works", href: "#products" },
    domain: "mota.tiangroupinv.rw",
    screen: "/products/mota-desktop.webp",
    screenAlt: "MOTA web app: a passenger choosing a destination with nearby drivers on the map",
    phone: "/products/mota-app.webp",
    logo: "/products/mota-logo.png",
  },
  {
    id: "brightcoders",
    name: "BrightCoders",
    area: "Learning community",
    color: "#F6B932",
    title: "Where Rwanda's next builders learn.",
    body: "Coding bootcamps, design workshops, mentorship and internships — a community that turns curiosity into real projects.",
    primary: { label: "Explore BrightCoders", href: "#applications" },
    domain: "brightcoders.tian.rw",
    screen: "/products/brightcoders.webp",
    screenAlt: "BrightCoders Community website home page",
  },
  {
    id: "ejwi",
    name: "EJWI",
    area: "Student voice",
    color: "#1C8FD0",
    title: "Every student's voice, heard and tracked.",
    body: "Students at the University of Rwanda report campus issues, follow them to resolution and see what others have raised.",
    primary: { label: "Explore EJWI", href: "#projects" },
    domain: "ejwi.tian.rw",
    screen: "/products/ejwi.webp",
    screenAlt: "EJWI public complaints board with campus reports in Kinyarwanda",
  },
];

const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
};

const ProductLink = ({ href, className, children }: { href: string; className: string; children: React.ReactNode }) => {
  const internal = href.startsWith("#");
  return (
    <a
      href={href}
      className={className}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
      onClick={internal ? (e) => { e.preventDefault(); scrollToId(href.slice(1)); } : undefined}
    >
      {children}
    </a>
  );
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const slide = slides[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), []);

  // Autoplay: advance after SLIDE_MS unless paused (hover/focus), hidden, or reduced motion.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => { if (!document.hidden) go(index + 1); }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col bg-[#0a1628] text-white pt-[72px] overflow-hidden">
      {/* Product colour wash, changes with the slide */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full transition-[background] duration-700"
        style={{ background: `linear-gradient(180deg, ${slide.color}14 0%, transparent 55%)` }}
      />

      <div
        ref={region}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our products"
        className="relative flex flex-1 flex-col"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => { if (!region.current?.contains(e.relatedTarget as Node)) setPaused(false); }}
        onKeyDown={onKeyDown}
      >
        <div className="section-container flex flex-1 items-center py-14 lg:py-16">
          <div className="grid w-full items-start gap-14 lg:grid-cols-12 lg:gap-12">
            {/* Copy */}
            <div key={slide.id} className="lg:col-span-5 lg:min-h-[31rem] hero-copy-in" aria-live={paused || reducedMotion ? "polite" : "off"}>
              <p className="text-[15px] text-white/60">
                Tian Group Innovation builds <span className="text-white">{slide.name}</span>
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: slide.color }} />
                <span className="text-[15px] font-medium" style={{ color: slide.color }}>{slide.area}</span>
              </div>
              <h1 className="mt-4 text-[2.5rem] leading-[1.03] sm:text-[3.4rem] lg:text-[3.6rem] font-semibold">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/65">{slide.body}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <ProductLink
                  href={slide.primary.href}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#0a1628] transition-colors hover:bg-white/90"
                >
                  {slide.primary.label} <ArrowRight className="h-4 w-4" />
                </ProductLink>
                {slide.secondary ? (
                  <ProductLink href={slide.secondary.href} className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white/80 hover:text-white">
                    {slide.secondary.label} {slide.secondary.href.startsWith("#") ? <ArrowDown className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </ProductLink>
                ) : null}
              </div>
            </div>

            {/* Product screens: all slides stacked, cross-fading */}
            <div className="relative lg:col-span-7 lg:mt-14">
              <div className="relative aspect-[16/10.6]">
                {slides.map((s, i) => (
                  <div
                    key={s.id}
                    aria-hidden={i !== index}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
                  >
                    <figure className="h-full overflow-hidden rounded-2xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                      <div className="flex h-9 items-center gap-3 border-b border-black/5 bg-[#f3f4f6] px-4">
                        <span className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                        </span>
                        <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[11px] text-black/45">{s.domain}</span>
                        <span className="w-[42px]" />
                      </div>
                      <img src={s.screen} alt={s.screenAlt} width={1440} height={900} className="h-[calc(100%-2.25rem)] w-full object-cover object-top" />
                    </figure>
                    {s.phone ? (
                      <img
                        src={s.phone}
                        alt=""
                        width={390}
                        height={844}
                        className="absolute -bottom-6 left-3 sm:-left-8 w-[26%] max-w-[170px] rounded-[1.6rem] border-[5px] border-[#0f1115] shadow-2xl"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide tabs with progress, and the way on to About */}
        <div className="section-container pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="grid flex-1 grid-cols-3 gap-3 sm:gap-6" role="group" aria-label="Choose a product">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active}
                    aria-label={`${s.name}: ${s.area}`}
                    className="group text-left"
                  >
                    <span className="block h-[3px] overflow-hidden rounded-full bg-white/15">
                      <span
                        key={active ? `${s.id}-${index}` : s.id}
                        className={`block h-full rounded-full ${active ? (reducedMotion ? "w-full" : "hero-progress") : "w-0"}`}
                        style={{ background: s.color, animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    </span>
                    <span className={`mt-3 block text-[15px] font-semibold transition-colors ${active ? "text-white" : "text-white/45 group-hover:text-white/80"}`}>
                      {s.name}
                    </span>
                    <span className={`hidden sm:block text-sm transition-colors ${active ? "text-white/60" : "text-white/30"}`}>{s.area}</span>
                  </button>
                );
              })}
            </div>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToId("about"); }}
              className="inline-flex items-center gap-2 self-start lg:self-end lg:pl-10 text-[15px] font-medium text-white/70 hover:text-white"
            >
              About the company <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
