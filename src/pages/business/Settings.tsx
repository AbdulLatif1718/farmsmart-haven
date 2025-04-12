
import React, { useState } from 'react';
import { BusinessLayout } from '@/components/layout/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, Shield, Bell, Globe, CreditCard, 
  Lock, Eye, EyeOff, ChevronRight, Upload
} from 'lucide-react';

const BusinessSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <BusinessLayout activeRole="investor">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and configurations
        </p>
      </div>

      <Tabs defaultValue="account" className="mb-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-6">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-card-foreground/10">
                      <AvatarFallback className="text-2xl">BU</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Business" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="User" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="business@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+233 55 123 4567" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Add details about your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="Agri Investments Ltd" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input id="businessType" defaultValue="Investment Company" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input id="registrationNumber" defaultValue="GH-REG-1234567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Business Ave, Accra" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="current-password" 
                    type={showPassword ? "text" : "password"} 
                    defaultValue="business1234" 
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Enable two-factor authentication for added security</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Login Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications when someone logs into your account</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="my-4" />
                
                <p className="font-medium">Notification Categories</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Investment Updates</p>
                    <p className="text-sm text-muted-foreground">Updates on your investments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Project Milestones</p>
                    <p className="text-sm text-muted-foreground">Updates on project progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">New Messages</p>
                    <p className="text-sm text-muted-foreground">Notifications for new messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Marketing</p>
                    <p className="text-sm text-muted-foreground">Promotional materials and offers</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">English</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Date Format</p>
                    <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">DD/MM/YYYY</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Currency</p>
                    <p className="text-sm text-muted-foreground">Choose your preferred currency</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Ghanaian Cedi (₵)</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Add New Payment Method</Button>
              
              <div className="mt-6">
                <p className="font-medium mb-3">Saved Payment Methods</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-800 p-2 rounded">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 09/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-800 p-2 rounded">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Mobile Money (MTN)</p>
                        <p className="text-xs text-muted-foreground">+233 55 123 4567</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="font-medium mb-3">Recent Transactions</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Investment in Maize Project</p>
                      <p className="text-xs text-muted-foreground">Apr 5, 2023</p>
                    </div>
                    <p className="font-semibold text-destructive">-₵5,000</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Return from Rice Project</p>
                      <p className="text-xs text-muted-foreground">Mar 15, 2023</p>
                    </div>
                    <p className="font-semibold text-green-600">+₵6,200</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Investment in Poultry Farm</p>
                      <p className="text-xs text-muted-foreground">Feb 28, 2023</p>
                    </div>
                    <p className="font-semibold text-destructive">-₵3,500</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Transactions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </BusinessLayout>
  );
};

export default BusinessSettings;
