import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { ArrowUpRight, GraduationCap, Palette, Lightbulb, Compass, Award, Users } from "lucide-react";

interface Program {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const programs: Program[] = [
  {
    title: "Digital Skills Training",
    description: "Comprehensive coding bootcamps, web development, mobile apps, and software engineering fundamentals for all skill levels.",
    icon: GraduationCap,
  },
  {
    title: "Design & Creativity",
    description: "UI/UX design, graphic design, digital art, and creative problem-solving workshops to bring ideas to life.",
    icon: Palette,
  },
  {
    title: "Innovation & Research",
    description: "Collaborative research projects, innovation labs, and community-driven tech solutions addressing real-world challenges.",
    icon: Lightbulb,
  },
  {
    title: "Mentorship & Coaching",
    description: "One-on-one guidance from industry experts, peer learning groups, and career development support.",
    icon: Compass,
  },
  {
    title: "Internships & Career Development",
    description: "Real-world experience through internships, job placement support, and professional networking opportunities.",
    icon: Award,
  },
  {
    title: "Community Tech Projects",
    description: "Build impactful solutions together—from civic tech to social innovation projects that benefit local communities.",
    icon: Users,
  },
];

const Applications = () => {
  return (
    <section id="applications" className="section-padding bg-background">
      <div className="section-container">
        <SectionHeader
          title="BrightCoders Community."
          intro="Our learning community connects learners, innovators and changemakers through digital skills, mentorship and real projects."
          action={
            <Button
              className="h-12 rounded-full bg-primary hover:bg-primary/90 text-white px-6 text-[15px] font-semibold"
              onClick={() => window.open("https://brightcoders.tian.rw", "_blank", "noopener,noreferrer")}
            >
              Join BrightCoders <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          }
        />

        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div key={prog.title}>
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-5 text-xl font-semibold text-primary">{prog.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{prog.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Applications;
