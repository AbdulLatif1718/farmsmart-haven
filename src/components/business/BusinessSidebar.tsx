
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BriefcaseBusiness, 
  Building, 
  TrendingUp, 
  Landmark, 
  MessageSquare, 
  Settings,
  ChevronRight,
  Users,
  FileText,
  Handshake,
  Wallet,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BusinessRole } from './RoleSelector';

interface BusinessSidebarProps {
  open: boolean;
  onClose: () => void;
  activeRole: BusinessRole;
}

export const BusinessSidebar = ({ open, onClose, activeRole }: BusinessSidebarProps) => {
  const location = useLocation();
  
  // Different menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      { icon: MessageSquare, label: 'Messages', path: '/business/messages' },
      { icon: Settings, label: 'Settings', path: '/business/settings' },
    ];

    switch (activeRole) {
      case 'investor':
        return [
          { icon: BriefcaseBusiness, label: 'Dashboard', path: '/business' },
          { icon: TrendingUp, label: 'Investments', path: '/business/investments' },
          { icon: FileText, label: 'Contracts', path: '/business/contracts' },
          { icon: Wallet, label: 'Financials', path: '/business/financials' },
          ...commonItems
        ];
      case 'landowner':
        return [
          { icon: Building, label: 'Dashboard', path: '/business' },
          { icon: Landmark, label: 'My Properties', path: '/business/properties' },
          { icon: Handshake, label: 'Partnerships', path: '/business/partnerships' },
          { icon: FileText, label: 'Lease Agreements', path: '/business/leases' },
          ...commonItems
        ];
      case 'farmer':
        return [
          { icon: BriefcaseBusiness, label: 'Dashboard', path: '/business' },
          { icon: TrendingUp, label: 'My Projects', path: '/business/projects' },
          { icon: Landmark, label: 'Land Access', path: '/business/land' },
          { icon: Wallet, label: 'Financials', path: '/business/financials' },
          ...commonItems
        ];
      case 'buyer':
        return [
          { icon: BriefcaseBusiness, label: 'Dashboard', path: '/business' },
          { icon: Landmark, label: 'Marketplace', path: '/business/marketplace' },
          { icon: TrendingUp, label: 'Orders', path: '/business/orders' },
          { icon: Wallet, label: 'Payment Methods', path: '/business/payments' },
          ...commonItems
        ];
      default:
        return [
          { icon: BriefcaseBusiness, label: 'Dashboard', path: '/business' },
          ...commonItems
        ];
    }
  };

  const menuItems = getMenuItems();

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
          "fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out transform md:translate-x-0 md:static md:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/business" className="flex items-center">
            <span className="font-bold text-xl text-green-400">Agri</span>
            <span className="font-bold text-xl text-blue-400">Business</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden text-white">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        
        <div className="px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-10 w-10 border-2 border-green-400">
              <AvatarFallback className="bg-slate-800">BU</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Business User</h3>
              <p className="text-xs text-slate-400 capitalize">{activeRole}</p>
            </div>
          </div>
        </div>
        
        <nav className="px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-md transition-colors hover:bg-slate-800",
                    location.pathname === item.path ? "bg-slate-800 text-green-400" : "text-slate-300"
                  )}
                  onClick={() => onClose()}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="bg-slate-800 rounded-lg p-4 text-sm">
            <h4 className="font-medium text-green-400 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Smart Connect
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Find partners and expand your agricultural network
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
            >
              Connect Now
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BusinessSidebar;
