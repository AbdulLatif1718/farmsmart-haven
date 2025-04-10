
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Cloud, ShoppingCart, Tractor, BookOpen, Truck } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Leaf,
      title: "AI Crop Recommendations",
      description: "Get personalized crop suggestions based on your soil conditions, weather patterns, and market demand."
    },
    {
      icon: Cloud,
      title: "Weather Forecasting",
      description: "Receive accurate, localized weather predictions and alerts to protect your crops."
    },
    {
      icon: ShoppingCart,
      title: "Digital Marketplace",
      description: "Sell your produce directly to buyers and access fair market prices."
    },
    {
      icon: Tractor,
      title: "Machinery Rentals",
      description: "Rent farming equipment when you need it, without the high cost of ownership."
    },
    {
      icon: Truck,
      title: "Transport & Logistics",
      description: "Book reliable transport services to move your produce to markets efficiently and track deliveries in real-time."
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Access farming guides, tutorials, and best practices in your local language."
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-soil-800">Powerful Features for Smart Farming</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to optimize your farming practices and increase yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-leaf-200 hover:border-leaf-400 transition-colors">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-leaf-600 mb-4" />
                <CardTitle className="text-soil-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-soil-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
