
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sprout, TrendingUp, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';

const RoleSection = () => {
  const roles = [
    {
      icon: Sprout,
      title: "For Farmers",
      subtitle: "Smart Farming Made Simple",
      description: "AI-powered recommendations, weather forecasts, and direct market access to maximize your yields and profits.",
      features: [
        "Personalized crop recommendations",
        "Real-time weather alerts",
        "Direct buyer connections",
        "Equipment rental marketplace",
        "Expert agricultural guidance"
      ],
      color: "leaf",
      demoCredentials: "farmer@example.com / farmer123"
    },
    {
      icon: TrendingUp,
      title: "For Investors",
      subtitle: "Invest in Africa's Agricultural Future",
      description: "Discover profitable agricultural projects, track investments, and support sustainable farming initiatives.",
      features: [
        "Vetted investment opportunities",
        "Real-time project tracking",
        "Detailed financial analytics",
        "Risk assessment tools",
        "Direct farmer connections"
      ],
      color: "sky",
      demoCredentials: "investor@example.com / investor123"
    },
    {
      icon: GraduationCap,
      title: "For Youth",
      subtitle: "Learn, Grow, Lead Agriculture",
      description: "Access training programs, find mentors, and start your own agricultural projects with comprehensive support.",
      features: [
        "Agricultural training programs",
        "Mentor matching system",
        "Project development support",
        "Skills certification",
        "Peer networking opportunities"
      ],
      color: "amber",
      demoCredentials: "youth@example.com / youth123"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      leaf: {
        bg: "bg-leaf-50",
        border: "border-leaf-200",
        icon: "bg-leaf-100 text-leaf-700",
        button: "bg-leaf-600 hover:bg-leaf-700",
        accent: "text-leaf-700"
      },
      sky: {
        bg: "bg-sky-50",
        border: "border-sky-200", 
        icon: "bg-sky-100 text-sky-700",
        button: "bg-sky-600 hover:bg-sky-700",
        accent: "text-sky-700"
      },
      amber: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "bg-amber-100 text-amber-700", 
        button: "bg-amber-600 hover:bg-amber-700",
        accent: "text-amber-700"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.leaf;
  };

  return (
    <section id="roles" className="py-24 bg-gradient-to-b from-white to-wheat-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5">Three Powerful Dashboards</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-soil-800">Built for Every Role in Agriculture</h2>
          <p className="text-xl text-soil-700 max-w-3xl mx-auto">
            Whether you're farming, investing, or learning, AgriVerse Africa has the perfect dashboard designed for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {roles.map((role, index) => {
            const colors = getColorClasses(role.color);
            return (
              <Card key={index} className={`${colors.bg} ${colors.border} border-2 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 h-full`}>
                <CardHeader className="text-center pb-4">
                  <div className={`rounded-full ${colors.icon} p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto`}>
                    <role.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-soil-800 mb-2">{role.title}</CardTitle>
                  <CardDescription className={`text-lg font-semibold ${colors.accent}`}>
                    {role.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-soil-700 text-center leading-relaxed">{role.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-soil-800 text-center">Key Features:</h4>
                    <ul className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className={`h-5 w-5 ${colors.accent} flex-shrink-0 mt-0.5`} />
                          <span className="text-soil-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button 
                      className={`w-full ${colors.button} text-white gap-2 font-semibold py-3`}
                      onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Try {role.title.split(' ')[1]} Dashboard <ArrowRight className="h-4 w-4" />
                    </Button>
                    <p className="text-xs text-soil-600 text-center mt-3">
                      Demo: {role.demoCredentials}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
