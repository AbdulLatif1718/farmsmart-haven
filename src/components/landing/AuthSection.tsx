
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Demo credentials for login
const DEMO_EMAIL = 'sulley@gmail.com';
const DEMO_PASSWORD = 'sulley1234';

// Business demo credentials
const BUSINESS_EMAIL = 'business@example.com';
const BUSINESS_PASSWORD = 'business1234';

const AuthSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [role, setRole] = useState('farmer');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (role === 'farmer' && email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'farmer');
        toast({
          title: "Login successful",
          description: "Welcome to AgriAI-Ghana!",
        });
        navigate('/dashboard');
      } else if (role === 'business' && email === BUSINESS_EMAIL && password === BUSINESS_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'business');
        toast({
          title: "Business login successful",
          description: "Welcome to the Business Dashboard!",
        });
        navigate('/business');
      } else {
        setLoginError('Invalid credentials. Try sulley@gmail.com / sulley1234 for Farmer or business@example.com / business1234 for Business');
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (role === 'farmer') {
        toast({
          title: "Please use the demo account",
          description: "Use sulley@gmail.com / sulley1234 to login as a Farmer",
        });
      } else {
        toast({
          title: "Please use the demo account",
          description: "Use business@example.com / business1234 to login as a Business user",
        });
      }
      
      const loginTab = document.querySelector('[data-state="inactive"][value="login"]') as HTMLElement;
      if (loginTab) loginTab.click();
    }, 1000);
  };

  return (
    <section id="auth-section" className="py-20 bg-gradient-wheat">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="border-leaf-200">
                <CardHeader>
                  <CardTitle className="text-soil-800">Login to your account</CardTitle>
                  <CardDescription className="text-soil-600">
                    Select your role and enter your credentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <RadioGroup 
                        value={role} 
                        onValueChange={setRole} 
                        className="grid grid-cols-2 gap-4 mb-4"
                      >
                        <div>
                          <RadioGroupItem value="farmer" id="farmer" className="peer sr-only" />
                          <Label
                            htmlFor="farmer"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                          >
                            <span className="font-medium">Farmer</span>
                            <span className="text-xs text-muted-foreground mt-1">Login as a farmer</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="business" id="business" className="peer sr-only" />
                          <Label
                            htmlFor="business"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                          >
                            <span className="font-medium">Business</span>
                            <span className="text-xs text-muted-foreground mt-1">Investor or Landowner</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-soil-700">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={role === 'farmer' ? "sulley@gmail.com" : "business@example.com"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-soil-300 focus-visible:ring-leaf-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-soil-700">
                          Password
                        </label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-soil-300 focus-visible:ring-leaf-500"
                        />
                      </div>
                      {loginError && (
                        <p className="text-sm text-destructive">{loginError}</p>
                      )}
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full bg-leaf-600 hover:bg-leaf-700 text-white"
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                      <p className="text-sm text-soil-600 text-center">
                        {role === 'farmer' 
                          ? "Use sulley@gmail.com / sulley1234 for demo"
                          : "Use business@example.com / business1234 for demo"}
                      </p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-soil-600">
                    Don't have an account? Switch to Sign Up
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card className="border-leaf-200">
                <CardHeader>
                  <CardTitle className="text-soil-800">Create an account</CardTitle>
                  <CardDescription className="text-soil-600">
                    Select your role and create your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup}>
                    <div className="grid gap-4">
                      <RadioGroup 
                        value={role} 
                        onValueChange={setRole} 
                        className="grid grid-cols-2 gap-4 mb-4"
                      >
                        <div>
                          <RadioGroupItem value="farmer" id="s-farmer" className="peer sr-only" />
                          <Label
                            htmlFor="s-farmer"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                          >
                            <span className="font-medium">Farmer</span>
                            <span className="text-xs text-muted-foreground mt-1">Sign up as a farmer</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="business" id="s-business" className="peer sr-only" />
                          <Label
                            htmlFor="s-business"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                          >
                            <span className="font-medium">Business</span>
                            <span className="text-xs text-muted-foreground mt-1">Investor or Landowner</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      <div className="grid gap-2">
                        <label htmlFor="signup-email" className="text-sm font-medium text-soil-700">
                          Email
                        </label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-soil-300 focus-visible:ring-leaf-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="signup-password" className="text-sm font-medium text-soil-700">
                          Password
                        </label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="border-soil-300 focus-visible:ring-leaf-500"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full bg-leaf-600 hover:bg-leaf-700 text-white"
                      >
                        {isLoading ? "Creating account..." : "Sign Up"}
                      </Button>
                      <p className="text-sm text-center text-soil-600">
                        For demo, please use the login with demo credentials
                      </p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-soil-600">
                    Already have an account? Switch to Login
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
