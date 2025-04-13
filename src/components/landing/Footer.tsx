
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-soil-800 py-12 text-wheat-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="font-bold text-2xl text-leaf-400">Agri</span>
              <span className="font-bold text-2xl text-sky-400">AI</span>
              <span className="text-sm font-medium ml-1 text-wheat-100">Ghana</span>
            </div>
            <p className="text-wheat-100/80 mb-6">
              Empowering Ghanaian farmers with AI-powered tools and resources for sustainable growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-leaf-400">Features</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">AI Recommendations</a></li>
              <li><a href="#features" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Weather Forecasting</a></li>
              <li><a href="#features" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Digital Marketplace</a></li>
              <li><a href="#transport" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Transport Solutions</a></li>
              <li><a href="#features" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Knowledge Hub</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-leaf-400">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#benefits" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Success Stories</a></li>
              <li><a href="#testimonials" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-wheat-100/80 hover:text-leaf-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-leaf-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-wheat-100/80">
                <MapPin className="h-4 w-4 text-leaf-400" />
                <span>123 Innovation Way, Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-2 text-wheat-100/80">
                <Phone className="h-4 w-4 text-leaf-400" />
                <span>+233 (0) 302 123 456</span>
              </li>
              <li className="flex items-center gap-2 text-wheat-100/80">
                <Mail className="h-4 w-4 text-leaf-400" />
                <span>info@agriai-ghana.com</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 border-leaf-400 text-leaf-400 hover:bg-leaf-900/20"
            >
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="border-t border-soil-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-wheat-100/70 mb-4 md:mb-0">
            © 2025 AgriAI-Ghana. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-wheat-100/70 hover:text-leaf-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-wheat-100/70 hover:text-leaf-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-wheat-100/70 hover:text-leaf-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
