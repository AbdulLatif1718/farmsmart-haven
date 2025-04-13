
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, MapPin, ShoppingCart, Check, CalendarCheck, Shield, Map, Clock } from 'lucide-react';

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
          <span className="inline-block px-4 py-1 rounded-full bg-leaf-100 text-leaf-700 font-medium text-sm mb-5">No More Transport Worries</span>
          <h2 className="text-3xl font-bold mb-4 text-soil-800">Reliable Transport & Logistics</h2>
          <p className="text-xl text-soil-700 max-w-2xl mx-auto">
            Move your produce to market efficiently with our trusted transport network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {transportFeatures.map((feature, index) => (
            <Card key={index} className="border-leaf-200 hover:border-leaf-400 transition-colors h-full">
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

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-leaf-100">
          <h3 className="text-2xl font-bold mb-6 text-center text-soil-800">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-leaf-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="h-6 w-6 text-leaf-600" />
              </div>
              <h4 className="font-semibold mb-2 text-soil-800">1. Schedule</h4>
              <p className="text-soil-700 text-sm">Book transport days or weeks in advance</p>
            </div>
            <div className="text-center">
              <div className="bg-leaf-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-leaf-600" />
              </div>
              <h4 className="font-semibold mb-2 text-soil-800">2. Get Matched</h4>
              <p className="text-soil-700 text-sm">We connect you with verified transporters</p>
            </div>
            <div className="text-center">
              <div className="bg-leaf-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="h-6 w-6 text-leaf-600" />
              </div>
              <h4 className="font-semibold mb-2 text-soil-800">3. Track</h4>
              <p className="text-soil-700 text-sm">Follow your delivery in real time</p>
            </div>
            <div className="text-center">
              <div className="bg-leaf-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-leaf-600" />
              </div>
              <h4 className="font-semibold mb-2 text-soil-800">4. Confirm</h4>
              <p className="text-soil-700 text-sm">Verify delivery and rate the service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;
