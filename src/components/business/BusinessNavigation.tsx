
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, TrendingUp, Landmark, MessageSquare, Settings } from 'lucide-react';

export type BusinessSection = 'dashboard' | 'projects' | 'marketplace' | 'messages' | 'settings';

interface BusinessNavigationProps {
  activeSection: BusinessSection;
  onSectionChange: (section: BusinessSection) => void;
}

export const BusinessNavigation = ({ activeSection, onSectionChange }: BusinessNavigationProps) => {
  return (
    <Tabs defaultValue={activeSection} onValueChange={(value) => onSectionChange(value as BusinessSection)} className="w-full mb-6">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="projects" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Projects</span>
        </TabsTrigger>
        <TabsTrigger value="marketplace" className="flex items-center gap-2">
          <Landmark className="h-4 w-4" />
          <span className="hidden sm:inline">Marketplace</span>
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Messages</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default BusinessNavigation;
