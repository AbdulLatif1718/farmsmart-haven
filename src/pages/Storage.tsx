
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PackageOpen, Info, BarChart, Sun, ThermometerIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Storage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Post-Harvest Solutions</h1>
        <p className="text-muted-foreground">
          Minimize post-harvest losses with smart storage solutions and best practices.
        </p>
      </div>
      
      <Tabs defaultValue="solutions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="solutions">Storage Solutions</TabsTrigger>
          <TabsTrigger value="monitoring">Storage Monitoring</TabsTrigger>
          <TabsTrigger value="guides">Storage Guides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solutions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Solar-Powered Storage",
                description: "Temperature-controlled storage units powered by solar energy",
                capacity: "1-5 tons",
                features: ["Temperature control", "Solar powered", "Humidity control"],
                icon: Sun
              },
              {
                title: "Grain Silos",
                description: "Modern grain silos with moisture control and pest prevention",
                capacity: "10-50 tons",
                features: ["Moisture control", "Pest prevention", "Easy loading/unloading"],
                icon: PackageOpen
              },
              {
                title: "Cold Storage",
                description: "Refrigerated storage for perishable crops and products",
                capacity: "500kg - 2 tons",
                features: ["Refrigeration", "Backup power", "Temperature monitoring"],
                icon: ThermometerIcon
              },
            ].map((solution, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium flex items-center">
                    <solution.icon className="h-5 w-5 mr-2 text-leaf-600" />
                    {solution.title}
                  </CardTitle>
                  <CardDescription>
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Capacity:</span> {solution.capacity}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Key Features:</span>
                      <ul className="list-disc list-inside mt-1 pl-1 space-y-1">
                        {solution.features.map((feature, i) => (
                          <li key={i} className="text-muted-foreground text-xs">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Storage Conditions</CardTitle>
                <CardDescription>
                  Current conditions in your storage facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Temperature</span>
                      <span className="text-sm">24°C</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Humidity</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Oxygen Level</span>
                      <span className="text-sm">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Storage Capacity</CardTitle>
                <CardDescription>
                  Current utilization of your storage facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Grain Silo</span>
                      <span className="text-sm">70% Full</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cold Storage</span>
                      <span className="text-sm">30% Full</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div className="flex items-center p-3 rounded-md bg-yellow-50 border border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-800">
                    <Info className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" />
                    <span className="text-xs text-yellow-700 dark:text-yellow-300">
                      Grain silo humidity is slightly above recommended levels. Consider running dehumidifier.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Storage Best Practices
              </CardTitle>
              <CardDescription>
                Guides to help you minimize post-harvest losses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Grain Storage Techniques",
                    description: "Learn how to properly store grains to prevent mold and pests",
                    readTime: "5 min read"
                  },
                  {
                    title: "Vegetable Preservation",
                    description: "Best practices for storing and preserving fresh vegetables",
                    readTime: "7 min read"
                  },
                  {
                    title: "Solar Dryer Construction",
                    description: "Step-by-step guide to building a simple solar dryer",
                    readTime: "15 min read"
                  },
                ].map((guide, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{guide.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                      <Button variant="outline" size="sm">
                        Read Guide
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

export default Storage;
