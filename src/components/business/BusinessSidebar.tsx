
import React from 'react';
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
  Leaf,
  X,
  Home,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BusinessRole } from './RoleSelector';
import { Separator } from '@/components/ui/separator';

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
          { icon: Home, label: 'Dashboard', path: '/business' },
          { icon: TrendingUp, label: 'Investments', path: '/business/investments' },
          { icon: FileText, label: 'Contracts', path: '/business/contracts' },
          { icon: Wallet, label: 'Financials', path: '/business/financials' },
          ...commonItems
        ];
      case 'landowner':
        return [
          { icon: Home, label: 'Dashboard', path: '/business' },
          { icon: Landmark, label: 'My Properties', path: '/business/properties' },
          { icon: Handshake, label: 'Partnerships', path: '/business/partnerships' },
          { icon: FileText, label: 'Lease Agreements', path: '/business/leases' },
          ...commonItems
        ];
      case 'farmer':
        return [
          { icon: Home, label: 'Dashboard', path: '/business' },
          { icon: TrendingUp, label: 'My Projects', path: '/business/projects' },
          { icon: Landmark, label: 'Land Access', path: '/business/land' },
          { icon: Wallet, label: 'Financials', path: '/business/financials' },
          ...commonItems
        ];
      case 'buyer':
        return [
          { icon: Home, label: 'Dashboard', path: '/business' },
          { icon: ShoppingCart, label: 'Marketplace', path: '/business/marketplace' },
          { icon: TrendingUp, label: 'Orders', path: '/business/orders' },
          { icon: Wallet, label: 'Payment Methods', path: '/business/payments' },
          ...commonItems
        ];
      default:
        return [
          { icon: Home, label: 'Dashboard', path: '/business' },
          ...commonItems
        ];
    }
  };

  const menuItems = getMenuItems();
  
  // Role-specific color and icon
  const getRoleDetails = () => {
    switch (activeRole) {
      case 'investor':
        return { 
          color: 'bg-blue-600', 
          borderColor: 'border-blue-400',
          icon: <BriefcaseBusiness className="h-4 w-4 mr-2 text-blue-200" />,
          label: 'Investor'
        };
      case 'landowner':
        return { 
          color: 'bg-green-600', 
          borderColor: 'border-green-400',
          icon: <Building className="h-4 w-4 mr-2 text-green-200" />,
          label: 'Landowner'
        };
      case 'farmer':
        return { 
          color: 'bg-amber-600', 
          borderColor: 'border-amber-400',
          icon: <Leaf className="h-4 w-4 mr-2 text-amber-200" />,
          label: 'Farmer'
        };
      case 'buyer':
        return { 
          color: 'bg-purple-600', 
          borderColor: 'border-purple-400',
          icon: <ShoppingCart className="h-4 w-4 mr-2 text-purple-200" />,
          label: 'Buyer'
        };
      default:
        return { 
          color: 'bg-blue-600', 
          borderColor: 'border-blue-400',
          icon: <BriefcaseBusiness className="h-4 w-4 mr-2 text-blue-200" />,
          label: 'Investor'
        };
    }
  };

  const roleDetails = getRoleDetails();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 text-white transition-transform duration-300 ease-in-out transform md:translate-x-0 md:static md:z-0",
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
        
        <div className="px-4 py-4">
          <div className={cn("flex items-center gap-3 p-3 rounded-lg", roleDetails.color, "bg-opacity-20")}>
            <Avatar className={cn("h-10 w-10 border-2", roleDetails.borderColor)}>
              <AvatarFallback className="bg-slate-800">BU</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Business User</h3>
              <div className="flex items-center text-xs text-slate-300 mt-0.5">
                {roleDetails.icon}
                <span>{roleDetails.label}</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-2 bg-slate-800" />
        
        <div className="px-3 pt-2 pb-4">
          <div className="text-xs uppercase text-slate-500 font-semibold px-3 mb-2">
            Navigation
          </div>
          <nav>
            <ul className="space-y-1.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-slate-800",
                      location.pathname === item.path 
                        ? `bg-${activeRole === 'investor' ? 'blue' : activeRole === 'landowner' ? 'green' : activeRole === 'farmer' ? 'amber' : 'purple'}-600/20 text-white font-medium` 
                        : "text-slate-300"
                    )}
                    onClick={() => onClose()}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 mr-3",
                      location.pathname === item.path
                        ? activeRole === 'investor' ? 'text-blue-400' : activeRole === 'landowner' ? 'text-green-400' : activeRole === 'farmer' ? 'text-amber-400' : 'text-purple-400'
                        : ''
                    )} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
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
              className="w-full mt-3 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
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
