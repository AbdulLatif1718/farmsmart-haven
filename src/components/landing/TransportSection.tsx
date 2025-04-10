
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, ShoppingCart, Check } from 'lucide-react';

const TransportSection = () => {
  const transportFeatures = [
    {
      icon: Truck,
      title: "Verified Transporters",
      description: "All transport providers are vetted and rated by other farmers",
      checks: ["Identity verified", "Vehicle inspections", "Transparent pricing"]
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Know exactly where your produce is at all times",
      checks: ["GPS tracking", "Automated alerts", "ETA updates"]
    },
    {
      icon: ShoppingCart,
      title: "Market Delivery",
      description: "Connect directly with buyers at major markets",
      checks: ["Direct market access", "Bulk transport options", "Group shipping discounts"]
    }
  ];

  return (
    <section id="transport" className="py-20 bg-gradient-farm bg-opacity-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-soil-800">Reliable Transport & Logistics</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            Move your produce to market efficiently with our trusted transport network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transportFeatures.map((feature, index) => (
            <Card key={index} className="border-leaf-200 hover:border-leaf-400 transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-leaf-600" />
                </div>
                <CardTitle className="text-soil-800">{feature.title}</CardTitle>
                <CardDescription className="text-soil-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-soil-700">
                  {feature.checks.map((check, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-leaf-600" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransportSection;
