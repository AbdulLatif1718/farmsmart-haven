
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { CropRecommendationCard } from '@/components/dashboard/CropRecommendationCard';
import { IoTSensorsCard } from '@/components/dashboard/IoTSensorsCard';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';
import { KnowledgeHubCard } from '@/components/dashboard/KnowledgeHubCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <MainLayout>
      {showWelcome && (
        <Card className="mb-6 border-leaf-200 dark:border-leaf-800 bg-gradient-to-r from-leaf-50 to-leaf-100 dark:from-leaf-900/30 dark:to-leaf-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Welcome to AgriVerse Africa</CardTitle>
            <CardDescription>
              Your personal AI-powered farming assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Get personalized crop recommendations, real-time weather updates, and access to market prices, all in one platform.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              className="text-xs"
              onClick={() => setShowWelcome(false)}
            >
              Dismiss
            </Button>
            <Button className="text-xs">Take the tour</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <WeatherCard isLoading={loading} />
            <IoTSensorsCard isLoading={loading} />
          </div>
          
          <Card className="mb-6 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
            <CardContent className="p-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                Weather alert: Moderate rainfall expected over the next 3 days. Consider adjusting irrigation schedules.
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CropRecommendationCard isLoading={loading} />
            <MarketplaceCard isLoading={loading} />
          </div>
        </div>
        
        <div className="col-span-1">
          <KnowledgeHubCard isLoading={loading} />
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="text-sm">Add Farm</span>
                  <span className="text-xs text-muted-foreground mt-1">Register a new farm</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="text-sm">Record Harvest</span>
                  <span className="text-xs text-muted-foreground mt-1">Log your yields</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="text-sm">Find Transport</span>
                  <span className="text-xs text-muted-foreground mt-1">Book a delivery</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="text-sm">Rent Equipment</span>
                  <span className="text-xs text-muted-foreground mt-1">Browse machinery</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
