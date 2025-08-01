import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, TrendingUp, Handshake, ArrowRight } from 'lucide-react';

const WhyJoinSection = () => {
  const benefits = [
    {
      icon: Sprout,
      title: "For Farmers",
      subtitle: "Funding, Tools, Buyers",
      features: [
        "Access to investment funding",
        "Modern farming technology",
        "Direct buyer connections",
        "Technical training & support",
        "Guaranteed market access"
      ],
      cta: "Start Farming",
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "For Investors",
      subtitle: "30–150% ROI",
      features: [
        "High-yield agricultural returns",
        "Diversified crop portfolios",
        "Real-time farm monitoring",
        "Transparent reporting",
        "Social impact investing"
      ],
      cta: "Fund a Farm",
      color: "secondary"
    },
    {
      icon: Handshake,
      title: "For Partners",
      subtitle: "Growth, Impact, Innovation",
      features: [
        "Technology integration opportunities",
        "Market expansion access",
        "Sustainable development goals",
        "Innovation partnerships",
        "Continental network access"
      ],
      cta: "Partner With Us",
      color: "accent"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20 hover:border-primary/50',
          icon: 'text-primary',
          iconBg: 'bg-primary/10 group-hover:bg-primary/20',
          button: 'bg-primary hover:bg-primary/90 text-primary-foreground'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/10',
          border: 'border-secondary/20 hover:border-secondary/50',
          icon: 'text-secondary',
          iconBg: 'bg-secondary/10 group-hover:bg-secondary/20',
          button: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          border: 'border-accent/20 hover:border-accent/50',
          icon: 'text-accent',
          iconBg: 'bg-accent/10 group-hover:bg-accent/20',
          button: 'bg-accent hover:bg-accent/90 text-accent-foreground'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20 hover:border-primary/50',
          icon: 'text-primary',
          iconBg: 'bg-primary/10 group-hover:bg-primary/20',
          button: 'bg-primary hover:bg-primary/90 text-primary-foreground'
        };
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Why Join <span className="text-primary">AgriVerse?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're a farmer, investor, or partner, AgriVerse offers unique opportunities 
            to be part of Africa's agricultural transformation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colors = getColorClasses(benefit.color);
            
            return (
              <Card key={index} className={`p-8 h-full border-2 ${colors.border} transition-all duration-300 hover:shadow-lg group`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                    <Icon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className={`text-lg font-semibold ${colors.icon}`}>
                    {benefit.subtitle}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full gap-2 ${colors.button} transform hover:scale-105 transition-all duration-300`}
                  onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {benefit.cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;