
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { InvestorSidebar } from '@/components/investor/InvestorSidebar';
import { toggleTheme } from '@/utils/themeUtils';
import { Footer } from './Footer';

interface InvestorLayoutProps {
  children: React.ReactNode;
}

export const InvestorLayout = ({ children }: InvestorLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-3 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            
            <h1 className="text-xl font-semibold md:hidden">
              <span className="text-blue-600 dark:text-blue-500">Investor</span>
              <span className="text-green-600 dark:text-green-500">AgriVerse</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="relative"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 hidden md:flex">
              <Zap className="mr-2 h-4 w-4" />
              Fund New Project
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2" size="sm">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-800">IN</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Investor</span>
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
      
      <div className="flex flex-1">
        <InvestorSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default InvestorLayout;
