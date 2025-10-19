import { Linkedin, Twitter, Youtube, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Careers", href: "/careers" },
    ],
    applications: [
      { name: "AI & Automation", href: "/applications/ai-automation" },
      { name: "IoT & Smart Systems", href: "/applications/iot-smart-systems" },
      { name: "Enterprise Software", href: "/applications/enterprise-software" },
    ],
    insights: [
      { name: "Latest Articles", href: "#insights" },
      { name: "Case Studies", href: "#case-studies" },
      { name: "Resource Hub", href: "/resources" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Tian Group</h3>
            <p className="text-primary-foreground/80 text-sm">
              Innovating the future of business through technology, intelligence, and transformation.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications links */}
          <div>
            <h4 className="font-semibold mb-4">Applications</h4>
            <ul className="space-y-2">
              {footerLinks.applications.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Insights & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.insights.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} Tian Group Innovation. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
