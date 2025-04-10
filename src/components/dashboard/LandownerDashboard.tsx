
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Globe, Plus, FileText, Calendar, Users } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { LandownerProfile } from '@/types/user';
import { sampleLands } from '@/data/mockData';

export const LandownerDashboard = () => {
  const { user } = useUser();
  const landownerUser = user as LandownerProfile;
  
  // Filter lands owned by this landowner
  const myLands = sampleLands.filter(land => land.owner.id === user?.id);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Landowner Dashboard</h1>
          <p className="text-muted-foreground">Manage your land listings and partnerships.</p>
        </div>
        <Button className="px-4 flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          List New Land
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Land Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{landownerUser?.totalLandArea || 0} acres</div>
            <p className="text-xs text-muted-foreground">
              Across {landownerUser?.landLocations?.length || 0} locations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Listed Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myLands.length}</div>
            <p className="text-xs text-muted-foreground">
              {landownerUser?.activeLeasedLands || 0} currently leased
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{(landownerUser?.activeLeasedLands || 0) * 500}</div>
            <p className="text-xs text-muted-foreground">
              From active leases
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Partner Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{landownerUser?.activeLeasedLands || 0}</div>
            <p className="text-xs text-muted-foreground">
              <Users className="h-3 w-3 inline mr-1" />
              Active partnerships
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>My Land Listings</CardTitle>
              <CardDescription>
                Manage and monitor your agricultural land listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myLands.length > 0 ? (
                <div className="space-y-4">
                  {myLands.map((land) => (
                    <div key={land.id} className="flex items-start p-3 border rounded-lg">
                      <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                        <img
                          src={land.images[0] || 'https://placehold.co/100x100?text=Land'}
                          alt={land.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{land.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            land.owner.id === user?.id ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {land.owner.id === user?.id ? 'Your Property' : 'Leased'}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {land.location} | {land.size} acres
                        </div>
                        <div className="flex justify-between mt-2">
                          <div className="text-sm">
                            <span className="font-medium">₵{land.pricePerMonth.toLocaleString()}</span>
                            <span className="text-muted-foreground"> per month</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{land.leaseTerms.minDuration}</span>
                            <span className="text-muted-foreground"> min months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Globe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium mb-1">No land listings yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    List your agricultural land to connect with farmers and investors
                  </p>
                  <Button>Add Land Listing</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lease Applications</CardTitle>
                <CardDescription>
                  Review and manage applications for your land
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">John Mensah</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 rounded">Pending</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Applied for: 10 Acre Fertile Land with Water Source
                  </p>
                  <div className="text-xs flex justify-between">
                    <span>Lease Duration: <span className="font-medium">24 months</span></span>
                    <span>Purpose: <span className="font-medium">Maize Farming</span></span>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-7 px-3">Decline</Button>
                    <Button size="sm" className="h-7 px-3">Approve</Button>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">Amara Osei</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 rounded">Pending</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Applied for: 5 Acre Premium Land with Irrigation System
                  </p>
                  <div className="text-xs flex justify-between">
                    <span>Lease Duration: <span className="font-medium">12 months</span></span>
                    <span>Purpose: <span className="font-medium">Vegetable Farming</span></span>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-7 px-3">Decline</Button>
                    <Button size="sm" className="h-7 px-3">Approve</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <h4 className="text-sm font-medium">Lease Payment Due</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    From: John Mensah (10 Acre Fertile Land)
                  </p>
                  <div className="flex justify-between text-xs">
                    <span>Amount: <span className="font-medium">₵1,500</span></span>
                    <span>Due: <span className="font-medium">Nov 30, 2023</span></span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <h4 className="text-sm font-medium">Lease Payment Due</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    From: Amara Osei (5 Acre Premium Land)
                  </p>
                  <div className="flex justify-between text-xs">
                    <span>Amount: <span className="font-medium">₵700</span></span>
                    <span>Due: <span className="font-medium">Dec 15, 2023</span></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Document Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center p-2 border rounded hover:bg-muted/30 cursor-pointer">
                  <FileText className="h-4 w-4 text-primary mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">Lease Agreement Template</div>
                    <div className="text-xs text-muted-foreground">Standard lease contract for agricultural land</div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 border rounded hover:bg-muted/30 cursor-pointer">
                  <FileText className="h-4 w-4 text-primary mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">Revenue Sharing Agreement</div>
                    <div className="text-xs text-muted-foreground">Template for crop revenue sharing arrangements</div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 border rounded hover:bg-muted/30 cursor-pointer">
                  <FileText className="h-4 w-4 text-primary mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">Land Verification Certificate</div>
                    <div className="text-xs text-muted-foreground">Official documentation of land ownership</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
