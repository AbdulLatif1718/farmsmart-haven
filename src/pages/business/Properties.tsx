
import React from 'react';
import { BusinessLayout } from '@/components/layout/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Leaf, Droplet, MapPin } from 'lucide-react';

const Properties = () => {
  return (
    <BusinessLayout activeRole="landowner">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Properties</h1>
        <p className="text-muted-foreground">
          Manage your agricultural land and property listings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Total Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">3</div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
              25 acres combined
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Active Leases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">2</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
              18 acres under cultivation
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400 flex items-center">
              <Droplet className="h-4 w-4 mr-2" />
              Water Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">3</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
              2 rivers, 1 irrigation system
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">2</div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
              Northern and Eastern Regions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Property Portfolio</CardTitle>
          <CardDescription>Your land and property assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-muted-foreground py-10">
              Your property details will be displayed here
            </p>
            <Button className="w-full">Add New Property</Button>
          </div>
        </CardContent>
      </Card>
    </BusinessLayout>
  );
};

export default Properties;
