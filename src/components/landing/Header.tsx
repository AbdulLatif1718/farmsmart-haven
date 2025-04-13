
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-2xl text-leaf-700">Agri</span>
          <span className="font-bold text-2xl text-sky-600">AI</span>
          <span className="text-sm font-medium ml-1 text-soil-700">Ghana</span>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
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
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => scrollToSection('auth-section')}
            className="hidden md:flex bg-leaf-600 hover:bg-leaf-700 text-white"
          >
            Get Started
          </Button>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-soil-800"
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
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md px-4 py-5 shadow-lg">
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
              onClick={() => scrollToSection('auth-section')}
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
