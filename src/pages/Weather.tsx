
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  CloudRain, 
  CloudSun, 
  Sun, 
  Droplets, 
  Wind, 
  AlertCircle, 
  Calendar, 
  ArrowRight,
  BarChart,
  TrendingUp,
  Tractor
} from 'lucide-react';

const Weather = () => {
  
  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Weather Intelligence</h1>
          <p className="text-muted-foreground">
            Get accurate weather data and smart agricultural insights to optimize your farming decisions.
          </p>
        </div>
        
      </div>
      
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="forecast">Daily Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
          <TabsTrigger value="impact">Business Impact</TabsTrigger>
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
        
        <TabsContent value="impact">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-leaf-600" />
                    Weather Impact on Investments
                  </CardTitle>
                  <CardDescription>
                    How current weather patterns affect agricultural investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-leaf-100 rounded-full flex items-center justify-center mr-3">
                            <Tractor className="h-5 w-5 text-leaf-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Maize Cultivation Projects</h3>
                            <p className="text-xs text-muted-foreground">3 active investments</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Low Risk
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        Current rainfall patterns are favorable for maize growth in the Northern Region. Expected yield increase of 5-10%.
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Projected ROI:</span>
                        <span className="font-medium text-green-600">+23% (↑3%)</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-leaf-100 rounded-full flex items-center justify-center mr-3">
                            <Tractor className="h-5 w-5 text-leaf-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Rice Farming Projects</h3>
                            <p className="text-xs text-muted-foreground">2 active investments</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Moderate Risk
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3">
                        Expected heavy rainfall may affect rice paddies in Volta Region. Consider drainage solutions for optimal yields.
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Projected ROI:</span>
                        <span className="font-medium text-yellow-600">+18% (↓2%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Investment Weather Impacts
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Weather Risk Index</CardTitle>
                  <CardDescription>
                    Current risk level for agricultural investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-8 border-green-100 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-green-600">Low</span>
                    </div>
                    <p className="text-sm text-center text-muted-foreground mb-4">
                      Overall weather conditions are favorable for most agricultural activities in your invested regions.
                    </p>
                    <div className="w-full grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-muted rounded-md">
                        <div className="text-xs text-muted-foreground">Crops</div>
                        <div className="font-medium text-green-600">Low</div>
                      </div>
                      <div className="p-2 bg-muted rounded-md">
                        <div className="text-xs text-muted-foreground">Livestock</div>
                        <div className="font-medium text-green-600">Low</div>
                      </div>
                      <div className="p-2 bg-muted rounded-md">
                        <div className="text-xs text-muted-foreground">Transport</div>
                        <div className="font-medium text-yellow-600">Medium</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Weather Alerts for Landowners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                        Soil Erosion Risk
                      </h4>
                      <p className="text-xs text-muted-foreground my-1">
                        Moderate risk of soil erosion in Eastern Region due to expected rainfall.
                      </p>
                      <Button variant="ghost" size="sm" className="w-full mt-1 text-xs">
                        View Prevention Measures
                      </Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-green-500" />
                        Irrigation Alert
                      </h4>
                      <p className="text-xs text-muted-foreground my-1">
                        No irrigation needed for Northern Region properties this week.
                      </p>
                      <Button variant="ghost" size="sm" className="w-full mt-1 text-xs">
                        View Water Management
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-leaf-600" />
                Historical Weather Analysis
              </CardTitle>
              <CardDescription>
                Access weather patterns and agricultural performance data to inform your investment decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-base font-medium mb-2">Select Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Region</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>All Regions</option>
                      <option>Accra Region</option>
                      <option>Northern Region</option>
                      <option>Volta Region</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Metric</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>Rainfall</option>
                      <option>Temperature</option>
                      <option>Humidity</option>
                      <option>Soil Moisture</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Time Period</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>Last 12 Months</option>
                      <option>Last 3 Years</option>
                      <option>Last 5 Years</option>
                      <option>Last 10 Years</option>
                    </select>
                  </div>
                </div>
                <Button className="bg-leaf-600 hover:bg-leaf-700">
                  Generate Analysis
                </Button>
              </div>
              
              <div className="h-64 bg-muted rounded-md flex items-center justify-center mb-4">
                <div className="text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Weather history chart will be displayed here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select parameters and generate analysis to view data
                  </p>
                </div>
              </div>
              
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Weather;
