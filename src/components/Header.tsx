import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Lock } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img
                src="/6.png"
                alt="Company Logo"
                height={90}
                className="h-10 w-auto md:h-10"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = '<span class="text-2xl font-bold text-primary">Logo</span>';
                  }
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation - Only Get in Touch and Login */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get in Touch
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="icon" title="Admin Login">
                <Lock className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in-up border-t border-border">
            <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Get in Touch
            </Button>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;