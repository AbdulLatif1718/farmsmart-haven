
import React from 'react';
import { CloudSun, Droplets, Wind, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  weather?: WeatherData | null;
  isLoading?: boolean;
  className?: string;
}

export const WeatherCard = ({ weather, isLoading = false, className }: WeatherCardProps) => {
  if (isLoading) {
    return (
      <Card className={cn("backdrop-blur-sm", className)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-16 w-16 bg-muted rounded-full animate-pulse"></div>
          </div>
          <div className="mt-4 flex justify-between gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 flex-1 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const hasAlert = weather?.rainChance && weather.rainChance > 50;
  
  return (
    <Card className={cn("backdrop-blur-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather?.temperature}°C</div>
            <div className="text-sm text-muted-foreground capitalize flex items-center gap-2">
              <CloudSun className="h-4 w-4 text-sky-500" />
              {weather?.description || "Loading weather data..."}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {weather?.location || "Loading location..."}
            </div>
          </div>
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-800/30 flex items-center justify-center shadow-inner">
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
        
        <div className="grid grid-cols-3 gap-4 mt-6 bg-muted/50 rounded-lg p-3">
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
        
        {hasAlert && (
          <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 font-medium bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <span className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              High chance of rainfall expected
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
