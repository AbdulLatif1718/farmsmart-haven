import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Cloud, Leaf, ShoppingCart, Tractor, BookOpen, Check, ArrowRight, Truck, MapPin } from 'lucide-react';

const DEMO_EMAIL = 'sulley@gmail.com';
const DEMO_PASSWORD = 'sulley1234';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

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
    <div className="min-h-screen flex flex-col">
      <header className="bg-background/90 backdrop-blur-sm border-b border-soil-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-leaf-700">Agri</span>
            <span className="font-bold text-2xl text-sky-600">AI</span>
            <span className="text-sm font-medium ml-1 text-soil-700">Ghana</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-leaf-700 transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-medium hover:text-leaf-700 transition-colors">Benefits</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-leaf-700 transition-colors">Testimonials</a>
          </nav>
          <Button 
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-leaf-600 hover:bg-leaf-700 text-white"
          >
            Get Started
          </Button>
        </div>
      </header>

      <section className="relative py-20 md:py-32 bg-gradient-wheat overflow-hidden">
        <div className="absolute inset-0 bg-grain-texture"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-soil-900">
              Transform Your Farming with AI-Powered Solutions
            </h1>
            <p className="text-xl md:text-2xl text-soil-800 mb-8">
              Get personalized crop recommendations, real-time weather alerts, access to market opportunities, and reliable transport solutions - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 bg-leaf-600 hover:bg-leaf-700 text-white" 
                onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start for Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-leaf-600 text-leaf-700 hover:bg-leaf-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-soil-800">Powerful Features for Smart Farming</h2>
            <p className="text-xl text-soil-700 max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to optimize your farming practices and increase yields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "AI Crop Recommendations",
                description: "Get personalized crop suggestions based on your soil conditions, weather patterns, and market demand."
              },
              {
                icon: Cloud,
                title: "Weather Forecasting",
                description: "Receive accurate, localized weather predictions and alerts to protect your crops."
              },
              {
                icon: ShoppingCart,
                title: "Digital Marketplace",
                description: "Sell your produce directly to buyers and access fair market prices."
              },
              {
                icon: Tractor,
                title: "Machinery Rentals",
                description: "Rent farming equipment when you need it, without the high cost of ownership."
              },
              {
                icon: Truck,
                title: "Transport & Logistics",
                description: "Book reliable transport services to move your produce to markets efficiently and track deliveries in real-time."
              },
              {
                icon: BookOpen,
                title: "Knowledge Hub",
                description: "Access farming guides, tutorials, and best practices in your local language."
              }
            ].map((feature, index) => (
              <Card key={index} className="border-leaf-200 hover:border-leaf-400 transition-colors">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-leaf-600 mb-4" />
                  <CardTitle className="text-soil-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-soil-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-wheat-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-soil-800">How Farmers Benefit</h2>
            <p className="text-xl text-soil-700 max-w-2xl mx-auto">
              AgriAI-Ghana helps farmers across the country increase productivity and improve their livelihoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/image.png" 
                alt="Farmer in field" 
                className="rounded-xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-6">
              {[
                "Increase crop yields by up to 30% with AI-powered recommendations",
                "Reduce post-harvest losses through better storage practices",
                "Access new markets and sell at fair prices",
                "Make informed decisions with real-time weather alerts",
                "Transport produce reliably with verified logistics providers",
                "Learn new farming techniques through the knowledge hub"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="rounded-full bg-leaf-100 p-1">
                    <Check className="h-5 w-5 text-leaf-600" />
                  </div>
                  <p className="text-lg text-soil-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="transport" className="py-20 bg-gradient-farm bg-opacity-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-soil-800">Reliable Transport & Logistics</h2>
            <p className="text-xl text-soil-700 max-w-2xl mx-auto">
              Move your produce to market efficiently with our trusted transport network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-leaf-200 hover:border-leaf-400 transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-leaf-600" />
                </div>
                <CardTitle className="text-soil-800">Verified Transporters</CardTitle>
                <CardDescription className="text-soil-600">
                  All transport providers are vetted and rated by other farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-soil-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Identity verified</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Vehicle inspections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Transparent pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-leaf-200 hover:border-leaf-400 transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-leaf-600" />
                </div>
                <CardTitle className="text-soil-800">Real-Time Tracking</CardTitle>
                <CardDescription className="text-soil-600">
                  Know exactly where your produce is at all times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-soil-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>GPS tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Automated alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>ETA updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-leaf-200 hover:border-leaf-400 transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-leaf-600" />
                </div>
                <CardTitle className="text-soil-800">Market Delivery</CardTitle>
                <CardDescription className="text-soil-600">
                  Connect directly with buyers at major markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-soil-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Direct market access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Bulk transport options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-leaf-600" />
                    <span>Group shipping discounts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-wheat-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-soil-800">Hear from Our Farmers</h2>
            <p className="text-xl text-soil-700 max-w-2xl mx-auto">
              Discover how AgriAI-Ghana is transforming agriculture across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kofi Mensah",
                location: "Ashanti Region",
                quote: "Since using AgriAI, my maize yields have increased by 40%. The weather alerts have saved my crops multiple times during unexpected rains."
              },
              {
                name: "Ama Darko",
                location: "Eastern Region",
                quote: "The marketplace feature has connected me with buyers who pay fair prices. I no longer have to sell at low prices to middlemen."
              },
              {
                name: "Kwame Owusu",
                location: "Central Region",
                quote: "The transport booking system has solved my biggest challenge - getting my produce to market. Now I can find reliable trucks with just a few clicks."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none bg-white shadow-md">
                <CardContent className="pt-6">
                  <p className="mb-6 italic text-soil-700">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-soil-800">{testimonial.name}</p>
                    <p className="text-sm text-soil-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      <footer className="bg-soil-800 py-12 text-wheat-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="font-bold text-2xl text-leaf-400">Agri</span>
              <span className="font-bold text-2xl text-sky-400">AI</span>
              <span className="text-sm font-medium ml-1 text-wheat-100">Ghana</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <a href="#features" className="text-sm hover:text-leaf-400 transition-colors">Features</a>
              <a href="#benefits" className="text-sm hover:text-leaf-400 transition-colors">Benefits</a>
              <a href="#transport" className="text-sm hover:text-leaf-400 transition-colors">Transport</a>
              <a href="#testimonials" className="text-sm hover:text-leaf-400 transition-colors">Testimonials</a>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-leaf-400 text-leaf-400 hover:bg-leaf-900/20"
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="border-t border-soil-700 mt-8 pt-8 text-center text-sm text-wheat-100/70">
            <p>© 2025 AgriAI-Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
