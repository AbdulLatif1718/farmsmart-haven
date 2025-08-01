
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Cloud, 
  Leaf, 
  ShoppingCart, 
  BookOpen,
  Settings,
  Sprout,
  GraduationCap,
  Users,
  LineChart,
  Calendar,
  MessageSquare,
  HelpCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface YouthSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/youth' },
  { icon: Sprout, label: 'My Projects', path: '/youth/projects' },
  { icon: Cloud, label: 'Weather Alerts', path: '/weather' },
  { icon: Leaf, label: 'Crop Guide', path: '/crops' },
  { icon: ShoppingCart, label: 'Marketplace', path: '/marketplace' },
  { icon: GraduationCap, label: 'Training', path: '/youth/training' },
  { icon: Users, label: 'Mentors', path: '/youth/mentors' },
  { icon: LineChart, label: 'Progress', path: '/youth/progress' },
  { icon: BookOpen, label: 'Knowledge Hub', path: '/knowledge' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const YouthSidebar = ({ open, onClose }: YouthSidebarProps) => {
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
          <Link to="/youth" className="flex items-center">
            <span className="font-bold text-xl text-amber-600">Youth</span>
            <span className="font-bold text-xl text-sky-600">AgriVerse</span>
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
                        ? "bg-amber-50 text-amber-700 font-medium" 
                        : "hover:bg-amber-50 hover:text-amber-700"
                    )}
                    onClick={() => onClose()}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 mr-3",
                      location.pathname === item.path ? "text-amber-600" : "text-amber-500"
                    )} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
        
        <div className="p-4">
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-600" />
              <h4 className="font-medium text-amber-800 dark:text-amber-200">Next Training</h4>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Organic Farming Workshop 
              <br />Tomorrow, 10:00 AM
            </p>
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-amber-200 text-amber-700 dark:border-amber-700 text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" /> Calendar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-amber-200 text-amber-700 dark:border-amber-700 text-xs"
              >
                <HelpCircle className="h-3 w-3 mr-1" /> Help
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default YouthSidebar;
