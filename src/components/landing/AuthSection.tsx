
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Demo credentials for login
const DEMO_EMAIL = 'sulley@gmail.com';
const DEMO_PASSWORD = 'sulley1234';

const AuthSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        toast({
          title: "Login successful",
          description: "Welcome to AgriAI-Ghana!",
        });
        navigate('/dashboard');
      } else {
        setLoginError('Invalid email or password. Try sulley@gmail.com / sulley1234');
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
      toast({
        title: "Please use the demo account",
        description: "Use sulley@gmail.com / sulley1234 to login",
      });
      
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
                    Use demo credentials: sulley@gmail.com / sulley1234
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-soil-700">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="sulley@gmail.com"
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
                    For demo purposes, please use the login tab with demo credentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup}>
                    <div className="grid gap-4">
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
                        For demo, please use the login with sulley@gmail.com / sulley1234
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
