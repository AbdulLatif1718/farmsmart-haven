
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, TrendingUp, Landmark, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BusinessRole } from './RoleSelector';

export type BusinessSection = 'dashboard' | 'projects' | 'marketplace' | 'messages' | 'settings';

interface BusinessNavigationProps {
  activeSection: BusinessSection;
  onSectionChange: (section: BusinessSection) => void;
  activeRole: BusinessRole;
}

export const BusinessNavigation = ({ activeSection, onSectionChange, activeRole }: BusinessNavigationProps) => {
  // Color based on active role
  const getRoleColor = (isActive: boolean) => {
    if (!isActive) return '';
    
    switch (activeRole) {
      case 'investor': return 'bg-blue-600';
      case 'landowner': return 'bg-green-600';
      case 'farmer': return 'bg-amber-600';
      case 'buyer': return 'bg-purple-600';
      default: return 'bg-blue-600';
    }
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'projects', icon: TrendingUp, label: 'Projects' },
    { id: 'marketplace', icon: Landmark, label: 'Marketplace' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <Card className="mb-6 border-none shadow-md overflow-hidden">
      <CardHeader className="pb-0">
        <h2 className="text-lg font-medium">Navigation</h2>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs 
          defaultValue={activeSection} 
          onValueChange={(value) => onSectionChange(value as BusinessSection)} 
          className="w-full"
        >
          <TabsList className="grid w-full" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {navItems.map(item => (
              <TabsTrigger 
                key={item.id}
                value={item.id} 
                className={cn(
                  "flex items-center gap-2 py-2.5 transition-colors",
                  "data-[state=active]:text-white",
                  `data-[state=active]:${getRoleColor(true)}`,
                  "text-slate-700 dark:text-slate-300"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BusinessNavigation;
