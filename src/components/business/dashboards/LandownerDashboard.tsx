
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Landmark, AlertCircle } from 'lucide-react';

export const LandownerDashboard = () => {
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

export default LandownerDashboard;
