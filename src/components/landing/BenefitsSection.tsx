
import React from 'react';
import { Check, Smile, DollarSign, CloudSun, Truck, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: CloudSun,
      title: "Smart Farming",
      description: "Increase crop yields by up to 30% with AI-powered recommendations based on soil conditions, weather patterns, and historical data."
    },
    {
      icon: DollarSign,
      title: "Better Profits",
      description: "Access fair prices by connecting directly with buyers, eliminating middlemen and increasing your profit margins."
    },
    {
      icon: Truck,
      title: "Reliable Transport",
      description: "Move your produce to market efficiently with our verified transport network and real-time tracking."
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Learn new farming techniques and best practices through our extensive library of resources in local languages."
    },
    {
      icon: Smile,
      title: "Supportive Community",
      description: "Connect with other farmers to share experiences, advice, and collaborate on larger projects."
    },
    {
      icon: Check,
      title: "Risk Reduction",
      description: "Receive timely alerts about weather changes, pest outbreaks, and market fluctuations to protect your investment."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-wheat-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5">Why Choose AgriAI</span>
          <h2 className="text-3xl font-bold mb-4 text-soil-800">How Farmers Benefit</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            AgriAI-Ghana helps farmers across the country increase productivity and improve their livelihoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-leaf-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-leaf-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-leaf-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-soil-800">{benefit.title}</h3>
                <p className="text-soil-700">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-leaf-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-soil-800">Impact Stories</h3>
              <p className="text-soil-700 mb-4">
                Small-scale farmers using AgriAI have reported:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-leaf-100 p-1 mt-1">
                    <Check className="h-4 w-4 text-leaf-600" />
                  </div>
                  <p className="text-soil-800"><span className="font-semibold">30-40%</span> increase in crop yields in the first year</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-leaf-100 p-1 mt-1">
                    <Check className="h-4 w-4 text-leaf-600" />
                  </div>
                  <p className="text-soil-800"><span className="font-semibold">25%</span> reduction in post-harvest losses</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-leaf-100 p-1 mt-1">
                    <Check className="h-4 w-4 text-leaf-600" />
                  </div>
                  <p className="text-soil-800"><span className="font-semibold">45%</span> better market prices by connecting directly with buyers</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-leaf-100 p-1 mt-1">
                    <Check className="h-4 w-4 text-leaf-600" />
                  </div>
                  <p className="text-soil-800"><span className="font-semibold">50%</span> less time spent finding reliable transport</p>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/images/image.png" 
                alt="Farmer success story" 
                className="rounded-xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
