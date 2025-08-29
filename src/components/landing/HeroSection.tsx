
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@/assets/hero-farmer-tech.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl text-left animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground font-medium text-sm mb-6 border border-primary/30">
            🚀 Transforming African Agriculture
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
            <span className="block">Build Wealth Through</span>
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-extrabold">
              Smart Farming
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium opacity-90">
              With or Without Owning Farm
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light">
            Fund farms. Use smart tech. Sell directly. <span className="font-medium text-white">Earn returns.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              size="lg" 
              className="gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
              onClick={() => window.location.href = '/auth'}
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white/50 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="h-5 w-5 mr-2" />
              Partner with Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
