
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Cloud, ShoppingCart, Tractor, BookOpen, Truck, BarChart, Wind, Map, TrendingUp, Shield, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      description: "Receive accurate, localized weather predictions and alerts to protect your crops from unexpected conditions."
    },
    {
      icon: ShoppingCart,
      title: "Digital Marketplace",
      description: "Sell your produce directly to buyers and access fair market prices without middlemen taking a cut."
    },
    {
      icon: Tractor,
      title: "Machinery Rentals",
      description: "Rent farming equipment when you need it, without the high cost of ownership. Share resources with nearby farmers."
    },
    {
      icon: Truck,
      title: "Transport & Logistics",
      description: "Book reliable transport services to move your produce to markets efficiently and track deliveries in real-time."
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Access farming guides, tutorials, and best practices in your local language, created by agricultural experts."
    }
  ];

  const advancedFeatures = [
    {
      icon: BarChart,
      title: "Data Analytics",
      description: "Track your farm's performance over time with easy-to-understand charts and reports."
    },
    {
      icon: Wind,
      title: "Climate Adaptation",
      description: "Get recommendations to adapt your farming practices to changing climate conditions."
    },
    {
      icon: Map,
      title: "Farm Mapping",
      description: "Create digital maps of your farm to optimize planting and resource allocation."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Access price trends and forecasts to time your selling for maximum profit."
    },
    {
      icon: Shield,
      title: "Crop Insurance",
      description: "Connect with affordable insurance providers to protect against crop failures."
    },
    {
      icon: MessageCircle,
      title: "Expert Consultations",
      description: "Chat with agricultural experts to get answers to your specific farming questions."
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5">Everything You Need</span>
          <h2 className="text-3xl font-bold mb-4 text-soil-800">Powerful Features for Smart Farming</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            Our AI-powered platform provides all the tools you need to optimize your farming practices and increase yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-leaf-200 hover:border-leaf-400 hover:shadow-md transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-leaf-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-leaf-600" />
                </div>
                <CardTitle className="text-soil-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-soil-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4 text-soil-800">Advanced Features for Growth</h3>
          <p className="text-lg text-soil-700 max-w-2xl mx-auto mb-8">
            Take your farming to the next level with these premium capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advancedFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-wheat-50 transition-colors">
              <div className="rounded-full bg-leaf-100 p-2 flex-shrink-0">
                <feature.icon className="h-5 w-5 text-leaf-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1 text-soil-800">{feature.title}</h4>
                <p className="text-soil-700 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="gap-2 bg-leaf-600 hover:bg-leaf-700 text-white" 
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
