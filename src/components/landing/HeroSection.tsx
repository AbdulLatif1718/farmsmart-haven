
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-wheat overflow-hidden">
      <div className="absolute inset-0 bg-grain-texture"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-soil-900">
            Transform Your Farming with AI-Powered Solutions
          </h1>
          <p className="text-xl md:text-2xl text-soil-800 mb-8">
            Get personalized crop recommendations, real-time weather alerts, access to market opportunities, and reliable transport solutions - all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 bg-leaf-600 hover:bg-leaf-700 text-white" 
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-leaf-600 text-leaf-700 hover:bg-leaf-50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
