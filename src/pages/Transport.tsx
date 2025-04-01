
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, MapPin, Calendar, Phone, CheckCircle } from 'lucide-react';

const Transport = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Transport & Logistics</h1>
        <p className="text-muted-foreground">
          Book verified transport services to move your products to market reliably and efficiently.
        </p>
      </div>
      
      <Tabs defaultValue="book" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="book">Book Transport</TabsTrigger>
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="book">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "FastTrack Logistics",
                type: "Small Truck (1.5 ton)",
                rating: 4.8,
                pricePerKm: "GH₵ 5.00",
                available: true
              },
              {
                name: "GreenPath Transport",
                type: "Medium Truck (3 ton)",
                rating: 4.6,
                pricePerKm: "GH₵ 8.50",
                available: true
              },
              {
                name: "FarmMove Services",
                type: "Large Truck (5 ton)",
                rating: 4.9,
                pricePerKm: "GH₵ 12.00",
                available: false
              },
            ].map((service, index) => (
              <Card key={index} className={!service.available ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-leaf-600" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>
                    {service.type} • {service.rating} ★
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="text-sm flex justify-between">
                      <span>Price per kilometer:</span>
                      <span className="font-medium">{service.pricePerKm}</span>
                    </div>
                    <div className="text-sm flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${service.available ? "text-green-600" : "text-red-500"}`}>
                        {service.available ? "Available Now" : "Booked Today"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!service.available}>
                    Book Transport
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <Card className="mb-6 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Active Delivery
              </CardTitle>
              <CardDescription>
                Tracking ID: TRK-28549
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-leaf-100 dark:bg-leaf-800 flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-leaf-600 dark:text-leaf-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Route</h4>
                      <p className="text-xs text-muted-foreground">Accra to Kumasi (246 km)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-leaf-100 dark:bg-leaf-800 flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-leaf-600 dark:text-leaf-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Estimated Delivery</h4>
                      <p className="text-xs text-muted-foreground">Today, 4:30 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-leaf-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Driver</h4>
                        <p className="text-xs text-muted-foreground">Kwame Adu</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </div>
                
                <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                  Delivery tracking map will be displayed here
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transport History</CardTitle>
              <CardDescription>
                View your past transport bookings and deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((delivery) => (
                  <div key={delivery} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">TRK-{28500 - delivery}</h4>
                      <div className="text-xs text-muted-foreground">
                        {`April ${10 + delivery}, 2023`} • Accra to Tamale
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Transport;
