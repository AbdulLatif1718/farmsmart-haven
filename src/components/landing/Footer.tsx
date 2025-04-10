
import React from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-soil-800 py-12 text-wheat-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <span className="font-bold text-2xl text-leaf-400">Agri</span>
            <span className="font-bold text-2xl text-sky-400">AI</span>
            <span className="text-sm font-medium ml-1 text-wheat-100">Ghana</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <a href="#features" className="text-sm hover:text-leaf-400 transition-colors">Features</a>
            <a href="#benefits" className="text-sm hover:text-leaf-400 transition-colors">Benefits</a>
            <a href="#transport" className="text-sm hover:text-leaf-400 transition-colors">Transport</a>
            <a href="#testimonials" className="text-sm hover:text-leaf-400 transition-colors">Testimonials</a>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-leaf-400 text-leaf-400 hover:bg-leaf-900/20"
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="border-t border-soil-700 mt-8 pt-8 text-center text-sm text-wheat-100/70">
          <p>© 2025 AgriAI-Ghana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
