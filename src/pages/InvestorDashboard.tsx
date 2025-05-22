
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  SlidersHorizontal, 
  TrendingUp, 
  Wallet, 
  Heart, 
  AlertCircle,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  // Dummy data
  const projectsData = [
    {
      id: 1,
      name: "Maize Farm Expansion",
      type: "crop",
      region: "Greater Accra",
      youth: "Kwame A.",
      avatar: "KA",
      fundingNeeded: "₵15,000",
      fundingReceived: "₵8,400",
      progress: 56,
      verifiedScore: 4.5,
      description: "Expanding existing maize farm from 2 to 5 acres with irrigation system."
    },
    {
      id: 2,
      name: "Poultry Production",
      type: "livestock",
      region: "Eastern",
      youth: "Ama B.",
      avatar: "AB",
      fundingNeeded: "₵12,000",
      fundingReceived: "₵3,600",
      progress: 30,
      verifiedScore: 4.2,
      description: "Setting up a 500-capacity poultry farm with modern equipment."
    },
    {
      id: 3,
      name: "Rice Cultivation",
      type: "crop",
      region: "Northern",
      youth: "Ibrahim C.",
      avatar: "IC",
      fundingNeeded: "₵20,000",
      fundingReceived: "₵18,000",
      progress: 90,
      verifiedScore: 4.8,
      description: "Rice farming project using sustainable methods on 6 acres."
    },
    {
      id: 4,
      name: "Fish Farming",
      type: "livestock",
      region: "Volta",
      youth: "Efua D.",
      avatar: "ED",
      fundingNeeded: "₵18,500",
      fundingReceived: "₵4,625",
      progress: 25,
      verifiedScore: 3.9,
      description: "Tilapia farm with 4 ponds and processing facility."
    },
    {
      id: 5,
      name: "Cassava Processing",
      type: "processing",
      region: "Western",
      youth: "Kofi E.",
      avatar: "KE",
      fundingNeeded: "₵25,000",
      fundingReceived: "₵6,250",
      progress: 25,
      verifiedScore: 4.0,
      description: "Small-scale cassava processing plant for gari and flour production."
    }
  ];
  
  const myInvestments = [
    {
      id: 1,
      project: "Cocoa Farm Rehabilitation",
      youth: "David F.",
      amount: "₵10,000",
      returnRate: "15% annually",
      nextPayout: "30 days",
      status: "on track",
      milestones: [
        { name: "Land preparation", status: "completed" },
        { name: "Planting", status: "completed" },
        { name: "First maintenance", status: "in-progress" },
        { name: "Harvesting", status: "pending" }
      ]
    },
    {
      id: 2,
      project: "Vegetable Greenhouse",
      youth: "Sarah G.",
      amount: "₵8,000",
      returnRate: "20% annually",
      nextPayout: "45 days",
      status: "delayed",
      milestones: [
        { name: "Structure building", status: "completed" },
        { name: "Irrigation setup", status: "completed" },
        { name: "Planting", status: "in-progress" },
        { name: "First harvest", status: "pending" }
      ]
    },
    {
      id: 3,
      project: "Mango Farm",
      youth: "Joseph H.",
      amount: "₵12,000",
      returnRate: "18% annually",
      nextPayout: "60 days",
      status: "on track",
      milestones: [
        { name: "Land preparation", status: "completed" },
        { name: "Planting", status: "completed" },
        { name: "Maintenance", status: "in-progress" },
        { name: "Harvesting", status: "pending" }
      ]
    }
  ];
  
  const notifications = [
    {
      id: 1,
      type: "update",
      message: "Cocoa Farm project reached a new milestone",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "report",
      message: "Impact report for Vegetable Greenhouse is available",
      time: "Yesterday"
    },
    {
      id: 3,
      type: "new",
      message: "5 new agricultural projects available for funding",
      time: "2 days ago"
    },
    {
      id: 4,
      type: "payout",
      message: "You received a payout of ₵1,500 from Mango Farm",
      time: "3 days ago"
    }
  ];
  
  const filteredProjects = projectsData.filter(project => 
    (selectedRegion === 'all' || project.region === selectedRegion) &&
    (project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     project.youth.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getMilestoneIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'on track':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">On Track</Badge>;
      case 'delayed':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Delayed</Badge>;
      case 'at risk':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">At Risk</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Investor Dashboard</h1>
        <p className="text-muted-foreground">
          Discover, fund, and track youth-led agricultural projects
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">₵30,000</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
              Across 3 projects
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              Expected Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">₵35,400</div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
              ~18% average ROI
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Impact Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">85</div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
              Supporting 24 youth jobs
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="discover" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="discover">Discover Projects</TabsTrigger>
          <TabsTrigger value="investments">My Investments</TabsTrigger>
          <TabsTrigger value="reports">Impact Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Browse Youth Projects</CardTitle>
              <CardDescription>
                Find and support promising agricultural projects led by youth entrepreneurs
              </CardDescription>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects or youth agripreneurs..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="bg-background border rounded-md px-3 py-2 text-sm"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="all">All Regions</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Northern">Northern</option>
                    <option value="Western">Western</option>
                    <option value="Volta">Volta</option>
                  </select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden border border-muted hover:border-primary/50 transition-all">
                    <div className="h-32 bg-muted/50 relative">
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white text-slate-700">
                          <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                          {project.verifiedScore}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-base">{project.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {project.region}
                          </CardDescription>
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {project.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Progress</span>
                            <span className="font-medium">
                              {project.fundingReceived} of {project.fundingNeeded}
                            </span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Led by</span>
                          <span>{project.youth}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Type</span>
                          <span className="capitalize">{project.type}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">View Details</Button>
                      <Button className="flex-1">Invest Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Load More Projects</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>My Investment Portfolio</CardTitle>
              <CardDescription>
                Track your investments and monitor project milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Youth</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Return Rate</TableHead>
                    <TableHead>Next Payout</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myInvestments.map((investment) => (
                    <TableRow key={investment.id}>
                      <TableCell className="font-medium">{investment.project}</TableCell>
                      <TableCell>{investment.youth}</TableCell>
                      <TableCell>{investment.amount}</TableCell>
                      <TableCell>{investment.returnRate}</TableCell>
                      <TableCell>{investment.nextPayout}</TableCell>
                      <TableCell>{getStatusBadge(investment.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Milestone Tracking</h3>
                
                {myInvestments.map((investment) => (
                  <Card key={`milestone-${investment.id}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{investment.project}</CardTitle>
                      <CardDescription>{investment.youth}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {investment.milestones.map((milestone, index) => (
                          <li key={index} className="flex items-center gap-2">
                            {getMilestoneIcon(milestone.status)}
                            <span className="flex-1">{milestone.name}</span>
                            <Badge className="capitalize">{milestone.status}</Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">View Project Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Impact Reports</CardTitle>
              <CardDescription>
                See how your investments are making a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2">Impact reports and analytics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payouts</CardTitle>
              <CardDescription>
                Schedule of expected returns from your investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium">Cocoa Farm Rehabilitation</p>
                    <p className="text-sm text-muted-foreground">30 days remaining</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₵1,500</p>
                    <p className="text-sm text-muted-foreground">15% return</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium">Vegetable Greenhouse</p>
                    <p className="text-sm text-muted-foreground">45 days remaining</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₵1,600</p>
                    <p className="text-sm text-muted-foreground">20% return</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                  <div>
                    <p className="font-medium">Mango Farm</p>
                    <p className="text-sm text-muted-foreground">60 days remaining</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₵2,160</p>
                    <p className="text-sm text-muted-foreground">18% return</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Updates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default InvestorDashboard;
