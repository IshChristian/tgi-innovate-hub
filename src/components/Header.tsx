import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", isHash: false },
    { name: "About", href: "/#about", isHash: true, targetId: "about" },
    { name: "Community", href: "/#applications", isHash: true, targetId: "applications" },
    { name: "Projects", href: "/#projects", isHash: true, targetId: "projects" },
    { name: "Insights", href: "/#insights", isHash: true, targetId: "insights" },
    { name: "Team", href: "/#team", isHash: true, targetId: "team" },
    { name: "Careers", href: "/careers", isHash: false },
    { name: "Contact", href: "/#contact", isHash: true, targetId: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    if (item.isHash && location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(item.targetId || "");
      if (element) {
        // Offset for sticky header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      setIsMobileMenuOpen(false);
    } else if (item.href === "/" && location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/"
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/20"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img
                src="/6.png"
                alt="Tian Group Logo"
                className={`h-10 w-auto transition-all ${
                  isScrolled || location.pathname !== "/" ? "brightness-100" : "brightness-0 invert"
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-2xl font-bold ${
                      isScrolled || location.pathname !== '/' ? 'text-primary' : 'text-white'
                    }">Tian Group</span>`;
                  }
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isHash ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`text-sm font-semibold transition-colors duration-200 hover:text-accent ${
                        isScrolled || location.pathname !== "/"
                          ? "text-primary/80"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-sm font-semibold transition-colors duration-200 hover:text-accent ${
                        location.pathname === item.href
                          ? "text-accent"
                          : isScrolled || location.pathname !== "/"
                          ? "text-primary/80"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            <a 
              href="/#contact" 
              onClick={(e) => handleNavClick(e, { name: "Contact", href: "/#contact", isHash: true, targetId: "contact" })}
            >
              <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-5">
                Get in Touch
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || location.pathname !== "/"
                ? "text-primary hover:bg-muted"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in-up border-t border-border/20 bg-background/95 backdrop-blur-md absolute top-20 left-0 right-0 px-6 shadow-xl rounded-b-2xl">
            <ul className="space-y-4 py-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isHash ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="block text-base font-semibold text-primary/80 hover:text-accent"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-base font-semibold ${
                        location.pathname === item.href ? "text-accent" : "text-primary/80 hover:text-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-border/20">
              <a 
                href="/#contact" 
                className="block w-full"
                onClick={(e) => handleNavClick(e, { name: "Contact", href: "/#contact", isHash: true, targetId: "contact" })}
              >
                <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;