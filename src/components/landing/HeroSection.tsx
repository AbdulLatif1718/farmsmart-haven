
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, BarChart, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-gradient-wheat overflow-hidden">
      <div className="absolute inset-0 bg-grain-texture opacity-20"></div>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-leaf-500/10 to-wheat-500/10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5 animate-bounce">
            Ghana's #1 Farming Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-soil-900 leading-tight bg-gradient-to-r from-leaf-700 to-soil-800 bg-clip-text text-transparent">
            Transform Your Farming with AI-Powered Solutions
          </h1>
          <p className="text-xl md:text-2xl text-soil-800 mb-8 max-w-3xl mx-auto animate-fade-in">
            Get personalized crop recommendations, real-time weather alerts, access to market opportunities, and reliable transport solutions - all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button 
              size="lg" 
              className="gap-2 bg-leaf-600 hover:bg-leaf-700 text-white transform hover:scale-105 transition-transform" 
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-leaf-600 text-leaf-700 hover:bg-leaf-50 transform hover:scale-105 transition-transform"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            <div className="flex flex-col items-center p-6 bg-white bg-opacity-90 rounded-lg backdrop-blur-sm hover:transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-leaf-100 p-3 mb-3">
                <Award className="h-6 w-6 text-leaf-600" />
              </div>
              <h3 className="font-semibold text-soil-800">Trusted by 10,000+ Farmers</h3>
            </div>
            <div className="flex flex-col items-center p-6 bg-white bg-opacity-90 rounded-lg backdrop-blur-sm hover:transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-leaf-100 p-3 mb-3">
                <BarChart className="h-6 w-6 text-leaf-600" />
              </div>
              <h3 className="font-semibold text-soil-800">30% Average Yield Increase</h3>
            </div>
            <div className="flex flex-col items-center p-6 bg-white bg-opacity-90 rounded-lg backdrop-blur-sm hover:transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-leaf-100 p-3 mb-3">
                <Shield className="h-6 w-6 text-leaf-600" />
              </div>
              <h3 className="font-semibold text-soil-800">Government Endorsed</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
