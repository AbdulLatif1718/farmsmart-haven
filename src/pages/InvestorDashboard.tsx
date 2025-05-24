
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  LineChart, 
  MapPin, 
  Search, 
  Users, 
  ChevronRight, 
  Bell, 
  Zap,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Shield,
  Star,
  DollarSign,
  PieChart,
  Target,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvestorLayout } from "@/components/layout/InvestorLayout";

const InvestorDashboard = () => {
  const investmentProjects = [
    {
      id: 1,
      name: "Organic Maize Cultivation",
      farmer: "Kwame Agyei",
      location: "Northern Region",
      category: "Crops",
      fundingGoal: 15000,
      currentFunding: 12000,
      progress: 80,
      expectedROI: 30,
      duration: "6 months",
      riskLevel: "Low",
      status: "Active",
      startDate: "2025-01-15",
      projectedReturn: 19500,
      investorsCount: 8,
      milestones: 4,
      completedMilestones: 3
    },
    {
      id: 2,
      name: "Free-Range Poultry Farm",
      farmer: "Akua Mensah",
      location: "Greater Accra",
      category: "Livestock",
      fundingGoal: 10000,
      currentFunding: 8500,
      progress: 85,
      expectedROI: 35,
      duration: "4 months",
      riskLevel: "Medium",
      status: "Milestone Due",
      startDate: "2025-02-01",
      projectedReturn: 13500,
      investorsCount: 5,
      milestones: 3,
      completedMilestones: 2
    },
    {
      id: 3,
      name: "Cassava Processing Unit",
      farmer: "Kofi Asante",
      location: "Eastern Region",
      category: "Processing",
      fundingGoal: 20000,
      currentFunding: 6000,
      progress: 30,
      expectedROI: 45,
      duration: "8 months",
      riskLevel: "High",
      status: "Seeking Funding",
      startDate: "2025-03-01",
      projectedReturn: 29000,
      investorsCount: 3,
      milestones: 5,
      completedMilestones: 1
    },
    {
      id: 4,
      name: "Greenhouse Vegetables",
      farmer: "Sarah Osei",
      location: "Ashanti Region",
      category: "Crops",
      fundingGoal: 12000,
      currentFunding: 11800,
      progress: 98,
      expectedROI: 28,
      duration: "5 months",
      riskLevel: "Low",
      status: "Nearly Funded",
      startDate: "2025-02-15",
      projectedReturn: 15360,
      investorsCount: 12,
      milestones: 4,
      completedMilestones: 3
    }
  ];

  const myInvestments = [
    {
      id: 1,
      projectName: "Organic Maize Cultivation",
      farmer: "Kwame Agyei",
      amountInvested: 3500,
      currentValue: 4200,
      progress: 75,
      expectedReturn: 4550,
      nextMilestone: "Harvest preparation",
      daysToMilestone: 8,
      status: "On Track",
      roi: 20
    },
    {
      id: 2,
      projectName: "Free-Range Poultry Farm",
      farmer: "Akua Mensah",
      amountInvested: 2500,
      currentValue: 2850,
      progress: 50,
      expectedReturn: 3375,
      nextMilestone: "First egg collection",
      daysToMilestone: 15,
      status: "On Track",
      roi: 14
    }
  ];

  const portfolioStats = {
    totalInvested: 18500,
    currentValue: 21400,
    totalReturn: 2900,
    averageROI: 18.5,
    activeInvestments: 5,
    completedProjects: 2,
    successRate: 89
  };

  const getRiskBadgeColor = (risk) => {
    switch(risk) {
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'On Track':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Milestone Due':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Seeking Funding':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Nearly Funded':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <InvestorLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-soil-800">Investment Dashboard</h1>
            <p className="text-soil-600 mt-1">Track investments, discover opportunities, and grow your agricultural portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hidden md:flex">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button className="bg-leaf-600 hover:bg-leaf-700">
              <Zap className="mr-2 h-4 w-4" />
              Fund New Project
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold">₵{portfolioStats.totalInvested.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Across {portfolioStats.activeInvestments} projects</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Value</p>
                  <p className="text-2xl font-bold">₵{portfolioStats.currentValue.toLocaleString()}</p>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">+{portfolioStats.averageROI}% average ROI</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Impact Score</p>
                  <p className="text-2xl font-bold">{portfolioStats.successRate}/100</p>
                  <p className="text-xs text-muted-foreground">Environmental + Social</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{portfolioStats.successRate}%</p>
                  <p className="text-xs text-muted-foreground">{portfolioStats.completedProjects} completed projects</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 md:w-[600px] mb-4">
            <TabsTrigger value="browse">Browse Projects</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search projects..."
                  className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-full md:w-auto">
                  <option>All Regions</option>
                  <option>Northern Region</option>
                  <option>Ashanti Region</option>
                  <option>Volta Region</option>
                  <option>Greater Accra</option>
                  <option>Eastern Region</option>
                </select>
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-full md:w-auto">
                  <option>All Categories</option>
                  <option>Crops</option>
                  <option>Livestock</option>
                  <option>Processing</option>
                </select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {investmentProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>{project.farmer}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline">{project.category}</Badge>
                        <Badge className={getRiskBadgeColor(project.riskLevel)} variant="outline">
                          {project.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="font-medium">
                        ₵{project.currentFunding.toLocaleString()} / ₵{project.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
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
                        <p className="text-muted-foreground">Investors</p>
                        <p className="font-medium">{project.investorsCount} investors</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Progress</p>
                        <p className="font-medium">{project.completedMilestones}/{project.milestones} milestones</p>
                      </div>
                    </div>
                    
                    <Badge className={getStatusBadgeColor(project.status)} variant="outline">
                      {project.status}
                    </Badge>
                  </CardContent>
                  <CardFooter className="space-x-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-leaf-600 hover:bg-leaf-700">
                      Invest Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Active Investments</CardTitle>
                <CardDescription>Track the progress of your funded projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myInvestments.map((investment) => (
                    <Card key={investment.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{investment.projectName}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              <span>{investment.farmer}</span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0 text-right">
                            <Badge className={getStatusBadgeColor(investment.status)} variant="outline">
                              {investment.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              <Clock className="inline h-3 w-3 mr-1" />
                              {investment.daysToMilestone} days to milestone
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Invested</p>
                            <p className="font-medium">₵{investment.amountInvested.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Current Value</p>
                            <p className="font-medium text-blue-600">₵{investment.currentValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Expected Return</p>
                            <p className="font-medium text-green-600">₵{investment.expectedReturn.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">ROI</p>
                            <p className="font-medium text-green-600">+{investment.roi}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Next Milestone</p>
                            <p className="font-medium">{investment.nextMilestone}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Project Progress</span>
                            <span>{investment.progress}%</span>
                          </div>
                          <Progress value={investment.progress} className="h-2" />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View Report
                          </Button>
                          <Button variant="outline" size="sm">
                            <Activity className="h-4 w-4 mr-1" />
                            Track Progress
                          </Button>
                          <Button size="sm">
                            Contact Farmer
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Investment Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Portfolio Distribution Chart</p>
                      <p className="text-sm text-muted-foreground">Visual breakdown by category</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Crops (60%)</span>
                      <span className="text-sm font-medium">₵11,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Livestock (30%)</span>
                      <span className="text-sm font-medium">₵5,550</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Processing (10%)</span>
                      <span className="text-sm font-medium">₵1,850</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Returns</p>
                      <p className="text-xl font-bold text-green-600">₵{portfolioStats.totalReturn.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Average ROI</p>
                      <p className="text-xl font-bold text-blue-600">{portfolioStats.averageROI}%</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Best Performing Project</span>
                      <span className="text-sm font-medium text-green-600">+35% ROI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Projects on Schedule</span>
                      <span className="text-sm font-medium">{portfolioStats.activeInvestments - 1}/{portfolioStats.activeInvestments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Score</span>
                      <span className="text-sm font-medium text-yellow-600">Medium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Investment Analytics
                </CardTitle>
                <CardDescription>Detailed performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-muted rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Investment Performance Over Time</p>
                    <p className="text-sm text-muted-foreground">Interactive charts and analytics will be displayed here</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Monthly Growth</p>
                        <p className="text-2xl font-bold text-green-600">+12.3%</p>
                        <div className="flex items-center justify-center mt-1">
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">vs last month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Risk-Adjusted Return</p>
                        <p className="text-2xl font-bold text-blue-600">16.8%</p>
                        <div className="flex items-center justify-center mt-1">
                          <Shield className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-xs text-blue-600">Sharpe ratio: 1.4</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Portfolio Volatility</p>
                        <p className="text-2xl font-bold text-purple-600">8.2%</p>
                        <div className="flex items-center justify-center mt-1">
                          <Activity className="h-4 w-4 text-purple-600 mr-1" />
                          <span className="text-xs text-purple-600">Low volatility</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InvestorLayout>
  );
};

export default InvestorDashboard;
