import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Sun, Moon, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

interface NavBarProps {
  onMenuToggle: () => void;
}

export const NavBar = ({ onMenuToggle }: NavBarProps) => {
  const { user, profile, signOut } = useAuth();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Effect for setting up theme based on localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    toast({
      title: `${newTheme === "dark" ? "Dark" : "Light"} mode enabled`,
      duration: 2000,
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out of your account",
      });
      navigate("/landing");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getUserDisplayName = () => {
    return profile?.full_name || "User";
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="mr-6"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>

        <Link
          to={
            user
              ? profile?.role === "investor"
                ? "/investor"
                : "/dashboard"
              : "/landing"
          }
          className="flex items-center ml-2"
        >
          <img
            src="/images/agriverse dark.png"
            alt="AgriVerse Africa Logo"
            className="h-12 w-auto transform scale-150 dark:hidden"
          />
          <img
            src="/images/agriverse light.png"
            alt="AgriVerse Africa Logo"
            className="h-12 w-auto transform scale-150 hidden dark:block"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
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

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex items-center ml-1.5"
                size="sm"
              >
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-leaf-100 text-leaf-800">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">
                  {getUserDisplayName()}
                </span>
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
          <Button variant="default" size="sm" onClick={() => navigate("/auth")}>
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};
