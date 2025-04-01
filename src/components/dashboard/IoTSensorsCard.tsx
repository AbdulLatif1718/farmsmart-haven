
import React from 'react';
import { WifiIcon, Droplets, Thermometer, Bug } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface IoTSensorsCardProps {
  isLoading?: boolean;
}

export const IoTSensorsCard = ({ isLoading = false }: IoTSensorsCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-6 w-40 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center space-y-1">
                <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Simulated sensor data
  const sensorData = [
    { name: "Soil Moisture", value: 42, unit: "%", icon: Droplets, color: "sky" },
    { name: "Soil Temperature", value: 24, unit: "°C", icon: Thermometer, color: "yellow" },
    { name: "Pest Detection", value: 5, unit: "alerts", icon: Bug, color: "red" }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <WifiIcon className="h-4 w-4 mr-2 text-sky-500" />
          IoT Sensor Data
          <span className="ml-2 h-2 w-2 rounded-full bg-leaf-500 animate-pulse"></span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sensorData.map((sensor, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <sensor.icon 
                    className={`h-4 w-4 mr-2 ${
                      sensor.color === "sky" 
                        ? "text-sky-500" 
                        : sensor.color === "yellow" 
                        ? "text-yellow-500" 
                        : "text-red-500"
                    }`} 
                  />
                  <span className="text-sm">{sensor.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {sensor.value} {sensor.unit}
                </span>
              </div>
              <Progress 
                value={sensor.name === "Soil Moisture" ? sensor.value : 
                       sensor.name === "Soil Temperature" ? (sensor.value / 40) * 100 : 
                       (sensor.value / 10) * 100} 
                className={`h-2 ${
                  sensor.color === "sky" 
                    ? "bg-sky-100 dark:bg-sky-950" 
                    : sensor.color === "yellow" 
                    ? "bg-yellow-100 dark:bg-yellow-950" 
                    : "bg-red-100 dark:bg-red-950"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Last updated: 5 mins ago</span>
          <span className="text-xs font-medium text-leaf-600 dark:text-leaf-400 flex items-center">
            <WifiIcon className="h-3 w-3 mr-1" />
            3/3 sensors online
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
