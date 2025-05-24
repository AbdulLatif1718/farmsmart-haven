
import React, { useState } from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar,
  FileText,
  Download,
  Users,
  MapPin
} from 'lucide-react';

const InvestorInvestments = () => {
  const investments = [
    {
      id: 1,
      projectName: "Rice Farming Initiative",
      farmer: "Ibrahim Yakubu",
      location: "Northern Region",
      invested: 10000,
      currentValue: 11500,
      expectedReturn: 13000,
      actualReturn: null,
      progress: 75,
      status: "Active",
      startDate: "2025-01-15",
      expectedCompletion: "2025-07-15",
      lastUpdate: "2025-05-20",
      roi: 15,
      riskLevel: "Medium"
    },
    {
      id: 2,
      projectName: "Vegetable Greenhouse Project",
      farmer: "Mary Osei",
      location: "Greater Accra",
      invested: 8000,
      currentValue: 10800,
      expectedReturn: 10400,
      actualReturn: 10800,
      progress: 100,
      status: "Completed",
      startDate: "2024-09-01",
      expectedCompletion: "2025-03-01",
      completedDate: "2025-02-28",
      roi: 35,
      riskLevel: "Low"
    },
    {
      id: 3,
      projectName: "Poultry Farm Expansion",
      farmer: "Kwame Asante",
      location: "Ashanti Region",
      invested: 6000,
      currentValue: 6300,
      expectedReturn: 7800,
      actualReturn: null,
      progress: 40,
      status: "Active",
      startDate: "2025-03-01",
      expectedCompletion: "2025-08-01",
      lastUpdate: "2025-05-18",
      roi: 5,
      riskLevel: "Low"
    }
  ];

  const portfolioSummary = {
    totalInvested: 24000,
    currentValue: 28600,
    totalReturns: 4600,
    averageROI: 19.2,
    activeInvestments: 2,
    completedInvestments: 1
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'At Risk': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Investments</h1>
          <p className="text-muted-foreground">Track and manage your agricultural investment portfolio</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold">₵{portfolioSummary.totalInvested.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Invested</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold">₵{portfolioSummary.currentValue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Current Value</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <p className="text-2xl font-bold">₵{portfolioSummary.totalReturns.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Returns</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <PieChart className="h-8 w-8 mx-auto text-amber-600 mb-2" />
              <p className="text-2xl font-bold">{portfolioSummary.averageROI}%</p>
              <p className="text-sm text-muted-foreground">Avg ROI</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <p className="text-2xl font-bold">{portfolioSummary.activeInvestments}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
              <p className="text-2xl font-bold">{portfolioSummary.completedInvestments}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active Investments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {investments.map((investment) => (
                <Card key={investment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{investment.projectName}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {investment.farmer}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {investment.location}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                        <Badge className={getRiskColor(investment.riskLevel)}>
                          {investment.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Invested</p>
                        <p className="font-medium">₵{investment.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-medium">₵{investment.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {investment.status === 'Completed' ? 'Final Return' : 'Expected Return'}
                        </p>
                        <p className="font-medium text-green-600">
                          ₵{(investment.actualReturn || investment.expectedReturn).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <div className="flex items-center gap-1">
                          {investment.roi > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <p className={`font-medium ${investment.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {investment.roi}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {investment.status === 'Active' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{investment.progress}%</span>
                        </div>
                        <Progress value={investment.progress} className="h-2" />
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                      {investment.status === 'Active' ? (
                        <>
                          <p>Started: {investment.startDate}</p>
                          <p>Expected completion: {investment.expectedCompletion}</p>
                          <p>Last update: {investment.lastUpdate}</p>
                        </>
                      ) : (
                        <>
                          <p>Started: {investment.startDate}</p>
                          <p>Completed: {investment.completedDate}</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View Reports
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-1" />
                      Contact Farmer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export Data
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {investments.filter(inv => inv.status === 'Active').map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{investment.projectName}</CardTitle>
                    <CardDescription>Farmer: {investment.farmer} • {investment.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
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
                        <p className="font-medium text-green-600">₵{investment.expectedReturn.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Project Progress</span>
                        <span>{investment.progress}%</span>
                      </div>
                      <Progress value={investment.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Track Progress</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {investments.filter(inv => inv.status === 'Completed').map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{investment.projectName}</CardTitle>
                    <CardDescription>Farmer: {investment.farmer} • {investment.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Invested</p>
                        <p className="font-medium">₵{investment.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Final Return</p>
                        <p className="font-medium text-green-600">₵{investment.actualReturn.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total ROI</p>
                        <p className="font-medium text-green-600">{investment.roi}%</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Download Certificate</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Investment analytics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Performance Analytics</p>
                    <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium text-green-600">Portfolio Growth</h4>
                    <p className="text-2xl font-bold mt-1">+19.2%</p>
                    <p className="text-sm text-muted-foreground">overall return</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium text-blue-600">Success Rate</h4>
                    <p className="text-2xl font-bold mt-1">100%</p>
                    <p className="text-sm text-muted-foreground">profitable investments</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium text-purple-600">Avg. Duration</h4>
                    <p className="text-2xl font-bold mt-1">6.5</p>
                    <p className="text-sm text-muted-foreground">months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InvestorLayout>
  );
};

export default InvestorInvestments;
