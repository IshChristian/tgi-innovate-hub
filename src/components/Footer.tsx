import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Github, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProjectLink {
  name: string;
  href: string;
}

const MOTA_LINK = { name: "MOTA — rides & driver earnings", href: "https://mota.tiangroupinv.rw" };

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [projectLinks, setProjectLinks] = useState<ProjectLink[]>([
    MOTA_LINK,
    { name: "BrightCoders Community", href: "https://brightcoders.tian.rw" },
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
          // MOTA always leads; other products come from the CMS.
          setProjectLinks([MOTA_LINK, ...data.filter(p => !/mota/i.test(p.title)).map(p => ({
            name: p.title,
            href: p.url
          }))]);
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
    <footer className="bg-[#0a1628] text-primary-foreground">
      <div className="section-container pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Company Branding & Social */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/6.png"
                alt="Tian Group Logo"
                className="h-9 w-auto brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-2xl font-bold text-white">Tian Group</span>';
                  }
                }}
              />
            </Link>
            <p className="max-w-sm text-white/60 text-sm leading-relaxed">
              Tian Group Innovation is a Rwandan startup building apps people use every day — led by MOTA, our ride and driver-earnings app.
            </p>
            <div className="flex gap-2 pt-2">
              <a href="#" className="p-2.5 rounded-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2.5 rounded-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2.5 rounded-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors">
                <Youtube className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2.5 rounded-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors">
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-medium text-white/45 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") && !link.href.includes("#") ? (
                    <Link to={link.href} className="text-[15px] text-white/80 hover:text-white inline-block transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-[15px] text-white/80 hover:text-white inline-block transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-medium text-white/45 mb-5">
              Community
            </h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[15px] text-white/80 hover:text-white inline-block transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (Projects) */}
          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-medium text-white/45 mb-5">
              Our Products
            </h4>
            <ul className="space-y-3">
              {projectLinks.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-white/80 hover:text-white inline-block transition-colors line-clamp-1"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[15px] text-white/80 hover:text-white inline-block transition-colors line-clamp-1"
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
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-white/50">
            © {currentYear} Tian Group Innovation. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white/50 hover:text-white transition-colors">
              Terms of Service
            </a>
            <Link to="/login" className="flex items-center text-white/35 hover:text-white transition-colors duration-300 gap-1 text-xs pl-4 border-l border-white/10">
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
