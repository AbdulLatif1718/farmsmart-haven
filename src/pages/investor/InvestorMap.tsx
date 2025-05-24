
import React from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  MapPin, 
  Navigation,
  Leaf,
  Bird
} from 'lucide-react';

const InvestorMap = () => {
  const projects = [
    {
      id: 1,
      name: "Sustainable Maize Farm",
      location: "Northern Region",
      type: "crop",
      status: "Active",
      coordinates: "9.4034°N, 0.8424°W"
    },
    {
      id: 2,
      name: "Organic Poultry Operation",
      location: "Ashanti Region", 
      type: "livestock",
      status: "Active",
      coordinates: "6.6885°N, 1.6244°W"
    }
  ];

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Project Locations</h1>
          <p className="text-muted-foreground">Geographic view of your investment projects across Ghana</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Interactive Map
            </CardTitle>
            <CardDescription>View all your projects on an interactive map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Interactive map integration coming soon</p>
                <p className="text-sm text-muted-foreground">Will show exact locations of all your investment projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Project Locations</h2>
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.type === 'crop' ? <Leaf className="h-5 w-5 text-green-600" /> : <Bird className="h-5 w-5 text-blue-600" />}
                      {project.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </CardDescription>
                  </div>
                  <Badge variant="default">{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Coordinates</p>
                    <p className="font-medium">{project.coordinates}</p>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <Badge variant="outline">
                      <Navigation className="h-3 w-3 mr-1" />
                      Get Directions
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </InvestorLayout>
  );
};

export default InvestorMap;
