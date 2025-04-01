
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { Cloud, CloudRain, CloudSun, Sun, Droplets, Wind, AlertCircle } from 'lucide-react';

const Weather = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Weather Forecast</h1>
        <p className="text-muted-foreground">
          Access detailed weather information for your farm location and plan your activities accordingly.
        </p>
      </div>
      
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="forecast">Daily Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
          <TabsTrigger value="history">Historical Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forecast">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <WeatherCard location="Accra Region" />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Weather Impact on Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                    <Sun className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Favorable Conditions</h4>
                      <p className="text-xs text-muted-foreground">
                        Current weather conditions are optimal for maize growth and development.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                    <CloudRain className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Expected Rainfall</h4>
                      <p className="text-xs text-muted-foreground">
                        Moderate rainfall expected in the coming days. Consider reducing irrigation to prevent waterlogging.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="font-medium text-lg mb-4">7-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { day: "Today", temp: "28°C", icon: CloudSun, description: "Partly Cloudy" },
              { day: "Tomorrow", temp: "27°C", icon: CloudRain, description: "Light Rain" },
              { day: "Wed", temp: "26°C", icon: CloudRain, description: "Showers" },
              { day: "Thu", temp: "26°C", icon: CloudRain, description: "Light Rain" },
              { day: "Fri", temp: "27°C", icon: CloudSun, description: "Partly Cloudy" },
              { day: "Sat", temp: "29°C", icon: Sun, description: "Sunny" },
              { day: "Sun", temp: "28°C", icon: Sun, description: "Sunny" }
            ].map((day, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3 text-center">
                  <div className="font-medium mb-1">{day.day}</div>
                  <day.icon className="h-8 w-8 mx-auto my-2 text-sky-500" />
                  <div className="text-lg font-bold">{day.temp}</div>
                  <div className="text-xs text-muted-foreground">{day.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="alerts">
          <div className="space-y-4">
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                  Weather Advisory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CloudRain className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Moderate Rainfall Expected</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        Rainfall of 20-30mm expected over the next three days across Accra Region.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Issued: Today at 8:30 AM • Valid until: Friday
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Wind className="h-4 w-4 mr-2 text-green-500" />
                  Farming Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Current and upcoming weather conditions are suitable for the following activities:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                      <Droplets className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Limited Irrigation</h4>
                      <p className="text-xs text-muted-foreground">
                        Due to expected rainfall
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                      <Cloud className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Pest Prevention</h4>
                      <p className="text-xs text-muted-foreground">
                        Humid conditions may increase pests
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historical Weather Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access historical weather patterns to better plan your farming activities.
                Historical data helps in understanding seasonal patterns and making informed decisions.
              </p>
              
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                Weather history chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Weather;
