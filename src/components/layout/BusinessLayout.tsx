
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BusinessSidebar } from '../business/BusinessSidebar';
import { BusinessRole } from '../business/RoleSelector';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BusinessLayoutProps {
  children: React.ReactNode;
  activeRole: BusinessRole;
}

export const BusinessLayout = ({ children, activeRole }: BusinessLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/landing');
  };

  // Role-specific color
  const getRoleColor = () => {
    switch (activeRole) {
      case 'investor': return 'bg-blue-600';
      case 'landowner': return 'bg-green-600';
      case 'farmer': return 'bg-amber-600';
      case 'buyer': return 'bg-purple-600';
      default: return 'bg-blue-600';
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="mr-3 lg:mr-4 md:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="mr-3 lg:mr-4 hidden md:flex"
              aria-label="Collapse sidebar"
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            
            <h1 className="text-xl font-semibold flex items-center">
              <span className="text-green-600">Agri</span>
              <span className="text-blue-600">Business</span>
              <Badge className={cn("ml-2 text-white", getRoleColor())}>
                {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
              </Badge>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2" size="sm">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">BU</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Business User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 relative">
        <BusinessSidebar 
          open={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          activeRole={activeRole} 
          collapsed={sidebarCollapsed}
        />
        
        <main className={cn(
          "flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300",
          !isMobile && !sidebarCollapsed ? "md:ml-72" : "",
          !isMobile && sidebarCollapsed ? "md:ml-20" : ""
        )}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessLayout;
