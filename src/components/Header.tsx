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
    { name: "Products", href: "/#products", isHash: true, targetId: "products" },
    { name: "About", href: "/#about", isHash: true, targetId: "about" },
    { name: "Community", href: "/#applications", isHash: true, targetId: "applications" },
    { name: "Portfolio", href: "/#projects", isHash: true, targetId: "projects" },
    { name: "Insights", href: "/#insights", isHash: true, targetId: "insights" },
    { name: "Team", href: "/#team", isHash: true, targetId: "team" },
    { name: "Careers", href: "/careers", isHash: false },
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
          ? "bg-background/95 backdrop-blur border-b border-border"
          : "bg-transparent border-b border-white/10"
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img
                src="/6.png"
                alt="Tian Group Logo"
                className={`h-9 w-auto transition-all ${
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
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isHash ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`text-[14px] font-medium transition-colors duration-200 hover:text-accent ${
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
                      className={`text-[14px] font-medium transition-colors duration-200 hover:text-accent ${
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
              <Button variant="default" className={`rounded-full px-5 h-10 font-semibold ${
                isScrolled || location.pathname !== "/" ? "bg-primary hover:bg-primary/90 text-white" : "bg-white hover:bg-white/90 text-primary"
              }`}>
                Contact us
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
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
          <div className="lg:hidden py-4 space-y-3 border-t border-border bg-background absolute top-[72px] left-0 right-0 px-6 shadow-lg">
            <ul className="space-y-4 py-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isHash ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className="block py-1 text-base font-medium text-primary hover:text-accent"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-1 text-base font-medium ${
                        location.pathname === item.href ? "text-accent" : "text-primary/80 hover:text-accent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-border">
              <a 
                href="/#contact" 
                className="block w-full"
                onClick={(e) => handleNavClick(e, { name: "Contact", href: "/#contact", isHash: true, targetId: "contact" })}
              >
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-11 font-semibold">
                  Contact us
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