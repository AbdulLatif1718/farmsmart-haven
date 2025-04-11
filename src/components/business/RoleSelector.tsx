
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Landmark, BriefcaseBusiness, ShoppingCart } from 'lucide-react';

export type BusinessRole = 'investor' | 'landowner' | 'farmer' | 'buyer';

interface RoleSelectorProps {
  activeRole: BusinessRole;
  onRoleChange: (role: BusinessRole) => void;
}

export const RoleSelector = ({ activeRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <Tabs defaultValue={activeRole} onValueChange={(value) => onRoleChange(value as BusinessRole)} className="w-full mb-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="investor" className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4" />
          <span className="hidden sm:inline">Investor</span>
        </TabsTrigger>
        <TabsTrigger value="landowner" className="flex items-center gap-2">
          <Landmark className="h-4 w-4" />
          <span className="hidden sm:inline">Landowner</span>
        </TabsTrigger>
        <TabsTrigger value="farmer" className="flex items-center gap-2">
          <UserRound className="h-4 w-4" />
          <span className="hidden sm:inline">Farmer</span>
        </TabsTrigger>
        <TabsTrigger value="buyer" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Buyer</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default RoleSelector;
