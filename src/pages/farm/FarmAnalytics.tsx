import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Droplets, 
  Thermometer,
  ArrowLeft,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmAnalytics = () => {
  const navigate = useNavigate();

  const analyticsData = [
    {
      title: 'Total Yield',
      value: '1,240 kg',
      change: '+12.5%',
      trend: 'up',
      description: 'This season vs last season'
    },
    {
      title: 'Revenue',
      value: 'GHS 18,600',
      change: '+8.2%',
      trend: 'up',
      description: 'Total income this season'
    },
    {
      title: 'Expenses',
      value: 'GHS 7,200',
      change: '-5.3%',
      trend: 'down',
      description: 'Operational costs'
    },
    {
      title: 'Profit Margin',
      value: '61.3%',
      change: '+15.1%',
      trend: 'up',
      description: 'Net profit percentage'
    }
  ];

  const monthlyData = [
    { month: 'Jan', yield: 180, revenue: 2400, expenses: 800 },
    { month: 'Feb', yield: 220, revenue: 2800, expenses: 950 },
    { month: 'Mar', yield: 300, revenue: 3600, expenses: 1200 },
    { month: 'Apr', yield: 280, revenue: 3200, expenses: 1100 },
    { month: 'May', yield: 260, revenue: 3000, expenses: 980 },
    { month: 'Jun', yield: 240, revenue: 2900, expenses: 920 }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Farm Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics for your farms
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{metric.title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yield Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Yield Trends
              </CardTitle>
              <CardDescription>Monthly yield performance over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{data.month}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(data.yield / 300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {data.yield}kg
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue vs Expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue vs Expenses
              </CardTitle>
              <CardDescription>Financial performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-muted-foreground">
                        Profit: GHS {data.revenue - data.expenses}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-green-600 mb-1">Revenue: GHS {data.revenue}</div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(data.revenue / 3600) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-red-600 mb-1">Expenses: GHS {data.expenses}</div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(data.expenses / 3600) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Environmental Conditions
              </CardTitle>
              <CardDescription>Average conditions affecting crop growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Thermometer className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-medium">Temperature</div>
                      <div className="text-sm text-muted-foreground">Average this month</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">28°C</div>
                    <div className="text-sm text-green-600">+2°C from last month</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Rainfall</div>
                      <div className="text-sm text-muted-foreground">Total this month</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">145mm</div>
                    <div className="text-sm text-blue-600">Above average</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Growing Days</div>
                      <div className="text-sm text-muted-foreground">Optimal conditions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">22 days</div>
                    <div className="text-sm text-green-600">73% of month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Crop Performance Breakdown</CardTitle>
              <CardDescription>Yield by crop type this season</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { crop: 'Maize', yield: 450, percentage: 36.3, color: 'bg-yellow-500' },
                  { crop: 'Tomatoes', yield: 320, percentage: 25.8, color: 'bg-red-500' },
                  { crop: 'Peppers', yield: 280, percentage: 22.6, color: 'bg-green-500' },
                  { crop: 'Onions', yield: 190, percentage: 15.3, color: 'bg-purple-500' }
                ].map((crop, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{crop.crop}</span>
                      <span className="text-sm text-muted-foreground">{crop.yield}kg ({crop.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`${crop.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${crop.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Based on your farm's performance data and environmental conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Optimal Planting Window
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Based on weather patterns, the next 2 weeks are ideal for planting your next maize crop. 
                  Expected yield increase of 15-20%.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Irrigation Optimization
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Current soil moisture levels suggest reducing irrigation by 20% for the next week. 
                  This could save GHS 200 in water costs.
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                  Market Timing
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Tomato prices are expected to peak in 3 weeks. Consider delaying harvest by 1 week 
                  to maximize revenue potential.
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                  Crop Diversification
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Adding sweet peppers to your crop mix could increase overall farm revenue by 12% 
                  based on market demand trends.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FarmAnalytics;