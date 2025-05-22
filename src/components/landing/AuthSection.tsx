
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, UserCheck, MailCheck, Lock, Check } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Demo credentials for login
const USER_CREDENTIALS = {
  farmer: { email: 'farmer@example.com', password: 'farmer123' },
  youth: { email: 'youth@example.com', password: 'youth123' },
  investor: { email: 'investor@example.com', password: 'investor123' }
};

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["farmer", "youth", "investor"], { required_error: "Please select a role" }),
});

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
  role: z.enum(["farmer", "youth", "investor"], { required_error: "Please select a role" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AuthSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "farmer",
    },
  });

  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "farmer",
    },
  });

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      const userCreds = USER_CREDENTIALS[values.role];
      if (values.email === userCreds.email && values.password === userCreds.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', values.role);
        
        toast({
          title: "Login successful",
          description: `Welcome to AgriAI-Ghana!`,
        });

        // Redirect based on role
        if (values.role === 'farmer') {
          navigate('/dashboard');
        } else if (values.role === 'youth') {
          navigate('/youth');
        } else if (values.role === 'investor') {
          navigate('/investor');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleSignup = (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setSignupSuccess(true);
      
      toast({
        title: "Account created successfully!",
        description: "You can now log in with your credentials",
      });

      // Switch to login tab
      const loginTab = document.querySelector('[data-state="inactive"][value="login"]') as HTMLElement;
      if (loginTab) loginTab.click();
      
      // Reset form
      signupForm.reset();
      setSignupSuccess(false);
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
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Select Your Role</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <div>
                                  <RadioGroupItem value="farmer" id="farmer" className="peer sr-only" />
                                  <Label
                                    htmlFor="farmer"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                                  >
                                    <span className="font-medium">Farmer</span>
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="youth" id="youth" className="peer sr-only" />
                                  <Label
                                    htmlFor="youth"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                                  >
                                    <span className="font-medium">Youth</span>
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="investor" id="investor" className="peer sr-only" />
                                  <Label
                                    htmlFor="investor"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                                  >
                                    <span className="font-medium">Investor</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MailCheck className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input
                                  placeholder="Enter your email"
                                  className="pl-10 border-soil-300 focus-visible:ring-leaf-500"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input
                                  type="password"
                                  placeholder="••••••••"
                                  className="pl-10 border-soil-300 focus-visible:ring-leaf-500"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full bg-leaf-600 hover:bg-leaf-700 text-white"
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>

                      <div className="text-sm text-soil-600 text-center space-y-1">
                        <p>Demo Credentials:</p>
                        <p>Farmer: farmer@example.com / farmer123</p>
                        <p>Youth: youth@example.com / youth123</p>
                        <p>Investor: investor@example.com / investor123</p>
                      </div>
                    </form>
                  </Form>
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
                    Join AgriAI Ghana by creating your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {signupSuccess ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-soil-800">Registration Successful</h3>
                      <p className="text-soil-600">Your account has been created. You can now log in.</p>
                      <Button 
                        onClick={() => {
                          const loginTab = document.querySelector('[data-state="inactive"][value="login"]') as HTMLElement;
                          if (loginTab) loginTab.click();
                        }}
                        className="bg-leaf-600 hover:bg-leaf-700 text-white"
                      >
                        Proceed to Login
                      </Button>
                    </div>
                  ) : (
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
                        <FormField
                          control={signupForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Select Your Role</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-3 gap-4"
                                >
                                  <div>
                                    <RadioGroupItem value="farmer" id="s-farmer" className="peer sr-only" />
                                    <Label
                                      htmlFor="s-farmer"
                                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                                    >
                                      <span className="font-medium">Farmer</span>
                                    </Label>
                                  </div>
                                  <div>
                                    <RadioGroupItem value="youth" id="s-youth" className="peer sr-only" />
                                    <Label
                                      htmlFor="s-youth"
                                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                                    >
                                      <span className="font-medium">Youth</span>
                                    </Label>
                                  </div>
                                  <div>
                                    <RadioGroupItem value="investor" id="s-investor" className="peer sr-only" />
                                    <Label
                                      htmlFor="s-investor"
                                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-leaf-500 [&:has([data-state=checked])]:border-leaf-500"
                                    >
                                      <span className="font-medium">Investor</span>
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  <Input
                                    placeholder="Enter your full name"
                                    className="pl-10 border-soil-300 focus-visible:ring-leaf-500"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MailCheck className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  <Input
                                    placeholder="Enter your email"
                                    className="pl-10 border-soil-300 focus-visible:ring-leaf-500"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  <Input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="pl-10 border-soil-300 focus-visible:ring-leaf-500"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <UserCheck className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="pl-10 border-soil-300 focus-visible:ring-leaf-500"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          disabled={isLoading} 
                          className="w-full bg-leaf-600 hover:bg-leaf-700 text-white"
                        >
                          {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                      </form>
                    </Form>
                  )}
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
