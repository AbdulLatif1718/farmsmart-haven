
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, Bell, UserCircle, LogOut } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NavBarProps {
  onMenuToggle: () => void;
}

// Demo credentials
const USER_CREDENTIALS = {
  farmer: { email: 'farmer@example.com', password: 'farmer123', name: 'Farmer User' },
  youth: { email: 'youth@example.com', password: 'youth123', name: 'Kwame Agyei' },
  investor: { email: 'investor@example.com', password: 'investor123', name: 'Diaspora Investor' }
};

export const NavBar = ({ onMenuToggle }: NavBarProps) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme
    return localStorage.getItem('theme') || 'light';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage for login status
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'farmer';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRole, setLoginRole] = useState('farmer');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Effect for setting up theme based on localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Effect to redirect user if not logged in
  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== '/landing') {
      navigate('/landing');
    }
    
    // Save login status to localStorage
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn, navigate]);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    toast({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`,
      duration: 2000,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    setTimeout(() => {
      setIsLoading(false);
      
      const userCreds = USER_CREDENTIALS[loginRole as keyof typeof USER_CREDENTIALS];
      if (email === userCreds.email && password === userCreds.password) {
        setIsLoggedIn(true);
        setUserRole(loginRole);
        localStorage.setItem('userRole', loginRole);
        
        toast({
          title: "Login successful",
          description: `Welcome to AgriVerse Africa, ${userCreds.name}!`,
        });
        
        // Redirect based on role
        if (loginRole === 'farmer') {
          navigate('/dashboard');
        } else if (loginRole === 'youth') {
          navigate('/youth');
        } else if (loginRole === 'investor') {
          navigate('/investor');
        }
      } else {
        let credentialHint = '';
        
        if (loginRole === 'farmer') {
          credentialHint = 'Try farmer@example.com / farmer123';
        } else if (loginRole === 'youth') {
          credentialHint = 'Try youth@example.com / youth123';
        } else if (loginRole === 'investor') {
          credentialHint = 'Try investor@example.com / investor123';
        }
        
        setLoginError(`Invalid email or password. ${credentialHint}`);
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    toast({
      title: "Logged out",
      description: "You have been logged out of your account",
    });
    navigate('/landing');
  };
  
  const getUserDisplayName = () => {
    if (userRole === 'farmer') {
      return 'Farmer User';
    } else if (userRole === 'youth') {
      return 'Kwame Agyei';
    } else if (userRole === 'investor') {
      return 'Diaspora Investor';
    }
    return 'User';
  };
  
  const getUserInitials = () => {
    if (userRole === 'farmer') {
      return 'FU';
    } else if (userRole === 'youth') {
      return 'KA';
    } else if (userRole === 'investor') {
      return 'DI';
    }
    return 'U';
  };
  
  return (
    <nav className="bg-card border-b border-border shadow-sm px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
        
        <Link 
          to={
            isLoggedIn 
              ? (
                  userRole === 'youth' 
                    ? "/youth" 
                    : userRole === 'investor' 
                      ? "/investor" 
                      : "/dashboard"
                )
              : "/landing"
          } 
          className="flex items-center"
        >
          <span className="font-bold text-xl text-leaf-600">Agri</span>
          <span className="font-bold text-xl text-sky-600">Verse</span>
          <span className="text-sm font-medium ml-1">Africa</span>
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
                  <AvatarFallback className="bg-leaf-100 text-leaf-800">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{getUserDisplayName()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] mt-1">
              <DropdownMenuItem asChild>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive flex items-center gap-2" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
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
                    Select your role and login with the demo credentials
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue={loginRole} onValueChange={setLoginRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farmer">Farmer</SelectItem>
                        <SelectItem value="youth">Youth Agripreneur</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground">
                      {loginRole === 'farmer' 
                        ? "Use farmer@example.com / farmer123" 
                        : loginRole === 'youth'
                          ? "Use youth@example.com / youth123"
                          : "Use investor@example.com / investor123"
                      }
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={
                        loginRole === 'farmer' 
                          ? "farmer@example.com" 
                          : loginRole === 'youth'
                            ? "youth@example.com"
                            : "investor@example.com"
                      }
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
                  {loginError && (
                    <p className="text-sm text-destructive">{loginError}</p>
                  )}
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
