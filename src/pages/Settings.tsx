
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Bell, Globe, Shield, Moon, Sun, Smartphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings.
        </p>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="language">Language & Region</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your full name" defaultValue="Kwame Mensah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="kwame.m@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" defaultValue="+233 50 123 4567" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter your current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor" className="ml-2">
                    Enable two-factor authentication
                  </Label>
                </div>
                <Button variant="outline">Change Password</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Weather Alerts",
                    description: "Receive alerts about important weather changes"
                  },
                  {
                    title: "Market Updates",
                    description: "Get notifications about price changes and market opportunities"
                  },
                  {
                    title: "System Announcements",
                    description: "Important updates about the AgriAI platform"
                  },
                  {
                    title: "Knowledge Resources",
                    description: "New guides, courses, and learning materials"
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Smartphone className="h-4 w-4" />
                        <Switch id={`mobile-${index}`} defaultChecked={true} />
                      </div>
                      <div className="flex items-center gap-1">
                        <Bell className="h-4 w-4" />
                        <Switch id={`app-${index}`} defaultChecked={index !== 3} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Theme Settings</CardTitle>
              <CardDescription>
                Customize how the application appears on your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                      <Sun className="h-5 w-5" />
                      <span>Light</span>
                    </Button>
                    <Button variant="outline" className="flex-col h-auto py-4 gap-2">
                      <Moon className="h-5 w-5" />
                      <span>Dark</span>
                    </Button>
                    <Button variant="outline" className="flex-col h-auto py-4 gap-2 bg-leaf-50 dark:bg-leaf-900/20 border-leaf-200 dark:border-leaf-800">
                      <Smartphone className="h-5 w-5" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Text Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select text size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reduce Motion</h4>
                    <p className="text-sm text-muted-foreground">Disable animations and transitions</p>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Apply Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Language & Region Settings
              </CardTitle>
              <CardDescription>
                Choose your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tw">Twi</SelectItem>
                    <SelectItem value="ga">Ga</SelectItem>
                    <SelectItem value="ewe">Ewe</SelectItem>
                    <SelectItem value="dagbani">Dagbani</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="greater-accra">
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greater-accra">Greater Accra</SelectItem>
                    <SelectItem value="ashanti">Ashanti</SelectItem>
                    <SelectItem value="northern">Northern</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="volta">Volta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="datetime">Date & Time Format</Label>
                <Select defaultValue="12h">
                  <SelectTrigger id="datetime">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Settings;
