
import React from 'react';
import { Leaf, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CropRecommendationCardProps {
  isLoading?: boolean;
}

export const CropRecommendationCard = ({ isLoading = false }: CropRecommendationCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-24 w-full bg-muted rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-9 w-full bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Leaf className="h-4 w-4 mr-2 text-leaf-600" />
          AI Crop Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-leaf-50 dark:bg-leaf-900/20 p-3 border border-leaf-100 dark:border-leaf-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 bg-leaf-100 dark:bg-leaf-800/50 rounded-md flex items-center justify-center">
              <Leaf className="h-6 w-6 text-leaf-600 dark:text-leaf-400" />
            </div>
            <div>
              <h3 className="font-medium">Maize (Corn)</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-leaf-600" />
                High market demand
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            Based on your soil conditions and the current weather patterns, 
            our AI recommends planting maize varieties suited for the upcoming season.
          </p>
          
          <div className="flex gap-2 mb-3 flex-wrap">
            <Badge variant="outline" className="bg-leaf-50 text-leaf-700 border-leaf-200 dark:bg-leaf-900/30 dark:text-leaf-300 dark:border-leaf-800">
              60-90 days growth
            </Badge>
            <Badge variant="outline" className="bg-leaf-50 text-leaf-700 border-leaf-200 dark:bg-leaf-900/30 dark:text-leaf-300 dark:border-leaf-800">
              Moderate water
            </Badge>
            <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800">
              Suitable climate
            </Badge>
          </div>
          
          <div className="flex items-center text-xs text-soil-700 dark:text-soil-300 bg-soil-50 dark:bg-soil-900/30 p-2 rounded-md mb-3">
            <AlertCircle className="h-3 w-3 mr-1" />
            Consider nitrogen-rich fertilizers for optimal yields
          </div>
          
          <Button className="w-full text-xs" size="sm">
            View detailed recommendation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
