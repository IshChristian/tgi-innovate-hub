import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Github, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectLink {
  name: string;
  href: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [projectLinks, setProjectLinks] = useState<ProjectLink[]>([
    { name: "Smart Logistics Platform", href: "/#projects" },
    { name: "GreenCity IoT Hub", href: "/#projects" },
    { name: "AI Retail Insights", href: "/#projects" },
  ]);

  useEffect(() => {
    // Dynamically fetch projects from Supabase to use as quick links
    const fetchProjectsForFooter = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("title, url")
          .eq("published", true)
          .order("sort_order", { ascending: true })
          .limit(4);
        
        if (!error && data && data.length > 0) {
          setProjectLinks(data.map(p => ({
            name: p.title,
            href: p.url
          })));
        }
      } catch (err) {
        console.error("Error fetching projects for footer:", err);
      }
    };
    fetchProjectsForFooter();
  }, []);

  const footerLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/#about" },
      { name: "Careers Portal", href: "/careers" },
      { name: "Contact", href: "/#contact" },
    ],
    community: [
      { name: "Digital Training", href: "/#applications" },
      { name: "Design & UX", href: "/#applications" },
      { name: "Mentorship Labs", href: "/#applications" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(175,100,36,0.08),transparent_40%)] pointer-events-none"></div>

      <div className="section-container section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 relative z-10">
          {/* Column 1: Company Branding & Social */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/6.png"
                alt="Tian Group Logo"
                className="h-10 w-auto brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-2xl font-bold text-white">Tian Group</span>';
                  }
                }}
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Tian Group Innovation is a global leader in AI, IoT, automation, and enterprise systems, delivering scalable solutions for sustainable growth.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-accent hover:text-white transition-all duration-300">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-accent hover:text-white transition-all duration-300">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-accent hover:text-white transition-all duration-300">
                <Youtube className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-accent hover:text-white transition-all duration-300">
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-white text-base tracking-wide uppercase mb-6 relative after:content-[''] after:block after:w-8 after:h-[2px] after:bg-accent after:mt-2">
              Company
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") && !link.href.includes("#") ? (
                    <Link to={link.href} className="text-sm text-primary-foreground/80 hover:text-accent hover:translate-x-1 inline-block transition-all duration-300">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent hover:translate-x-1 inline-block transition-all duration-300">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="font-bold text-white text-base tracking-wide uppercase mb-6 relative after:content-[''] after:block after:w-8 after:h-[2px] after:bg-accent after:mt-2">
              Community
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent hover:translate-x-1 inline-block transition-all duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (Projects) */}
          <div>
            <h4 className="font-bold text-white text-base tracking-wide uppercase mb-6 relative after:content-[''] after:block after:w-8 after:h-[2px] after:bg-accent after:mt-2">
              Featured Projects
            </h4>
            <ul className="space-y-3.5">
              {projectLinks.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/80 hover:text-accent hover:translate-x-1 inline-block transition-all duration-300 line-clamp-1"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-primary-foreground/80 hover:text-accent hover:translate-x-1 inline-block transition-all duration-300 line-clamp-1"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-sm text-primary-foreground/75">
            © {currentYear} Tian Group Innovation. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="text-primary-foreground/75 hover:text-accent transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="text-primary-foreground/75 hover:text-accent transition-colors duration-300">
              Terms of Service
            </a>
            <Link to="/login" className="flex items-center text-primary-foreground/40 hover:text-accent transition-colors duration-300 gap-1 text-xs pl-4 border-l border-white/10">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
