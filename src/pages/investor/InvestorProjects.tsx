
import React, { useState } from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  Filter,
  Search,
  Star,
  Clock,
  Leaf,
  Bird
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const InvestorProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const availableProjects = [
    {
      id: 1,
      title: "Sustainable Maize Cultivation",
      farmer: "Kwame Asante",
      location: "Northern Region",
      type: "crop",
      fundingGoal: 15000,
      currentFunding: 8500,
      expectedROI: 30,
      duration: "6 months",
      riskLevel: "Medium",
      description: "Large-scale maize cultivation using drought-resistant varieties and modern irrigation systems.",
      farmSize: "10 acres",
      experience: "8 years",
      rating: 4.8,
      deadline: "June 15, 2025"
    },
    {
      id: 2,
      title: "Organic Poultry Farm Expansion",
      farmer: "Akosua Mensah",
      location: "Ashanti Region",
      type: "livestock",
      fundingGoal: 12000,
      currentFunding: 4200,
      expectedROI: 35,
      duration: "4 months",
      riskLevel: "Low",
      description: "Expansion of existing organic poultry operation with improved housing and feed systems.",
      farmSize: "2 acres",
      experience: "5 years",
      rating: 4.9,
      deadline: "May 30, 2025"
    },
    {
      id: 3,
      title: "Cocoa Plantation Modernization",
      farmer: "Joseph Boateng",
      location: "Western Region",
      type: "crop",
      fundingGoal: 25000,
      currentFunding: 18000,
      expectedROI: 25,
      duration: "12 months",
      riskLevel: "Low",
      description: "Modernizing traditional cocoa plantation with new varieties and processing equipment.",
      farmSize: "15 acres",
      experience: "12 years",
      rating: 4.7,
      deadline: "July 1, 2025"
    }
  ];

  const myInvestments = [
    {
      id: 1,
      title: "Rice Farming Initiative",
      farmer: "Ibrahim Yakubu",
      invested: 10000,
      currentValue: 11500,
      expectedReturn: 13000,
      progress: 75,
      status: "Active",
      nextUpdate: "May 30, 2025"
    },
    {
      id: 2,
      title: "Vegetable Greenhouse Project",
      farmer: "Mary Osei",
      invested: 8000,
      currentValue: 9200,
      expectedReturn: 10400,
      progress: 100,
      status: "Completed",
      actualReturn: 10800
    }
  ];

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  const filteredProjects = availableProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || project.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Investment Projects</h1>
          <p className="text-muted-foreground">Discover and manage agricultural investment opportunities</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Projects</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="favorites">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects or farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={filterType === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterType === 'crop' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('crop')}
                >
                  Crops
                </Button>
                <Button 
                  variant={filterType === 'livestock' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('livestock')}
                >
                  Livestock
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
                          {project.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {project.farmer}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className={getRiskColor(project.riskLevel)}>
                        {project.riskLevel} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding Progress</span>
                        <span>₵{project.currentFunding.toLocaleString()} / ₵{project.fundingGoal.toLocaleString()}</span>
                      </div>
                      <Progress value={(project.currentFunding / project.fundingGoal) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Expected ROI</p>
                        <p className="font-medium text-green-600">{project.expectedROI}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{project.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Farm Size</p>
                        <p className="font-medium">{project.farmSize}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium">{project.experience}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Deadline: {project.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Invest Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <div className="space-y-4">
              {myInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{investment.title}</CardTitle>
                        <CardDescription>Farmer: {investment.farmer}</CardDescription>
                      </div>
                      <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'}>
                        {investment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Invested</p>
                        <p className="font-medium">₵{investment.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-medium">₵{investment.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Return</p>
                        <p className="font-medium text-green-600">
                          ₵{(investment.status === 'Completed' ? investment.actualReturn : investment.expectedReturn).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {investment.status === 'Active' ? 'Progress' : 'Final ROI'}
                        </p>
                        <p className="font-medium">
                          {investment.status === 'Active' 
                            ? `${investment.progress}%` 
                            : `${(((investment.actualReturn - investment.invested) / investment.invested) * 100).toFixed(1)}%`
                          }
                        </p>
                      </div>
                    </div>
                    
                    {investment.status === 'Active' && (
                      <>
                        <Progress value={investment.progress} className="h-2 mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Next update expected: {investment.nextUpdate}
                        </p>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm">View Reports</Button>
                    <Button variant="outline" size="sm">Contact Farmer</Button>
                    {investment.status === 'Active' && (
                      <Button size="sm">Track Progress</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Projects in Watchlist</h3>
              <p className="text-muted-foreground mb-4">Save interesting projects to review later</p>
              <Button>Browse Projects</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </InvestorLayout>
  );
};

export default InvestorProjects;
