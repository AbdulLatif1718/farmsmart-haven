
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, LineChart, MapPin, Search, Users, ChevronRight, Bell, Zap } from "lucide-react";

import { MainLayout } from "@/components/layout/MainLayout";

const InvestorDashboard = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-soil-800">Investor Dashboard</h1>
            <p className="text-soil-600 mt-1">Track and manage your agricultural investments</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,500</div>
              <p className="text-xs text-muted-foreground mt-1">Across 5 projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projected ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5%</div>
              <p className="text-xs text-muted-foreground mt-1">Annual average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Impact Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85/100</div>
              <p className="text-xs text-muted-foreground mt-1">Environmental + Social</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,450</div>
              <p className="text-xs text-muted-foreground mt-1">Due in 14 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="grid grid-cols-2 md:w-[400px] mb-4">
            <TabsTrigger value="browse">Browse Projects</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
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
                </select>
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-full md:w-auto">
                  <option>All Projects</option>
                  <option>Crops</option>
                  <option>Livestock</option>
                  <option>Processing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Project Card 1 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Maize Cultivation</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>Northern Region</span>
                      </div>
                    </div>
                    <Badge>Crops</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding</span>
                    <span className="font-medium">60% Complete</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-leaf-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-leaf-600" />
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium">Kwame Agyei</p>
                        <p className="text-xs text-muted-foreground">Youth Farmer</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Verified</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-leaf-600 hover:bg-leaf-700 mt-2">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Card 2 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Poultry Farm</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>Greater Accra</span>
                      </div>
                    </div>
                    <Badge>Livestock</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding</span>
                    <span className="font-medium">85% Complete</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-leaf-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-leaf-600" />
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium">Akua Mensah</p>
                        <p className="text-xs text-muted-foreground">Youth Farmer</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Top Rated</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-leaf-600 hover:bg-leaf-700 mt-2">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Project Card 3 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Cassava Processing</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>Eastern Region</span>
                      </div>
                    </div>
                    <Badge>Processing</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding</span>
                    <span className="font-medium">30% Complete</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-leaf-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-leaf-600" />
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium">Kofi Asante</p>
                        <p className="text-xs text-muted-foreground">Youth Entrepreneur</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-leaf-600 hover:bg-leaf-700 mt-2">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
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
                  {/* Investment 1 */}
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Maize Cultivation - Northern Region</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>Kwame Agyei</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="bg-green-100 text-green-800 border-green-200">On Track</Badge>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Project Progress</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Investment</p>
                        <p className="font-medium">$3,500</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Return</p>
                        <p className="font-medium">$4,550</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Next Milestone</p>
                        <p className="font-medium">Harvest (15 days)</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expected ROI</p>
                        <p className="font-medium text-green-600">+30%</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Investment 2 */}
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                      <div>
                        <h3 className="font-medium">Poultry Farm - Greater Accra</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>Akua Mensah</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">Milestone Due</Badge>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Project Progress</span>
                        <span>50%</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Investment</p>
                        <p className="font-medium">$5,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expected Return</p>
                        <p className="font-medium">$6,750</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Next Milestone</p>
                        <p className="font-medium">First Sales (3 days)</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expected ROI</p>
                        <p className="font-medium text-green-600">+35%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InvestorDashboard;
