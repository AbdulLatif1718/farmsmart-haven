
import React, { useState } from 'react';
import { YouthLayout } from "@/components/layout/YouthLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Users,
  Leaf,
  Bird,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const YouthProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = [
    {
      id: 1,
      name: "Organic Maize Farm",
      type: "crop",
      status: "active",
      progress: 75,
      funding: "₵15,500",
      fundingProgress: 85,
      nextMilestone: "Harvest preparation (8 days)",
      investor: "Green Impact Fund",
      startDate: "2025-01-15",
      expectedReturn: "₵18,600",
      location: "Northern Region",
      description: "Sustainable organic maize cultivation using modern irrigation techniques and eco-friendly pest management."
    },
    {
      id: 2,
      name: "Free-Range Poultry",
      type: "livestock",
      status: "funding",
      progress: 30,
      funding: "₵8,000",
      fundingProgress: 60,
      nextMilestone: "Complete funding (₵5,000 needed)",
      investor: "Youth AgriVenture",
      startDate: "2025-02-01",
      expectedReturn: "₵12,000",
      location: "Ashanti Region",
      description: "Free-range chicken farming with focus on organic feed and sustainable practices."
    },
    {
      id: 3,
      name: "Vegetable Greenhouse",
      type: "crop",
      status: "completed",
      progress: 100,
      funding: "₵12,000",
      fundingProgress: 100,
      nextMilestone: "Final report submitted",
      investor: "Sustainable Farms Co.",
      startDate: "2024-10-01",
      expectedReturn: "₵16,200",
      location: "Greater Accra",
      description: "Controlled environment agriculture producing premium vegetables year-round."
    }
  ];

  const getBadgeColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'funding':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return '';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <YouthLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Manage and track your agricultural ventures</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button 
              variant={filterStatus === 'active' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('active')}
            >
              Active
            </Button>
            <Button 
              variant={filterStatus === 'funding' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('funding')}
            >
              Seeking Funding
            </Button>
            <Button 
              variant={filterStatus === 'completed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
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
                  <Badge className={getBadgeColor(project.status)}>
                    {project.status === 'funding' ? 'Seeking Funding' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Project Progress</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={project.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Funding Progress</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={project.fundingProgress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{project.fundingProgress}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current Funding</p>
                    <p className="font-medium">{project.funding}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected Return</p>
                    <p className="font-medium text-green-600">{project.expectedReturn}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Next Milestone</p>
                  <p className="text-sm font-medium">{project.nextMilestone}</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Update Progress
                </Button>
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filters' : 'Get started by creating your first agricultural project'}
            </p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </YouthLayout>
  );
};

export default YouthProjects;
