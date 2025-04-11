
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Users, TrendingUp, Landmark, Check } from 'lucide-react';

const BusinessDashboard = () => {
  const [activeRole, setActiveRole] = useState('investor');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || userRole !== 'business') {
      navigate('/landing');
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Business Dashboard</h1>
        <p className="text-muted-foreground">
          Connect with farmers and landowners to invest in agricultural projects
        </p>
      </div>

      <Tabs defaultValue="investor" onValueChange={setActiveRole} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="investor">Investor</TabsTrigger>
          <TabsTrigger value="landowner">Landowner</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeRole === 'investor' ? (
        <InvestorDashboard />
      ) : (
        <LandownerDashboard />
      )}
    </MainLayout>
  );
};

const InvestorDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-leaf-600" />
              Investment Opportunities
            </CardTitle>
            <CardDescription>
              Browse farm projects seeking investment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Project 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Maize Cultivation Project</h3>
                    <p className="text-sm text-muted-foreground">Farmer: John Doe • Tamale</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Seeking Investment</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Required</p>
                    <p className="font-medium">₵15,000</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="font-medium">30%</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">6 months</p>
                  </div>
                </div>
                <Button size="sm" className="w-full">View Details</Button>
              </div>
              
              {/* Project 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Poultry Expansion Plan</h3>
                    <p className="text-sm text-muted-foreground">Farmer: Sarah K. • Kumasi</p>
                  </div>
                  <span className="bg-leaf-100 text-leaf-800 text-xs px-2 py-1 rounded-full">70% Funded</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Required</p>
                    <p className="font-medium">₵8,500</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">ROI</p>
                    <p className="font-medium">25%</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">4 months</p>
                  </div>
                </div>
                <Button size="sm" className="w-full">View Details</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Browse All Projects</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
              <p className="text-muted-foreground">Performance Chart</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Active Investments</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">₵12,000</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Projected Returns</p>
                <p className="text-2xl font-bold">₵15,600</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="mr-2 h-5 w-5 text-leaf-600" />
              Farmer Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center mr-3">JD</div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Maize, Rice • Tamale</p>
                </div>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center mr-3">SK</div>
                <div>
                  <p className="font-medium">Sarah K.</p>
                  <p className="text-xs text-muted-foreground">Poultry, Vegetables • Kumasi</p>
                </div>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center mr-3">AO</div>
                <div>
                  <p className="font-medium">Ama Owusu</p>
                  <p className="text-xs text-muted-foreground">Cocoa, Fruits • Western Region</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3">
              View All Farmers
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Agreement Templates</CardTitle>
            <CardDescription>
              Pre-built contracts for different investment models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">Profit-Sharing (Standard)</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Popular</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Farmer manages production, investor provides capital. Profits split 70/30.
                </p>
                <div className="flex items-center text-xs text-leaf-600">
                  <Check className="h-3 w-3 mr-1" /> 
                  <span>Legally verified</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h3 className="font-medium mb-1">Livestock Management</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Investor owns animals, farmer raises them for a fixed fee plus bonus.
                </p>
                <div className="flex items-center text-xs text-leaf-600">
                  <Check className="h-3 w-3 mr-1" /> 
                  <span>Legally verified</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h3 className="font-medium mb-1">High-Risk/High-Return</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Investor takes 50% of profits but also 50% of any losses.
                </p>
                <div className="flex items-center text-xs text-leaf-600">
                  <Check className="h-3 w-3 mr-1" /> 
                  <span>Legally verified</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const LandownerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Landmark className="mr-2 h-5 w-5 text-leaf-600" />
              Land Listings
            </CardTitle>
            <CardDescription>
              Manage your land listings for lease or partnership
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Land 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">5-Acre Farmland</h3>
                    <p className="text-sm text-muted-foreground">Northern Region • Near water source</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Size</p>
                    <p className="font-medium">5 acres</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Rent (Annual)</p>
                    <p className="font-medium">₵4,000</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Soil Type</p>
                    <p className="font-medium">Loamy</p>
                  </div>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <p className="text-muted-foreground">Map View</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                  <Button size="sm" className="flex-1">View Inquiries (3)</Button>
                </div>
              </div>
              
              {/* Land 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">10-Acre Agricultural Land</h3>
                    <p className="text-sm text-muted-foreground">Eastern Region • Previously cocoa plantation</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Under Review</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Size</p>
                    <p className="font-medium">10 acres</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Rent (Annual)</p>
                    <p className="font-medium">₵8,500</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Soil Type</p>
                    <p className="font-medium">Rich Soil</p>
                  </div>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <p className="text-muted-foreground">Map View</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                  <Button size="sm" className="flex-1">View Inquiries (0)</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add New Land Listing</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium">Partnership Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium">Rice Cultivation</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  From: Ibrahim Mensah • Northern Region
                </p>
                <div className="flex justify-between text-xs mb-2">
                  <span>Land Requested: 5 acres</span>
                  <span className="font-medium">3-year contract</span>
                </div>
                <div className="flex justify-between text-xs mb-3">
                  <span>Profit Share Offered:</span>
                  <span className="font-medium">25% to landowner</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                  <Button size="sm" className="flex-1">View Offer</Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h3 className="font-medium">Cassava Farming</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  From: Abena Osei • Volta Region
                </p>
                <div className="flex justify-between text-xs mb-2">
                  <span>Land Requested: 3 acres</span>
                  <span className="font-medium">1-year contract</span>
                </div>
                <div className="flex justify-between text-xs mb-3">
                  <span>Rental Offered:</span>
                  <span className="font-medium">₵2,500/year</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                  <Button size="sm" className="flex-1">View Offer</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Land Verification</CardTitle>
            <CardDescription>
              Verify your land ownership to increase trust
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Verification Pending</h4>
                  <p className="text-xs text-amber-700">
                    Complete the verification process to gain the "Verified" badge on your listings.
                  </p>
                </div>
              </div>
            </div>
            
            <Button className="w-full mb-3">Upload Documentation</Button>
            <Button variant="outline" className="w-full">Schedule On-Site Verification</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessDashboard;
