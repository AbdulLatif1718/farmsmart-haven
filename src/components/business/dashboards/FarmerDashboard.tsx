
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, TrendingUp, AlertCircle, Tractor } from 'lucide-react';

export const FarmerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-leaf-600" />
              My Farm Projects
            </CardTitle>
            <CardDescription>
              Manage your existing projects and create new ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Project 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Maize Cultivation (2023)</h3>
                    <p className="text-sm text-muted-foreground">Northern Region • 5 acres</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Progress</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium">₵12,000</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Funded</p>
                    <p className="font-medium">₵9,600</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Investors</p>
                    <p className="font-medium">2</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Completion</p>
                    <p className="font-medium">80%</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Update Status</Button>
                  <Button size="sm" className="flex-1">View Details</Button>
                </div>
              </div>
              
              {/* Project 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Poultry Farm Expansion</h3>
                    <p className="text-sm text-muted-foreground">Kumasi • 500 birds</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Seeking Funding</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium">₵25,000</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Funded</p>
                    <p className="font-medium">₵5,000</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Investors</p>
                    <p className="font-medium">1</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">8 months</p>
                  </div>
                </div>
                <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg mb-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-amber-700">
                        Add more details to attract investors. Projects with complete information get funded 3x faster.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Edit Project</Button>
                  <Button size="sm" className="flex-1">Promote Project</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create New Project</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-leaf-600" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Project Revenue</h3>
                  <span className="text-green-600 font-medium">+₵12,500</span>
                </div>
                <div className="h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                  <p className="text-xs text-muted-foreground">Revenue Chart</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Last updated: Yesterday at 5:42 PM
                </p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Upcoming Payments</h3>
                  <span className="text-amber-600 font-medium">₵3,200</span>
                </div>
                <div className="space-y-2 mb-2">
                  <div className="flex justify-between text-xs">
                    <span>Investor Share - Maize Project</span>
                    <span className="font-medium">₵2,400</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Land Lease - Northern Region</span>
                    <span className="font-medium">₵800</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs">View All Transactions</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <Tractor className="mr-2 h-5 w-5 text-leaf-600" />
              Resource Hub
            </CardTitle>
            <CardDescription>
              Access equipment, supplies, and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Tractor className="mr-2 h-4 w-4" />
                Rent Equipment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Leaf className="mr-2 h-4 w-4" />
                Order Supplies
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                Request Technical Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
