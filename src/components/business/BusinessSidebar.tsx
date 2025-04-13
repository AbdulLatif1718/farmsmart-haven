
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface BusinessSidebarProps {
  open: boolean;
  onClose: () => void;
  activeRole: BusinessRole;
  collapsed?: boolean;
}

export const BusinessSidebar = ({ open, onClose, activeRole, collapsed = false }: BusinessSidebarProps) => {
  const location = useLocation();
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const { toast } = useToast();
  
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
  
  // Handle connect now button click
  const handleConnectNow = () => {
    setIsNetworkModalOpen(true);
  };

  // Handle connect with user
  const handleConnectWithUser = (userName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${userName}. They will be notified shortly.`,
    });
    setIsNetworkModalOpen(false);
  };

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
          "fixed top-0 left-0 z-50 h-full bg-slate-900 text-white transition-all duration-300 ease-in-out",
          // Mobile view
          open ? "translate-x-0" : "-translate-x-full",
          // Desktop view - positioning and width
          "md:relative md:translate-x-0 md:z-30",
          // Collapsed state
          collapsed ? "md:w-20" : "w-72"
        )}
      >
        <div className={cn(
          "flex items-center justify-between p-4",
          collapsed && "md:justify-center"
        )}>
          {!collapsed && (
            <Link to="/business" className="flex items-center">
              <span className="font-bold text-xl text-green-400">Agri</span>
              <span className="font-bold text-xl text-blue-400">Business</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/business" className="flex items-center justify-center">
              <span className="font-bold text-xl text-green-400">A</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden text-white">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        
        <div className={cn(
          "px-4 py-4",
          collapsed && "md:px-2"
        )}>
          {!collapsed ? (
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
          ) : (
            <div className="flex justify-center">
              <Avatar className={cn("h-10 w-10 border-2", roleDetails.borderColor)}>
                <AvatarFallback className="bg-slate-800">BU</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
        
        <Separator className="my-2 bg-slate-800" />
        
        <div className="px-3 pt-2 pb-4">
          {!collapsed && (
            <div className="text-xs uppercase text-slate-500 font-semibold px-3 mb-2">
              Navigation
            </div>
          )}
          <nav>
            <TooltipProvider>
              <ul className="space-y-1.5">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link 
                            to={item.path}
                            className={cn(
                              "flex items-center justify-center h-10 w-10 mx-auto rounded-md transition-colors hover:bg-slate-800",
                              location.pathname === item.path 
                                ? `bg-${activeRole === 'investor' ? 'blue' : activeRole === 'landowner' ? 'green' : activeRole === 'farmer' ? 'amber' : 'purple'}-600/20 text-white font-medium` 
                                : "text-slate-300"
                            )}
                            onClick={() => onClose()}
                          >
                            <item.icon className={cn(
                              "h-5 w-5",
                              location.pathname === item.path
                                ? activeRole === 'investor' ? 'text-blue-400' : activeRole === 'landowner' ? 'text-green-400' : activeRole === 'farmer' ? 'text-amber-400' : 'text-purple-400'
                                : ''
                            )} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
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
                    )}
                  </li>
                ))}
              </ul>
            </TooltipProvider>
          </nav>
        </div>
        
        {!collapsed && (
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
                onClick={handleConnectNow}
              >
                Connect Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Agricultural Network Modal */}
      <Dialog open={isNetworkModalOpen} onOpenChange={setIsNetworkModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-leaf-600" />
              Agricultural Network
            </DialogTitle>
            <DialogDescription>
              Connect with other agricultural professionals to expand your network
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {/* Filter by role */}
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 cursor-pointer">
                Investors
              </Badge>
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 cursor-pointer">
                Landowners
              </Badge>
              <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 cursor-pointer">
                Farmers
              </Badge>
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 cursor-pointer">
                Buyers
              </Badge>
              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 cursor-pointer">
                All
              </Badge>
            </div>

            {/* Network connections */}
            <UserCard 
              name="John Kofi"
              role="Investor"
              location="Accra Region"
              specialty="Grain Farming, Poultry"
              avatarText="JK"
              avatarColor="bg-blue-100 dark:bg-blue-800/30"
              roleColor="text-blue-600 dark:text-blue-400"
              onConnect={() => handleConnectWithUser("John Kofi")}
            />
            
            <UserCard 
              name="Sarah Mensah"
              role="Landowner"
              location="Western Region"
              specialty="Cocoa Farms, Palm Oil Plantations"
              avatarText="SM"
              avatarColor="bg-green-100 dark:bg-green-800/30"
              roleColor="text-green-600 dark:text-green-400"
              onConnect={() => handleConnectWithUser("Sarah Mensah")}
            />
            
            <UserCard 
              name="Ibrahim Yakubu"
              role="Farmer"
              location="Northern Region"
              specialty="Rice, Vegetables, Organic Farming"
              avatarText="IY"
              avatarColor="bg-amber-100 dark:bg-amber-800/30"
              roleColor="text-amber-600 dark:text-amber-400"
              onConnect={() => handleConnectWithUser("Ibrahim Yakubu")}
            />
            
            <UserCard 
              name="David Asare"
              role="Buyer"
              location="Greater Accra"
              specialty="Food Processing, Export Markets"
              avatarText="DA"
              avatarColor="bg-purple-100 dark:bg-purple-800/30"
              roleColor="text-purple-600 dark:text-purple-400"
              onConnect={() => handleConnectWithUser("David Asare")}
            />
            
            <UserCard 
              name="Mary Osei"
              role="Landowner"
              location="Volta Region"
              specialty="Timber, Mixed Farming Land"
              avatarText="MO"
              avatarColor="bg-green-100 dark:bg-green-800/30"
              roleColor="text-green-600 dark:text-green-400"
              onConnect={() => handleConnectWithUser("Mary Osei")}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// User Card Component for Network
interface UserCardProps {
  name: string;
  role: string;
  location: string;
  specialty: string;
  avatarText: string;
  avatarColor: string;
  roleColor: string;
  onConnect: () => void;
}

const UserCard = ({ 
  name, 
  role, 
  location, 
  specialty, 
  avatarText, 
  avatarColor, 
  roleColor,
  onConnect 
}: UserCardProps) => {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center font-medium`}>
            {avatarText}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{name}</h3>
            <p className={`text-xs ${roleColor}`}>{role}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <Landmark className="h-3 w-3 mr-1" />
              {location}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 mb-3">
              Specializes in: {specialty}
            </p>
            <Button size="sm" variant="outline" className="w-full" onClick={onConnect}>
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSidebar;
