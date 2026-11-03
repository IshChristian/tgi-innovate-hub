import { ArrowRight } from "lucide-react";

const facts = [
  { value: "2023", label: "Founded in Kigali, Rwanda" },
  { value: "3", label: "Products live — MOTA, BrightCoders and EJWI" },
  { value: "Web & Android", label: "Where people use our apps" },
];

const principles = [
  { title: "Build for real problems", body: "Every product starts from something people in Rwanda deal with every day — getting around, learning a skill, being heard." },
  { title: "Own the product", body: "We design, build, launch and run our apps ourselves, and stay accountable for them after launch." },
  { title: "Secure by default", body: "Verified accounts, protected payments and personal data handled with care, from the first release." },
  { title: "Open to partners", body: "Organisations can bring us an idea and work with the same team that builds our own products." },
];

const About = () => {
  const toContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
  };

  return (
    <section id="about" className="section-padding bg-background">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <h2 className="section-title lg:col-span-7">
            A Rwandan startup that builds, launches and runs its own apps.
          </h2>
          <div className="lg:col-span-5 lg:pt-3 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              We find everyday problems — getting around the city, earning a fair living, being heard — and turn them into products people use from their phone or browser.
            </p>
            <p>
              MOTA, our ride and driver-earnings app, leads the way. Alongside it we run BrightCoders, a learning community, and EJWI, a student voice platform for the University of Rwanda.
            </p>
            <a href="#contact" onClick={toContact} className="text-link !text-lg">
              Work with us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <dl className="mt-20 lg:mt-28 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-primary/15 pt-6">
              <dd className="font-display text-4xl lg:text-5xl font-semibold tracking-tight text-primary">{f.value}</dd>
              <dt className="mt-3 text-[15px] text-muted-foreground">{f.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-20 lg:mt-28 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="text-2xl font-semibold text-primary">{p.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-md">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
