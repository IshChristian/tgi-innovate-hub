import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-muted">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden card-shadow animate-slide-in-left">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">3+</div>
                <div className="text-xl">Years of Innovation</div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">Who We Are</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Tian Group Innovation is a global technology and innovation company delivering advanced solutions across AI, automation, IoT, and enterprise digital transformation.
              </p>
              <p>
                Our mission is to help organizations achieve growth and sustainability through strategic innovation, data intelligence, and future-ready technologies.
              </p>
              <p>
                We combine deep industry expertise with cutting-edge technology to solve complex business challenges and drive meaningful results for our clients worldwide.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
