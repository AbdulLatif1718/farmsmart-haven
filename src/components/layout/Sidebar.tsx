
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Cloud, 
  Leaf, 
  ShoppingCart, 
  Truck, 
  Tractor, 
  PackageOpen,
  BookOpen,
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Cloud, label: 'Weather Alerts', path: '/weather' },
  { icon: Leaf, label: 'Crop Recommendations', path: '/crops' },
  { icon: ShoppingCart, label: 'Marketplace', path: '/marketplace' },
  { icon: Truck, label: 'Transport & Logistics', path: '/transport' },
  { icon: Tractor, label: 'Machinery Rentals', path: '/machinery' },
  { icon: PackageOpen, label: 'Post-Harvest Solutions', path: '/storage' },
  { icon: BookOpen, label: 'Knowledge Hub', path: '/knowledge' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ open, onClose }: SidebarProps) => {
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
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-leaf-600">Agri</span>
            <span className="font-bold text-xl text-sky-600">AI</span>
            <span className="text-sm font-medium ml-1">Africa</span>
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
                    className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-leaf-50 hover:text-leaf-700 dark:hover:bg-leaf-900/20 dark:hover:text-leaf-300 transition-colors"
                    onClick={() => onClose()}
                  >
                    <item.icon className="h-5 w-5 mr-3 text-leaf-600 dark:text-leaf-400" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
        
        <div className="p-4">
          <div className="bg-leaf-50 dark:bg-leaf-900/30 rounded-lg p-4 text-sm">
            <h4 className="font-medium text-leaf-800 dark:text-leaf-200">Offline Mode</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Last synced: Today, 10:45 AM
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-leaf-200 dark:border-leaf-700 text-xs"
            >
              Sync when online
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
