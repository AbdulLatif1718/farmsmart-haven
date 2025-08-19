
import React from 'react';
import { CloudSun, Droplets, Wind, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { WeatherData } from '@/services/weatherService';

interface WeatherCardProps {
  weather?: WeatherData | null;
  isLoading?: boolean;
}

export const WeatherCard = ({ weather, isLoading = false }: WeatherCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-10 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-16 w-16 bg-muted rounded-full animate-pulse"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <CloudSun className="h-4 w-4 mr-2 text-sky-500" />
          Weather Forecast for {weather?.location || "Select Location"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">{weather?.temperature}°C</div>
            <div className="text-sm text-muted-foreground capitalize">{weather?.description}</div>
          </div>
          <div className="h-16 w-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
            {weather?.icon ? (
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="h-12 w-12"
              />
            ) : (
              <CloudSun className="h-10 w-10 text-sky-500" />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center">
            <Droplets className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-xs text-muted-foreground">Humidity</span>
            <span className="text-sm font-medium">{weather?.humidity || 0}%</span>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-xs text-muted-foreground">Wind</span>
            <span className="text-sm font-medium">{weather?.windSpeed || 0} km/h</span>
          </div>
          <div className="flex flex-col items-center">
            <Droplets className="h-5 w-5 text-sky-500 mb-1" />
            <span className="text-xs text-muted-foreground">Rain</span>
            <span className="text-sm font-medium">{weather?.rainChance || 0}%</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Soil Moisture</span>
            <span>{weather?.soilMoisture || 0}%</span>
          </div>
          <Progress value={weather?.soilMoisture || 0} className="h-2" />
        </div>
        
        {weather?.rainChance && weather.rainChance > 50 && (
          <div className="mt-3 text-xs text-leaf-600 dark:text-leaf-400 font-medium">
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
              Weather alert: High chance of rain
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
