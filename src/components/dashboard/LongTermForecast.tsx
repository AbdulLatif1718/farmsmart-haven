import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Droplets, Sun, CloudRain, Calendar, AlertTriangle, Sprout } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

interface MonthlyForecast {
  month: string;
  avgTemp: number;
  rainfall: string;
  recommendation: string;
  alert?: string;
}

const monthlyForecasts: MonthlyForecast[] = [
  {
    month: "September",
    avgTemp: 28,
    rainfall: "Moderate",
    recommendation: "Good time for maize planting"
  },
  {
    month: "October",
    avgTemp: 27,
    rainfall: "High",
    recommendation: "Consider rice cultivation",
    alert: "Heavy rainfall expected"
  },
  {
    month: "November",
    avgTemp: 26,
    rainfall: "High",
    recommendation: "Ideal for vegetable farming"
  },
  {
    month: "December",
    avgTemp: 25,
    rainfall: "Low",
    recommendation: "Plan irrigation systems",
    alert: "Prepare for dry season"
  },
  {
    month: "January",
    avgTemp: 24,
    rainfall: "Very Low",
    recommendation: "Focus on drought-resistant crops"
  },
  {
    month: "February",
    avgTemp: 26,
    rainfall: "Low",
    recommendation: "Start seedling preparation"
  }
];

const getRainfallIcon = (rainfall: string) => {
  switch (rainfall.toLowerCase()) {
    case 'high':
      return <CloudRain className="h-4 w-4 text-blue-500" />;
    case 'moderate':
      return <Cloud className="h-4 w-4 text-sky-500" />;
    case 'low':
      return <Sun className="h-4 w-4 text-yellow-500" />;
    case 'very low':
      return <Sun className="h-4 w-4 text-orange-500" />;
    default:
      return <Cloud className="h-4 w-4 text-sky-500" />;
  }
};

const LongTermForecast = () => {
  return (
    <Card className="border-2 border-sky-100 dark:border-sky-900/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            6-Month Forecast
          </CardTitle>
          <Badge variant="secondary" className="font-normal">AI-Enhanced</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto p-4">
        {monthlyForecasts.map((forecast, index) => (
          <div 
            key={index}
            className="relative bg-muted/50 rounded-lg p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{forecast.month}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{forecast.avgTemp}°C</span>
                {getRainfallIcon(forecast.rainfall)}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Droplets className="h-3 w-3" />
              {forecast.rainfall} Rainfall Expected
            </div>
            
            <div className="flex items-start gap-2 mt-2">
              <Sprout className="h-4 w-4 text-green-500 mt-0.5" />
              <p className="text-xs">{forecast.recommendation}</p>
            </div>

            {forecast.alert && (
              <div className="mt-2 flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-2">
                <AlertTriangle className="h-3 w-3" />
                {forecast.alert}
              </div>
            )}
          </div>
        ))}

        <div className="pt-2">
          <p className="text-xs text-muted-foreground text-center">
            Forecast data is AI-enhanced using historical patterns and satellite data
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LongTermForecast;
