
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, BarChart, Shield, Users, TrendingUp, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-gradient-to-br from-leaf-50 via-wheat-50 to-sky-50 overflow-hidden">
      <div className="absolute inset-0 bg-grain-texture opacity-10"></div>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-leaf-500/5 to-sky-500/5"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center mb-16 animate-fade-in">
          <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-leaf-100 to-sky-100 text-leaf-700 font-medium text-sm mb-6 animate-bounce border border-leaf-200">
            🌍 Africa's Complete Agricultural Platform
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 text-soil-900 leading-tight">
            <span className="bg-gradient-to-r from-leaf-600 via-leaf-700 to-sky-600 bg-clip-text text-transparent">
              AgriVerse Africa
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-soil-800">
              Connecting Africa's Agricultural Ecosystem
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-soil-700 mb-10 max-w-4xl mx-auto leading-relaxed">
            Empowering <span className="font-semibold text-leaf-700">farmers</span>, connecting <span className="font-semibold text-sky-700">investors</span>, and training <span className="font-semibold text-amber-700">youth</span> - all in one comprehensive platform for Africa's agricultural future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              className="gap-3 bg-gradient-to-r from-leaf-600 to-leaf-700 hover:from-leaf-700 hover:to-leaf-800 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Journey <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-leaf-600 text-leaf-700 hover:bg-leaf-50 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Platform
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in">
            <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-leaf-100">
              <div className="rounded-full bg-gradient-to-br from-leaf-100 to-leaf-200 p-4 mb-4">
                <Users className="h-8 w-8 text-leaf-700" />
              </div>
              <h3 className="font-bold text-xl text-soil-800 mb-2">15,000+ Farmers</h3>
              <p className="text-soil-600 text-center">Active users growing smarter across Africa</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-sky-100">
              <div className="rounded-full bg-gradient-to-br from-sky-100 to-sky-200 p-4 mb-4">
                <TrendingUp className="h-8 w-8 text-sky-700" />
              </div>
              <h3 className="font-bold text-xl text-soil-800 mb-2">₵500M+ Invested</h3>
              <p className="text-soil-600 text-center">Capital flowing through our platform</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-amber-100">
              <div className="rounded-full bg-gradient-to-br from-amber-100 to-amber-200 p-4 mb-4">
                <Globe className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="font-bold text-xl text-soil-800 mb-2">54 Countries</h3>
              <p className="text-soil-600 text-center">Continent-wide coverage and support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
