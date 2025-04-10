
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, DollarSign, Globe } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { UserRole } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

export const RoleSelector = () => {
  const { user, updateUserRole } = useUser();
  const { toast } = useToast();
  
  const handleRoleSelect = (role: UserRole) => {
    updateUserRole(role);
    
    toast({
      title: "Role selected",
      description: `You've selected the ${role} role. Your dashboard will be personalized accordingly.`,
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Welcome to AgriAI-Ghana Collaborative Farming</h1>
        <p className="text-muted-foreground mt-2">
          Please select your primary role to customize your experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto bg-leaf-50 dark:bg-leaf-900/20 rounded-full flex items-center justify-center mb-2">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Farmer/Expert</CardTitle>
            <CardDescription>
              I want to start or manage agricultural projects
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center">
            <ul className="space-y-2">
              <li>Create farming project proposals</li>
              <li>Find investors and partners</li>
              <li>Access land for cultivation</li>
              <li>Share your agricultural expertise</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect('farmer')}
              variant={user?.role === 'farmer' ? 'default' : 'outline'}
            >
              {user?.role === 'farmer' ? 'Current Role' : 'Select Farmer Role'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-2">
              <DollarSign className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle>Investor</CardTitle>
            <CardDescription>
              I want to invest in agricultural projects
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center">
            <ul className="space-y-2">
              <li>Browse farming investment opportunities</li>
              <li>Fund promising agricultural projects</li>
              <li>Track performance of investments</li>
              <li>Connect with skilled farmers</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect('investor')}
              variant={user?.role === 'investor' ? 'default' : 'outline'}
            >
              {user?.role === 'investor' ? 'Current Role' : 'Select Investor Role'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto bg-sky-50 dark:bg-sky-900/20 rounded-full flex items-center justify-center mb-2">
              <Globe className="h-8 w-8 text-sky-600 dark:text-sky-400" />
            </div>
            <CardTitle>Landowner</CardTitle>
            <CardDescription>
              I have land available for agricultural use
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-center">
            <ul className="space-y-2">
              <li>List your agricultural land</li>
              <li>Find reliable farmers to lease your land</li>
              <li>Earn stable income from land assets</li>
              <li>Participate in revenue-sharing partnerships</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => handleRoleSelect('landowner')}
              variant={user?.role === 'landowner' ? 'default' : 'outline'}
            >
              {user?.role === 'landowner' ? 'Current Role' : 'Select Landowner Role'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
