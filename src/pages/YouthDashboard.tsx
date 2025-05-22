import React, { useState } from 'react';
import { YouthLayout } from "@/components/layout/YouthLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PlusCircle, 
  Leaf, 
  Bird, 
  Bell, 
  Calendar, 
  BarChart3, 
  Cloud,
  MessageSquare
} from 'lucide-react';

const YouthDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Dummy data
  const projects = [
    {
      id: 1,
      name: "Maize Farm",
      type: "crop",
      status: "active",
      progress: 65,
      funding: "₵12,500",
      nextMilestone: "Harvest (15 days)",
    },
    {
      id: 2,
      name: "Poultry Project",
      type: "livestock",
      status: "pending",
      progress: 30,
      funding: "₵8,000",
      nextMilestone: "Health checkup (2 days)",
    },
    {
      id: 3,
      name: "Rice Cultivation",
      type: "crop",
      status: "completed",
      progress: 100,
      funding: "₵15,000",
      nextMilestone: "Final report due",
    }
  ];
  
  const notifications = [
    {
      id: 1,
      type: "funding",
      message: "You received ₵2,500 funding for Maize Farm project",
      time: "1 hour ago"
    },
    {
      id: 2,
      type: "feedback",
      message: "Agronomist left feedback on your soil preparation techniques",
      time: "Yesterday"
    },
    {
      id: 3,
      type: "training",
      message: "New pest management training available next week",
      time: "2 days ago"
    },
    {
      id: 4,
      type: "milestone",
      message: "Poultry Project milestone 2 approved",
      time: "3 days ago"
    }
  ];
  
  const getBadgeColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200';
      default:
        return '';
    }
  };

  return (
    <YouthLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Youth Agripreneur Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your agricultural projects and track your progress
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-100 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle>Welcome, Kwame!</CardTitle>
              <CardDescription>
                Your farming journey is progressing well
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Overall Progress</p>
                    <p className="text-2xl font-bold">65%</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Project
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Leaf className="mr-2 h-4 w-4" />
                        <span>New Crop Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bird className="mr-2 h-4 w-4" />
                        <span>New Livestock Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Progress value={65} className="h-2" />
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-muted-foreground">Active Projects</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-muted-foreground">Total Funding</p>
                    <p className="text-2xl font-bold">₵20,500</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-muted-foreground">Mentors</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-muted-foreground">Training Hours</p>
                    <p className="text-2xl font-bold">48</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 hover:bg-muted transition-colors">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="projects" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Portfolio</CardTitle>
                <CardDescription>Manage and track all your agricultural projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Funding</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Next Milestone</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.name}</TableCell>
                          <TableCell>
                            {project.type === 'crop' ? (
                              <div className="flex items-center">
                                <Leaf className="h-4 w-4 mr-1 text-green-600" />
                                <span>Crop</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Bird className="h-4 w-4 mr-1 text-blue-600" />
                                <span>Livestock</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{project.funding}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={project.progress} className="h-2 w-20" />
                              <span className="text-xs font-medium">{project.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{project.nextMilestone}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Available Training</CardTitle>
                <CardDescription>Skills development and agricultural education</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Soil Management</CardTitle>
                      <CardDescription>Intermediate Level</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Learn advanced techniques for soil fertility management and conservation.</p>
                      <div className="flex items-center mt-3 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Next Session: May 25, 2025</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Livestock Health</CardTitle>
                      <CardDescription>Beginner Level</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Essential practices for maintaining animal health and preventing disease.</p>
                      <div className="flex items-center mt-3 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Next Session: May 28, 2025</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Financial Management</CardTitle>
                      <CardDescription>Intermediate Level</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Learn how to manage farm finances, budgeting, and investment planning.</p>
                      <div className="flex items-center mt-3 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Next Session: June 2, 2025</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Analytics and statistics for your agricultural projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2">Farm performance analytics will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-all hover:border-green-200 dark:hover:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Cloud className="h-4 w-4 mr-2 text-blue-500" />
                Weather Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Check the latest weather forecasts for optimal planning</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Forecasts</Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-all hover:border-green-200 dark:hover:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                Technical Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Connect with agriculture experts for advice and guidance</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Request Support</Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-all hover:border-green-200 dark:hover:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Agricultural events, workshops, and networking opportunities</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Calendar</Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-all hover:border-green-200 dark:hover:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-green-500" />
                Market Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Current market prices for various agricultural products</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Check Prices</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </YouthLayout>
  );
};

export default YouthDashboard;
