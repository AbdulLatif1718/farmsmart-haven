import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sprout, Coins, Handshake } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Join the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AgriVerse</span> Revolution
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Be part of the movement transforming African agriculture. 
              Choose your path and start making an impact today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sprout className="h-5 w-5" />
              Start Farming <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              className="gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Coins className="h-5 w-5" />
              Fund a Farm <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="gap-3 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Handshake className="h-5 w-5" />
              Partner With Us
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">🌱</div>
              <p className="text-sm text-muted-foreground">Sustainable Farming</p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-secondary mb-2">💰</div>
              <p className="text-sm text-muted-foreground">Profitable Returns</p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-accent mb-2">🚀</div>
              <p className="text-sm text-muted-foreground">Innovation-Driven</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;