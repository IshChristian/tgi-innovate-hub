import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section id="applications" className="section-padding bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>

      <div className="section-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 animate-fade-in-up">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm block">Join Us Today</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            Join BrightCoders Community Rwanda
          </h2>
          <p className="text-xl text-primary/80 font-medium">
            Empowering Communities Through Technology & Innovation
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join a global movement connecting learners, innovators, and changemakers. We empower individuals through digital literacy, mentorship, and collaborative innovation.
          </p>
        </div>

        {/* Programs Sub-header */}
        <div className="text-left max-w-2xl mb-8 animate-fade-in-up">
          <h3 className="text-2xl font-bold text-primary">Programs & Opportunities</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Discover diverse pathways to grow your skills, connect with mentors, and create meaningful impact through technology.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <Card
                key={prog.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background/60 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(175,100,36,0.1)] hover:-translate-y-1.5 animate-scale-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Visual hover border bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-accent/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                <CardHeader className="p-6 pb-2">
                  <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-[0_8px_16px_rgba(175,100,36,0.15)]">
                    <Icon className="h-5 w-5 text-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    {prog.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 pt-2">
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {prog.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action Button */}
        <div className="text-center pt-4 animate-fade-in-up">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-10 py-6 text-base font-bold shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-all duration-300 group"
            onClick={() => window.open("https://brightcoders.tian.rw", "_blank", "noopener,noreferrer")}
          >
            <span>Join BrightCoders</span>
            <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Applications;