
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <span className="font-bold text-xl text-leaf-600">Agri</span>
            <span className="font-bold text-xl text-sky-600">AI</span>
            <span className="text-sm font-medium ml-1">Africa</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Empowering African farmers with AI and IoT
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="text-xs">
            <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <span className="mx-2 text-muted-foreground">•</span>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
            <span className="mx-2 text-muted-foreground">•</span>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AgriVerse Africa
          </div>
        </div>
      </div>
    </footer>
  );
};
