
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Cloud, ShoppingCart, Tractor, BookOpen, Truck, BarChart, Wind, Map, TrendingUp, Shield, MessageCircle, Users, Calendar, DollarSign, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeatureSection = () => {
  const coreFeatures = [
    {
      icon: Leaf,
      title: "AI Crop Intelligence",
      description: "Advanced AI analyzes soil, weather, and market data to provide personalized crop recommendations and yield predictions."
    },
    {
      icon: Cloud,
      title: "Precision Weather Forecasting",
      description: "Hyper-local weather predictions with severe weather alerts to protect your crops and optimize farming activities."
    },
    {
      icon: ShoppingCart,
      title: "Integrated Marketplace",
      description: "Connect directly with verified buyers, access fair market prices, and eliminate middlemen for better profits."
    },
    {
      icon: Tractor,
      title: "Smart Equipment Sharing",
      description: "Rent or share farming equipment with GPS tracking, maintenance scheduling, and cost optimization."
    },
    {
      icon: Truck,
      title: "Logistics Network",
      description: "Reliable transport services with real-time tracking, bulk shipping discounts, and delivery guarantees."
    },
    {
      icon: BookOpen,
      title: "Knowledge Ecosystem",
      description: "Comprehensive agricultural library with video tutorials, expert articles, and community-driven content."
    }
  ];

  const advancedFeatures = [
    { icon: BarChart, title: "Farm Analytics", description: "Comprehensive performance tracking and predictive insights" },
    { icon: Wind, title: "Climate Adaptation", description: "Tools and strategies for climate-resilient farming" },
    { icon: Map, title: "Digital Farm Mapping", description: "Satellite imagery and precision agriculture tools" },
    { icon: TrendingUp, title: "Market Intelligence", description: "Price forecasting and commodity trend analysis" },
    { icon: Shield, title: "Risk Management", description: "Insurance connections and crop protection strategies" },
    { icon: MessageCircle, title: "Expert Network", description: "24/7 access to agricultural specialists and advisors" },
    { icon: Users, title: "Community Hub", description: "Farmer groups, forums, and knowledge sharing" },
    { icon: Calendar, title: "Smart Scheduling", description: "AI-powered planting and harvesting calendars" },
    { icon: DollarSign, title: "Financial Services", description: "Micro-loans, savings, and financial planning tools" },
    { icon: Award, title: "Certification Programs", description: "Organic and sustainable farming certifications" }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5">Comprehensive Platform</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-soil-800">Everything You Need to Succeed</h2>
          <p className="text-xl text-soil-700 max-w-3xl mx-auto">
            From AI-powered insights to market connections, our platform provides every tool modern agriculture demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="border-leaf-200 hover:border-leaf-400 hover:shadow-xl transition-all duration-300 h-full group">
              <CardHeader className="pb-4">
                <div className="rounded-2xl bg-gradient-to-br from-leaf-100 to-leaf-200 p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-leaf-700" />
                </div>
                <CardTitle className="text-xl font-bold text-soil-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-soil-700 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-soil-800">Advanced Capabilities</h3>
          <p className="text-lg text-soil-700 max-w-2xl mx-auto mb-12">
            Unlock the full potential of modern agriculture with these premium features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {advancedFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-wheat-50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="rounded-full bg-leaf-100 p-3 mb-4">
                <feature.icon className="h-6 w-6 text-leaf-600" />
              </div>
              <h4 className="text-sm font-semibold mb-2 text-soil-800">{feature.title}</h4>
              <p className="text-xs text-soil-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="gap-3 bg-gradient-to-r from-leaf-600 to-leaf-700 hover:from-leaf-700 hover:to-leaf-800 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300" 
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Using All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
