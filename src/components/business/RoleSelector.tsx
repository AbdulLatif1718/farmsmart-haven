
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Landmark, BriefcaseBusiness, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export type BusinessRole = 'investor' | 'landowner' | 'farmer' | 'buyer';

interface RoleSelectorProps {
  activeRole: BusinessRole;
  onRoleChange: (role: BusinessRole) => void;
}

export const RoleSelector = ({ activeRole, onRoleChange }: RoleSelectorProps) => {
  const roleDetails = [
    { 
      id: 'investor',
      icon: BriefcaseBusiness,
      label: 'Investor',
      description: 'Fund agricultural projects and earn returns',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-500'
    },
    { 
      id: 'landowner',
      icon: Landmark,
      label: 'Landowner',
      description: 'Lease your land to farmers and investors',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-500'
    },
    { 
      id: 'farmer',
      icon: UserRound,
      label: 'Farmer',
      description: 'Manage crops and find project funding',
      color: 'bg-amber-600',
      hoverColor: 'hover:bg-amber-500'
    },
    { 
      id: 'buyer',
      icon: ShoppingCart,
      label: 'Buyer',
      description: 'Purchase agricultural products',
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-500'
    }
  ];

  return (
    <Card className="mb-6 border-none shadow-md">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-medium">Select Your Role</h2>
        <p className="text-sm text-muted-foreground">
          Choose how you want to interact with the platform
        </p>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue={activeRole} 
          onValueChange={(value) => onRoleChange(value as BusinessRole)} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-slate-100 dark:bg-slate-800">
            {roleDetails.map(role => (
              <TabsTrigger 
                key={role.id}
                value={role.id as BusinessRole} 
                className={cn(
                  "flex flex-col items-center gap-1 py-3 transition-all",
                  "data-[state=active]:text-white",
                  `data-[state=active]:${role.color}`,
                  role.hoverColor,
                  "text-slate-700 dark:text-slate-300"
                )}
              >
                <role.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{role.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {roleDetails.map(role => (
              <div 
                key={role.id}
                className={cn(
                  "text-xs text-center p-1 rounded transition-opacity",
                  activeRole === role.id ? "opacity-100" : "opacity-0"
                )}
              >
                <p className="text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RoleSelector;
