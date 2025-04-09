
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Cloud, Leaf, ShoppingCart, Tractor, BookOpen, Check, ArrowRight, Truck, MapPin } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome to AgriAI-Ghana!",
      });
      navigate('/dashboard');
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Welcome to AgriAI-Ghana!",
      });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-leaf-600">Agri</span>
            <span className="font-bold text-2xl text-sky-600">AI</span>
            <span className="text-sm font-medium ml-1">Ghana</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-leaf-600 transition-colors">Features</a>
            <a href="#benefits" className="text-sm font-medium hover:text-leaf-600 transition-colors">Benefits</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-leaf-600 transition-colors">Testimonials</a>
          </nav>
          <Button onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-leaf-50 to-sky-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-leaf-900/[0.03] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-leaf-950">
              Transform Your Farming with AI-Powered Solutions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Get personalized crop recommendations, real-time weather alerts, access to market opportunities, and reliable transport solutions - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Start for Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Smart Farming</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-leaf-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Farmers Benefit</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AgriAI-Ghana helps farmers across the country increase productivity and improve their livelihoods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
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
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transport & Logistics Section - NEW SECTION */}
      <section id="transport" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Reliable Transport & Logistics</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Move your produce to market efficiently with our trusted transport network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-leaf-200 hover:border-leaf-400 transition-colors">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-leaf-600" />
                </div>
                <CardTitle>Verified Transporters</CardTitle>
                <CardDescription>
                  All transport providers are vetted and rated by other farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
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
                <CardTitle>Real-Time Tracking</CardTitle>
                <CardDescription>
                  Know exactly where your produce is at all times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
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
                <CardTitle>Market Delivery</CardTitle>
                <CardDescription>
                  Connect directly with buyers at major markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-leaf-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Hear from Our Farmers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              <Card key={index} className="border-none bg-muted">
                <CardContent className="pt-6">
                  <p className="mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth-section" className="py-20 bg-gradient-to-br from-leaf-50 to-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
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
                          <label htmlFor="password" className="text-sm font-medium">
                            Password
                          </label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                          {isLoading ? "Logging in..." : "Login"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account? Switch to Sign Up
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                      Join thousands of farmers using AgriAI-Ghana
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="signup-email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="signup-password" className="text-sm font-medium">
                            Password
                          </label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                          {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account? Switch to Login
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="font-bold text-2xl text-leaf-600">Agri</span>
              <span className="font-bold text-2xl text-sky-600">AI</span>
              <span className="text-sm font-medium ml-1">Ghana</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <a href="#features" className="text-sm hover:text-leaf-600 transition-colors">Features</a>
              <a href="#benefits" className="text-sm hover:text-leaf-600 transition-colors">Benefits</a>
              <a href="#transport" className="text-sm hover:text-leaf-600 transition-colors">Transport</a>
              <a href="#testimonials" className="text-sm hover:text-leaf-600 transition-colors">Testimonials</a>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Started
              </Button>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AgriAI-Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
