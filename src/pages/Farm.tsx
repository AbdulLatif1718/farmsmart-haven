import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { CropRecommendationCard } from '@/components/dashboard/CropRecommendationCard';
import { IoTSensorsCard } from '@/components/dashboard/IoTSensorsCard';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';
import { KnowledgeHubCard } from '@/components/dashboard/KnowledgeHubCard';
import FarmGPT from '@/components/dashboard/FarmGPT';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, DollarSign, Home, BarChart3, Plus, TrendingUp, Sprout } from 'lucide-react';
import { FundingApplicationForm } from '@/components/FundingApplicationForm';
import { useAuth } from '@/hooks/useAuth';
import { useLocationSettings } from '@/hooks/useLocationSettings';
import { useWeather } from '@/hooks/useWeather';
import { Link, useNavigate } from 'react-router-dom';

const Farm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const { profile } = useAuth();
  const { location } = useLocationSettings();
  const { weather, loading: weatherLoading } = useWeather(location?.lat, location?.lon);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <MainLayout>
      <>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Farm Management</h1>
          <p className="text-muted-foreground text-lg">
            Manage your farms, track analytics, and optimize your operations
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <div className="overflow-x-auto mb-6">
            <TabsList className="inline-flex w-max min-w-full">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="farms" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                My Farms
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full max-w-[1200px] mx-auto">
                <FarmGPT />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="farms" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="col-span-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Farms</CardTitle>
                    <CardDescription>Manage and monitor your registered farms</CardDescription>
                  </div>
                  <Button onClick={() => navigate('/farm/add')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Farm
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="group hover:border-leaf-200 dark:hover:border-leaf-800 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <Badge variant="outline" className="font-normal">Active</Badge>
                          </div>
                          <Badge variant="secondary" className="font-normal">5.2 acres</Badge>
                        </div>
                        <div className="space-y-1">
                          <CardTitle>Green Valley Farm</CardTitle>
                          <CardDescription>Kumasi, Ashanti Region</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex items-center gap-4 mb-6 text-sm">
                          <div className="flex-1 space-y-1">
                            <p className="text-muted-foreground">Current Crops</p>
                            <div className="flex gap-1">
                              <Badge variant="outline">Maize</Badge>
                              <Badge variant="outline">Tomatoes</Badge>
                            </div>
                          </div>
                          <div className="w-px h-8 bg-border"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-muted-foreground">Health Score</p>
                            <p className="text-xl font-semibold text-green-600">92%</p>
                          </div>
                        </div>

                        <Button 
                          className="w-full group-hover:bg-leaf-600 group-hover:text-white transition-colors" 
                          variant="outline"
                          onClick={() => navigate('/farm/details/1', { replace: true })}
                        >
                          View Farm
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="col-span-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Overall Farm Performance</CardTitle>
                      <CardDescription>Combined insights from all your farming operations</CardDescription>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2,450 kg</div>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +15% vs last season
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">GHS 28,600</div>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +22% vs last season
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Cost/Acre</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">GHS 1,850</div>
                        <p className="text-xs text-leaf-600 flex items-center gap-1">
                          <span>●</span>
                          On target
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Farm Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">85/100</div>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +5 points
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-sm text-center text-muted-foreground">
                    Register more farms or add more data to see detailed analytics
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <FundingApplicationForm 
          isOpen={showFundingForm}
          onClose={() => setShowFundingForm(false)}
        />
      </>
    </MainLayout>
  );
};

export default Farm;
