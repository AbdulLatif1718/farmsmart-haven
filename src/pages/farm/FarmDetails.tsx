import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { CropRecommendationCard } from '@/components/dashboard/CropRecommendationCard';
import { IoTSensorsCard } from '@/components/dashboard/IoTSensorsCard';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';
import { KnowledgeHubCard } from '@/components/dashboard/KnowledgeHubCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, DollarSign, ArrowLeft } from 'lucide-react';
import { FundingApplicationForm } from '@/components/FundingApplicationForm';
import { useAuth } from '@/hooks/useAuth';
import { useLocationSettings } from '@/hooks/useLocationSettings';
import { useWeather } from '@/hooks/useWeather';
import { useNavigate, useParams } from 'react-router-dom';

const FarmDetails = () => {
  const [loading, setLoading] = useState(true);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const { profile } = useAuth();
  const { location } = useLocationSettings();
  const { weather, loading: weatherLoading } = useWeather(location?.lat, location?.lon);
  const navigate = useNavigate();
  
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/farm')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Farms
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Green Valley Farm</h1>
              <p className="text-muted-foreground text-lg">
                Kumasi, Ashanti Region • 5.2 acres
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('analytics')}>
              View Analytics
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Monitoring Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather and IoT Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherCard weather={weather} isLoading={loading || weatherLoading} />
              <IoTSensorsCard isLoading={loading} />
            </div>

            {/* Alerts Section */}
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-base">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Weather Alert</p>
                    <p className="text-sm text-yellow-800/80 dark:text-yellow-200/80">Rainfall expected in next 24 hours. Irrigation schedules adjusted automatically.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Soil Moisture Alert</p>
                    <p className="text-sm text-red-800/80 dark:text-red-200/80">Sector B moisture levels below threshold. Auto-irrigation initiated.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sensor Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Real-Time Sensor Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Soil Moisture</span>
                      <span className="text-sm text-leaf-600">Good</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">68%</div>
                    <p className="text-xs text-muted-foreground">Average across all sectors</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Temperature</span>
                      <span className="text-sm text-yellow-600">Moderate</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">28°C</div>
                    <p className="text-xs text-muted-foreground">Ground level</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Humidity</span>
                      <span className="text-sm text-green-600">Optimal</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">75%</div>
                    <p className="text-xs text-muted-foreground">Atmospheric</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Equipment Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Irrigation Controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Irrigation System</h4>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      Start Manual
                    </Button>
                    <Button variant="outline" className="w-full">
                      Stop
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Auto-mode:</span>
                    <Badge variant="outline" className="text-xs">Enabled</Badge>
                  </div>
                </div>

                {/* Sprinkler Controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Sprinkler System</h4>
                    <Badge variant="secondary">Standby</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      Activate
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      Stop
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Last active:</span>
                    <span className="text-xs">2 hours ago</span>
                  </div>
                </div>

                {/* Greenhouse Controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Greenhouse Climate</h4>
                    <Badge variant="success">Optimal</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      Ventilation
                    </Button>
                    <Button variant="outline" className="w-full">
                      Shading
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">Temperature:</span>
                    <span className="text-xs">26°C (Target: 25-27°C)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Battery Level</span>
                    <span className="text-sm font-medium text-green-600">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network Signal</span>
                    <span className="text-sm font-medium text-leaf-600">Strong</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Update</span>
                    <span className="text-sm text-muted-foreground">2 mins ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <FundingApplicationForm 
          isOpen={showFundingForm}
          onClose={() => setShowFundingForm(false)}
        />
      </>
    </MainLayout>
  );
};

export default FarmDetails;
