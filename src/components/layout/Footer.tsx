
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <img 
              src="/lovable-uploads/bce4d552-bebc-4009-9d01-68ca934c5518.png" 
              alt="AgriVerse Africa Logo" 
              className="h-8 w-8 dark:hidden"
            />
            <img 
              src="/lovable-uploads/103c04b5-8ea1-4770-a453-7641b4a4073a.png" 
              alt="AgriVerse Africa Logo" 
              className="h-8 w-8 hidden dark:block"
            />
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
