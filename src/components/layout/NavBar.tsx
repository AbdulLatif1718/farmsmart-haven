import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NavBarProps {
  onMenuToggle: () => void;
}

export const NavBar = ({ onMenuToggle }: NavBarProps) => {
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    toast({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`,
      duration: 2000,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Accept any credentials during development
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      toast({
        title: "Login successful",
        description: "Welcome to AgriAI-Ghana!",
      });
      navigate('/dashboard');
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out of your account",
    });
    navigate('/landing');
  };
  
  return (
    <nav className="bg-card border-b border-border shadow-sm px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        
        <Link to="/dashboard" className="flex items-center">
          <span className="font-bold text-xl text-leaf-600">Agri</span>
          <span className="font-bold text-xl text-sky-600">AI</span>
          <span className="text-sm font-medium ml-1">Ghana</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-leaf-500"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] mt-1">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-medium">Notifications</h3>
            </div>
            <div className="py-2 px-4 text-sm text-muted-foreground">
              <p>Weather alert: Expect rain tomorrow afternoon</p>
              <p className="text-xs mt-1">1 hour ago</p>
            </div>
            <div className="py-2 px-4 text-sm border-t border-border text-muted-foreground">
              <p>New recommendations for maize available</p>
              <p className="text-xs mt-1">3 hours ago</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center ml-1.5" size="sm">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-leaf-100 text-leaf-800">KA</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">Kofi Adjei</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] mt-1">
              <DropdownMenuItem asChild>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleLogin}>
                <DialogHeader>
                  <DialogTitle>Login to your account</DialogTitle>
                  <DialogDescription>
                    Enter any email and password for development
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </nav>
  );
};
