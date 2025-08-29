import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Coins, Globe } from 'lucide-react';

const ImpactSection = () => {
  const stats = [
    {
      icon: Globe,
      value: "60%",
      label: "of world's arable land",
      description: "Africa has massive agricultural potential"
    },
    {
      icon: TrendingUp,
      value: "$50B+",
      label: "food imports annually",
      description: "Africa's current food import dependency"
    },
    {
      icon: Users,
      value: "25,000+",
      label: "youth jobs created",
      description: "Empowering the next generation of farmers"
    },
    {
      icon: Coins,
      value: "150%",
      label: "average ROI",
      description: "Returns for our investor partners"
    }
  ];

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
              <span className="text-green-600">60% of arable land</span>, but Africa imports{" "}
              <span className="text-green-600">$50B+ of food</span>
            </h2>
            <p className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              We're changing that.
            </p>
            <p className="text-xl text-muted-foreground">
              Transforming African agriculture through technology, funding, and direct market access
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-green-600 font-semibold">Transforming African Agriculture Daily</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;