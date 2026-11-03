import { testimonials } from "@/data/testimonials";
import SectionHeader from "@/components/SectionHeader";

const Testimonials = () => {
  return (
    <section className="section-padding bg-[#f4f6f8]">
      <div className="section-container">
        <SectionHeader
          title="What partners say."
          intro="Feedback from organisations we have worked with."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.id} className="flex flex-col justify-between rounded-2xl bg-white p-8 ring-1 ring-black/5">
              <blockquote className="font-display text-lg leading-relaxed text-primary">
                “{testimonial.content}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {testimonial.avatar}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-primary">{testimonial.name}</span>
                  <span className="block text-muted-foreground">{testimonial.role}, {testimonial.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
