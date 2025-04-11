
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, TrendingUp, Landmark, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BusinessSection = 'dashboard' | 'projects' | 'marketplace' | 'messages' | 'settings';

interface BusinessNavigationProps {
  activeSection: BusinessSection;
  onSectionChange: (section: BusinessSection) => void;
}

export const BusinessNavigation = ({ activeSection, onSectionChange }: BusinessNavigationProps) => {
  return (
    <div className="mb-6 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-lg font-medium mb-3">Navigation</h2>
      <Tabs 
        defaultValue={activeSection} 
        onValueChange={(value) => onSectionChange(value as BusinessSection)} 
        className="w-full"
      >
        <TabsList className="grid w-full" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <TabsTrigger 
            value="dashboard" 
            className={cn(
              "flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger 
            value="projects" 
            className={cn(
              "flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger 
            value="marketplace" 
            className={cn(
              "flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <Landmark className="h-4 w-4" />
            <span className="hidden sm:inline">Marketplace</span>
          </TabsTrigger>
          <TabsTrigger 
            value="messages" 
            className={cn(
              "flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className={cn(
              "flex items-center gap-2 data-[state=active]:bg-slate-600 data-[state=active]:text-white",
              "text-slate-700 dark:text-slate-300"
            )}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BusinessNavigation;
