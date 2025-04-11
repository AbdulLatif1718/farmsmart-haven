
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Landmark, BriefcaseBusiness, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BusinessRole = 'investor' | 'landowner' | 'farmer' | 'buyer';

interface RoleSelectorProps {
  activeRole: BusinessRole;
  onRoleChange: (role: BusinessRole) => void;
}

export const RoleSelector = ({ activeRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <div className="mb-6 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-lg font-medium mb-3">Select Your Role</h2>
      <Tabs 
        defaultValue={activeRole} 
        onValueChange={(value) => onRoleChange(value as BusinessRole)} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-slate-100 dark:bg-slate-800">
          <TabsTrigger 
            value="investor" 
            className={cn(
              "flex flex-col items-center gap-1 py-3 data-[state=active]:text-white data-[state=active]:bg-blue-600",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <BriefcaseBusiness className="h-5 w-5" />
            <span className="text-xs">Investor</span>
          </TabsTrigger>
          <TabsTrigger 
            value="landowner" 
            className={cn(
              "flex flex-col items-center gap-1 py-3 data-[state=active]:text-white data-[state=active]:bg-green-600",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <Landmark className="h-5 w-5" />
            <span className="text-xs">Landowner</span>
          </TabsTrigger>
          <TabsTrigger 
            value="farmer" 
            className={cn(
              "flex flex-col items-center gap-1 py-3 data-[state=active]:text-white data-[state=active]:bg-amber-600",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <UserRound className="h-5 w-5" />
            <span className="text-xs">Farmer</span>
          </TabsTrigger>
          <TabsTrigger 
            value="buyer" 
            className={cn(
              "flex flex-col items-center gap-1 py-3 data-[state=active]:text-white data-[state=active]:bg-purple-600",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs">Buyer</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RoleSelector;
