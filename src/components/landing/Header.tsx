
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-background/90 backdrop-blur-sm border-b border-soil-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-2xl text-leaf-700">Agri</span>
          <span className="font-bold text-2xl text-sky-600">AI</span>
          <span className="text-sm font-medium ml-1 text-soil-700">Ghana</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-sm font-medium hover:text-leaf-700 transition-colors">Features</a>
          <a href="#benefits" className="text-sm font-medium hover:text-leaf-700 transition-colors">Benefits</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-leaf-700 transition-colors">Testimonials</a>
        </nav>
        <Button 
          onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-leaf-600 hover:bg-leaf-700 text-white"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
