
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
  MessageSquare,
  TrendingUp,
  Users,
  Award,
  Target,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  Wallet,
  BookOpen,
  Video
} from 'lucide-react';

const YouthDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dummy data
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
      location: "Northern Region"
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
      location: "Ashanti Region"
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
      location: "Greater Accra"
    }
  ];

  const trainings = [
    {
      id: 1,
      title: "Modern Irrigation Techniques",
      instructor: "Dr. Kwame Asante",
      date: "2025-05-26",
      time: "10:00 AM",
      duration: "3 hours",
      level: "Intermediate",
      enrolled: 45,
      maxCapacity: 50,
      type: "In-person",
      location: "Agricultural Training Center, Kumasi"
    },
    {
      id: 2,
      title: "Business Planning for Young Farmers",
      instructor: "Sarah Osei, MBA",
      date: "2025-05-28",
      time: "2:00 PM",
      duration: "4 hours",
      level: "Beginner",
      enrolled: 32,
      maxCapacity: 40,
      type: "Online",
      location: "Virtual Classroom"
    },
    {
      id: 3,
      title: "Sustainable Pest Management",
      instructor: "Prof. Agnes Mensah",
      date: "2025-06-02",
      time: "9:00 AM",
      duration: "5 hours",
      level: "Advanced",
      enrolled: 28,
      maxCapacity: 35,
      type: "Hybrid",
      location: "University of Ghana, Legon"
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Emmanuel Nkrumah",
      expertise: "Organic Farming & Certification",
      experience: "15 years",
      rating: 4.9,
      students: 23,
      nextAvailable: "Tomorrow, 2:00 PM",
      image: "EN"
    },
    {
      id: 2,
      name: "Akosua Dadzie",
      expertise: "Livestock Management",
      experience: "12 years",
      rating: 4.8,
      students: 31,
      nextAvailable: "May 26, 10:00 AM",
      image: "AD"
    },
    {
      id: 3,
      name: "Joseph Mensah",
      expertise: "Agricultural Finance",
      experience: "8 years",
      rating: 4.7,
      students: 18,
      nextAvailable: "May 27, 4:00 PM",
      image: "JM"
    }
  ];
  
  const notifications = [
    {
      id: 1,
      type: "funding",
      message: "You received ₵3,500 funding for Organic Maize Farm project",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "milestone",
      message: "Poultry Project milestone 3 completed successfully",
      time: "1 day ago",
      read: false
    },
    {
      id: 3,
      type: "training",
      message: "New irrigation training available - Register now",
      time: "2 days ago",
      read: true
    },
    {
      id: 4,
      type: "mentor",
      message: "Emmanuel Nkrumah scheduled a session for tomorrow",
      time: "3 days ago",
      read: true
    }
  ];
  
  const getBadgeColor = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200';
      case 'funding':
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
          <h1 className="text-3xl font-bold mb-2">Welcome back, Kwame!</h1>
          <p className="text-muted-foreground">
            Track your progress, manage projects, and grow your agricultural venture
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Funding</p>
                  <p className="text-2xl font-bold">₵23,500</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Training Hours</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mentorship Score</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Portfolio Overview</CardTitle>
                    <CardDescription>Quick view of your current agricultural projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.slice(0, 2).map((project) => (
                        <div key={project.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium">{project.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getBadgeColor(project.status)}>
                                  {project.status === 'funding' ? 'Seeking Funding' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </Badge>
                                <span className="text-sm text-muted-foreground flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {project.location}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              View Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Progress</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={project.progress} className="h-2 flex-1" />
                                <span className="text-sm font-medium">{project.progress}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Funding</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={project.fundingProgress} className="h-2 flex-1" />
                                <span className="text-sm font-medium">{project.fundingProgress}%</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{project.nextMilestone}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Projects</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Revenue & Growth Analytics</p>
                        <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                        <p className="text-xl font-bold text-green-600">₵4,200</p>
                        <p className="text-xs text-green-600">+12% from last month</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">ROI Average</p>
                        <p className="text-xl font-bold text-blue-600">23%</p>
                        <p className="text-xs text-blue-600">Above target</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="text-xl font-bold text-purple-600">89%</p>
                        <p className="text-xs text-purple-600">Excellent performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Recent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 hover:bg-muted transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}>
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

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="font-medium text-sm">Mentor Session</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM with Emmanuel Nkrumah</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <p className="font-medium text-sm">Training Workshop</p>
                      <p className="text-xs text-muted-foreground">May 26, Modern Irrigation Techniques</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3">
                      <p className="font-medium text-sm">Project Milestone</p>
                      <p className="text-xs text-muted-foreground">June 1, Harvest preparation deadline</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Project Portfolio</CardTitle>
                    <CardDescription>Manage and track all your agricultural projects</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getBadgeColor(project.status)}>
                              {project.status === 'funding' ? 'Seeking Funding' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {project.location}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{project.funding}</p>
                          <p className="text-xs text-muted-foreground">Current funding</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                        <div>
                          <p className="text-sm text-muted-foreground">Expected Return</p>
                          <p className="text-sm font-medium text-green-600">{project.expectedReturn}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Milestone</p>
                          <p className="text-sm font-medium">{project.nextMilestone}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Update Progress</Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Available Training Programs</CardTitle>
                <CardDescription>Enhance your skills with expert-led agricultural training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {trainings.map((training) => (
                    <Card key={training.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{training.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">by {training.instructor}</p>
                          </div>
                          <Badge variant={training.type === 'Online' ? 'secondary' : training.type === 'In-person' ? 'default' : 'outline'}>
                            {training.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Date & Time</p>
                            <p className="text-sm font-medium">{training.date}</p>
                            <p className="text-sm text-muted-foreground">{training.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="text-sm font-medium">{training.duration}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm">{training.location}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Enrolled: {training.enrolled}/{training.maxCapacity}</span>
                          <Badge variant="outline">{training.level}</Badge>
                        </div>
                        <Progress value={(training.enrolled / training.maxCapacity) * 100} className="h-2" />
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" disabled={training.enrolled >= training.maxCapacity}>
                          {training.enrolled >= training.maxCapacity ? 'Fully Booked' : 'Enroll Now'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mentors">
            <Card>
              <CardHeader>
                <CardTitle>Your Mentor Network</CardTitle>
                <CardDescription>Connect with experienced agricultural professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mentors.map((mentor) => (
                    <Card key={mentor.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="font-medium text-green-700">{mentor.image}</span>
                          </div>
                          <div>
                            <CardTitle className="text-base">{mentor.name}</CardTitle>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">{mentor.expertise}</p>
                          <p className="text-xs text-muted-foreground">{mentor.experience} experience</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{mentor.students} mentees</span>
                          <span className="font-medium text-green-600">Available</span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Next Available</p>
                          <p className="text-sm font-medium">{mentor.nextAvailable}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" className="flex-1">Book Session</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Track your skill development and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Crop Management</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Livestock Care</span>
                      <span className="text-sm text-muted-foreground">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Business Planning</span>
                      <span className="text-sm text-muted-foreground">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Financial Management</span>
                      <span className="text-sm text-muted-foreground">79%</span>
                    </div>
                    <Progress value={79} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Certifications</CardTitle>
                  <CardDescription>Your accomplishments and earned credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Organic Farming Certified</p>
                      <p className="text-xs text-muted-foreground">Completed May 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">First Project Success</p>
                      <p className="text-xs text-muted-foreground">Achieved 150% ROI target</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Community Leader</p>
                      <p className="text-xs text-muted-foreground">Mentored 5+ youth farmers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </YouthLayout>
  );
};

export default YouthDashboard;
