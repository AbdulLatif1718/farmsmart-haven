
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { getCurrentTheme, toggleTheme } from '@/utils/themeUtils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(getCurrentTheme);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setTheme(getCurrentTheme());
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/images/agriverse dark.png" 
              alt="AgriVerse Africa Logo" 
              className="h-12 w-auto transform scale-150 dark:hidden"
            />
            <img 
              src="/images/agriverse light.png" 
              alt="AgriVerse Africa Logo" 
              className="h-12 w-auto transform scale-150 hidden dark:block"
            />
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
              className="text-sm font-medium hover:text-leaf-700 transition-colors"
            >
              Features
            </a>
            <a 
              href="#benefits" 
              onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
              className="text-sm font-medium hover:text-leaf-700 transition-colors"
            >
              Benefits
            </a>
            <a 
              href="#transport" 
              onClick={(e) => { e.preventDefault(); scrollToSection('transport'); }}
              className="text-sm font-medium hover:text-leaf-700 transition-colors"
            >
              Transport
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}
              className="text-sm font-medium hover:text-leaf-700 transition-colors"
            >
              Testimonials
            </a>
            
            {/* Theme Toggle - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="hover:bg-leaf-100 hover:text-leaf-700"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-leaf-600 hover:bg-leaf-700 text-white"
            >
              Get Started
            </Button>
          </nav>
          
          <div className="md:hidden flex items-center gap-4">
            {/* Theme Toggle - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="hover:bg-leaf-100 hover:text-leaf-700"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="text-soil-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md px-4 py-5 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
              className="text-sm font-medium py-2 hover:text-leaf-700 transition-colors"
            >
              Features
            </a>
            <a 
              href="#benefits" 
              onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}
              className="text-sm font-medium py-2 hover:text-leaf-700 transition-colors"
            >
              Benefits
            </a>
            <a 
              href="#transport" 
              onClick={(e) => { e.preventDefault(); scrollToSection('transport'); }}
              className="text-sm font-medium py-2 hover:text-leaf-700 transition-colors"
            >
              Transport
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}
              className="text-sm font-medium py-2 hover:text-leaf-700 transition-colors"
            >
              Testimonials
            </a>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-leaf-600 hover:bg-leaf-700 text-white w-full mt-2"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
