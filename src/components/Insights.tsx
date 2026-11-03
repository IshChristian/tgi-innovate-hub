import { ArrowRight } from "lucide-react";
import { insights } from "@/data/insights";
import SectionHeader from "@/components/SectionHeader";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const Insights = () => {
  return (
    <section id="insights" className="section-padding bg-background">
      <div className="section-container">
        <SectionHeader
          title="Notes from the team."
          intro="What we learn while building products in Rwanda — technology, security and the way we work."
        />

        <ul className="border-t border-primary/10">
          {insights.map((insight) => (
            <li key={insight.id} className="border-b border-primary/10">
              <a href={insight.url} className="group grid gap-3 py-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-3 flex lg:flex-col gap-x-4 gap-y-1 text-sm">
                  <time dateTime={insight.date} className="text-muted-foreground">{formatDate(insight.date)}</time>
                  <span className="text-primary/70">{insight.category}</span>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="text-2xl sm:text-[1.75rem] font-semibold text-primary group-hover:underline underline-offset-4 decoration-1">{insight.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">{insight.excerpt}</p>
                </div>
                <div className="lg:col-span-2 lg:text-right lg:self-center">
                  <span className="text-link">Read <ArrowRight className="h-4 w-4" /></span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Insights;
