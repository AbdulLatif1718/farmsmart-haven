
import React from 'react';
import { Check } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    "Increase crop yields by up to 30% with AI-powered recommendations",
    "Reduce post-harvest losses through better storage practices",
    "Access new markets and sell at fair prices",
    "Make informed decisions with real-time weather alerts",
    "Transport produce reliably with verified logistics providers",
    "Learn new farming techniques through the knowledge hub"
  ];

  return (
    <section id="benefits" className="py-20 bg-wheat-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-soil-800">How Farmers Benefit</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            AgriAI-Ghana helps farmers across the country increase productivity and improve their livelihoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/image.png" 
              alt="Farmer in field" 
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-full bg-leaf-100 p-1">
                  <Check className="h-5 w-5 text-leaf-600" />
                </div>
                <p className="text-lg text-soil-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
