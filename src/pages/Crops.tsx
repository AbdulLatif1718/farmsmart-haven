
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Plant, Sprout, Wheat } from 'lucide-react';

const Crops = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Crop Recommendations</h1>
        <p className="text-muted-foreground">
          Get AI-powered crop recommendations based on your soil conditions, weather patterns, and market demand.
        </p>
      </div>
      
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="planting">Planting Calendar</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Maize", 
                icon: Wheat, 
                description: "Highly recommended based on your soil type and upcoming weather conditions",
                confidence: "92%",
                color: "green"
              },
              { 
                title: "Cassava", 
                icon: Sprout, 
                description: "Good match for your region with moderate rainfall expected",
                confidence: "78%",
                color: "blue"
              },
              { 
                title: "Sweet Potato", 
                icon: Plant, 
                description: "Suitable for your sandy soil and current season",
                confidence: "65%",
                color: "amber"
              },
            ].map((crop, index) => (
              <Card key={index} className={`border-${crop.color}-200 dark:border-${crop.color}-800`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium flex items-center">
                      <crop.icon className={`h-5 w-5 mr-2 text-${crop.color}-500`} />
                      {crop.title}
                    </CardTitle>
                    <span className={`text-xs font-medium bg-${crop.color}-100 text-${crop.color}-800 dark:bg-${crop.color}-900/30 dark:text-${crop.color}-300 px-2 py-0.5 rounded-full`}>
                      {crop.confidence} match
                    </span>
                  </div>
                  <CardDescription>
                    {crop.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Planting season:</span> Current season
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Expected yield:</span> Above average
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Market demand:</span> High
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="planting">
          <Card>
            <CardHeader>
              <CardTitle>Planting Calendar</CardTitle>
              <CardDescription>
                Optimal planting times based on your location and crop selections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                Planting calendar will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Crop History</CardTitle>
              <CardDescription>
                View your past crop performance and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                Crop history will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Crops;
