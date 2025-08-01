import React from 'react';
import { Card } from '@/components/ui/card';
import { Sprout, Coins, ShoppingCart } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Sprout,
      title: "Create a Farm Project",
      description: "Set up your agricultural project with detailed plans, crop selection, and resource requirements.",
      step: "01"
    },
    {
      icon: Coins,
      title: "Get Funding & Smart Tools",
      description: "Access investors, receive funding, and get equipped with modern farming technology and IoT devices.",
      step: "02"
    },
    {
      icon: ShoppingCart,
      title: "Harvest & Sell Directly",
      description: "Connect directly with buyers, sell your produce at fair prices, and share returns with investors.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform African farming and create sustainable returns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-8 text-center h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
                
                {/* Connector arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-primary/30"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary/30 border-y-2 border-y-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;