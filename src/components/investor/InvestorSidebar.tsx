
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Users, 
  FileText, 
  Settings,
  Wallet,
  Activity,
  Filter,
  PieChart,
  MessageSquare,
  Bookmark,
  Map,
  Bell,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface InvestorSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/investor' },
  { icon: TrendingUp, label: 'Browse Projects', path: '/investor/projects' },
  { icon: Activity, label: 'My Investments', path: '/investor/investments' },
  { icon: Wallet, label: 'Financials', path: '/investor/financials' },
  { icon: PieChart, label: 'Portfolio', path: '/investor/portfolio' },
  { icon: FileText, label: 'Contracts', path: '/investor/contracts' },
  { icon: Map, label: 'Project Map', path: '/investor/map' },
  { icon: Users, label: 'Network', path: '/investor/network' },
  { icon: MessageSquare, label: 'Messages', path: '/investor/messages' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const InvestorSidebar = ({ open, onClose }: InvestorSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out transform md:translate-x-0 md:static md:z-0 md:block flex flex-col",
          open ? "translate-x-0 mt-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 md:pt-16">
          <Link to="/investor" className="flex items-center">
            <img 
              src="/lovable-uploads/bce4d552-bebc-4009-9d01-68ca934c5518.png" 
              alt="AgriVerse Africa Logo" 
              className="h-8 w-8 dark:hidden"
            />
            <img 
              src="/lovable-uploads/103c04b5-8ea1-4770-a453-7641b4a4073a.png" 
              alt="AgriVerse Africa Logo" 
              className="h-8 w-8 hidden dark:block"
            />
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        
        <ScrollArea className="flex-1 mt-6 px-2">
          <nav className="p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                      location.pathname === item.path 
                        ? "bg-blue-50 text-blue-700 font-medium" 
                        : "hover:bg-blue-50 hover:text-blue-700"
                    )}
                    onClick={() => onClose()}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 mr-3",
                      location.pathname === item.path ? "text-blue-600" : "text-blue-500"
                    )} />
                    <span>{item.label}</span>
                    {item.label === 'Messages' && (
                      <Badge className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200">2</Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
        
        <div className="p-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 flex items-center">
                <Bookmark className="h-4 w-4 mr-2 text-blue-600" />
                Featured Projects
              </h4>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-600">
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 mb-2">
              High-performing agricultural projects handpicked for you
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-blue-200 text-blue-700 dark:border-blue-700 text-xs"
            >
              View Selections
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default InvestorSidebar;
