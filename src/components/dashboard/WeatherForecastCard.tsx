import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForecastData, AgricultureInsight, getAgricultureInsights } from '@/services/weatherService';
import { CloudSun, Droplets, Wind, ArrowRight, Sprout, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherForecastCardProps {
  forecasts: ForecastData[];
  currentWeather: any;
  className?: string;
}

export const WeatherForecastCard = ({ forecasts, currentWeather, className }: WeatherForecastCardProps) => {
  const insights = getAgricultureInsights(currentWeather, forecasts);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const getMonthlyAverages = () => {
    const monthlyData = new Map<string, any[]>();
    
    forecasts.forEach(forecast => {
      const date = new Date(forecast.date);
      const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, []);
      }
      monthlyData.get(monthKey)?.push(forecast);
    });

    return Array.from(monthlyData.entries()).map(([month, data]) => ({
      month,
      avgTemp: Math.round(data.reduce((sum, f) => sum + f.temperature, 0) / data.length),
      avgRain: Math.round(data.reduce((sum, f) => sum + f.rainChance, 0) / data.length),
      avgHumidity: Math.round(data.reduce((sum, f) => sum + f.humidity, 0) / data.length)
    }));
  };

  const monthlyAverages = getMonthlyAverages();

  return (
    <Card className={cn("backdrop-blur-sm", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">6-Month Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Monthly Forecast */}
          <div className="grid gap-4">
            {monthlyAverages.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                    <CloudSun className="h-5 w-5 text-sky-500" />
                  </div>
                  <div>
                    <div className="font-medium">{month.month}</div>
                    <div className="text-sm text-muted-foreground">
                      Avg: {month.avgTemp}°C
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-sky-500" />
                    {month.avgRain}%
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-sky-500" />
                    {month.avgHumidity}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Agricultural Insights */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-500" />
              Agricultural Insights
            </h3>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-3 rounded-lg border",
                    insight.priority === 'high' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
                    insight.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-green-200 bg-green-50 dark:bg-green-900/20'
                  )}
                >
                  <div className="font-medium flex items-center gap-2">
                    {insight.priority === 'high' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {insight.title}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{insight.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
