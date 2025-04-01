
import React from 'react';
import { ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MarketplaceCardProps {
  isLoading?: boolean;
}

export const MarketplaceCard = ({ isLoading = false }: MarketplaceCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-6 w-36 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="flex justify-between py-2 border-b border-border">
                <div className="space-y-1">
                  <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
            <div className="h-9 w-full bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Mock market price data
  const marketPrices = [
    { crop: "Maize", price: "₵450", change: 5.2, unit: "per 100kg" },
    { crop: "Rice", price: "₵670", change: -2.1, unit: "per 100kg" },
    { crop: "Cassava", price: "₵320", change: 1.8, unit: "per 100kg" },
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <ShoppingCart className="h-4 w-4 mr-2 text-soil-500" />
          Market Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {marketPrices.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between py-2 border-b border-border last:border-0"
            >
              <div>
                <div className="font-medium">{item.crop}</div>
                <div className="text-xs text-muted-foreground">{item.unit}</div>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">{item.price}</span>
                <span className={`text-xs flex items-center ${
                  item.change > 0 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {item.change > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-3 text-xs">
          View marketplace
        </Button>
      </CardContent>
    </Card>
  );
};
