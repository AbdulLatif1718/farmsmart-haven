
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KnowledgeHubCardProps {
  isLoading?: boolean;
}

export const KnowledgeHubCard = ({ isLoading = false }: KnowledgeHubCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-6 w-40 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-5 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-20 w-full bg-muted rounded animate-pulse"></div>
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
          <BookOpen className="h-4 w-4 mr-2 text-leaf-600" />
          Knowledge Hub
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium mb-2">Featured Article</h3>
        
        <div className="border border-border rounded-md overflow-hidden mb-3">
          <div className="h-32 bg-muted flex items-center justify-center text-muted-foreground">
            Sustainable farming practices image
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm">Sustainable Farming Practices for Ghanaian Climate</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Learn about climate-smart agriculture techniques suitable for Ghana's diverse ecological zones.
            </p>
          </div>
        </div>
        
        <Button variant="outline" className="w-full text-xs">
          Explore more resources
        </Button>
        
        <div className="mt-3 pt-3 border-t border-border">
          <span className="text-xs text-leaf-600 dark:text-leaf-400 font-medium">
            New resources available (3)
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-leaf-50 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-300">
              Soil health
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-leaf-50 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-300">
              Pest control
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-leaf-50 text-leaf-700 dark:bg-leaf-900/30 dark:text-leaf-300">
              Water management
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
