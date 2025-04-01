
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tractor, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Machinery = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Machinery Rentals</h1>
        <p className="text-muted-foreground">
          Rent farming equipment and machinery to improve your efficiency and productivity.
        </p>
      </div>
      
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="upcoming">My Bookings</TabsTrigger>
          <TabsTrigger value="listing">List Equipment</TabsTrigger>
          <TabsTrigger value="history">Rental History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Compact Tractor",
                price: "GH₵ 150.00/day",
                owner: "AgriRent Solutions",
                distance: "5.2 km away",
                availability: "Available from tomorrow",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              },
              {
                name: "Irrigation Pump",
                price: "GH₵ 85.00/day",
                owner: "WaterTech Ghana",
                distance: "8.7 km away",
                availability: "Available now",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
              },
              {
                name: "Seed Planter",
                price: "GH₵ 120.00/day",
                owner: "Modern Farming Tools",
                distance: "12 km away",
                availability: "Available now",
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              },
            ].map((equipment, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium flex items-center">
                      <Tractor className="h-4 w-4 mr-2 text-leaf-600" />
                      {equipment.name}
                    </CardTitle>
                    <Badge variant="outline" className="font-medium">
                      {equipment.price}
                    </Badge>
                  </div>
                  <CardDescription>
                    {equipment.owner}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {equipment.availability}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {equipment.distance}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Book Equipment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rentals</CardTitle>
              <CardDescription>
                View your scheduled equipment rentals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Irrigation Pump</h4>
                    <Badge variant="outline">Tomorrow</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Rental Period: May 15, 2023 - May 17, 2023
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listing">
          <Card>
            <CardHeader>
              <CardTitle>List Your Equipment</CardTitle>
              <CardDescription>
                Earn by renting out your farming equipment to other farmers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                Equipment listing form will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Rental History</CardTitle>
              <CardDescription>
                View your past equipment rentals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2].map((rental) => (
                  <div key={rental} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        {rental === 1 ? "Compact Tractor" : "Seed Planter"}
                      </h4>
                      <Badge variant="outline" className="text-muted-foreground">
                        Completed
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Rental Period: April {10 + rental * 5}, 2023 - April {12 + rental * 5}, 2023
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
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

export default Machinery;
