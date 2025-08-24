
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Home, 
  Sprout, 
  ShoppingCart, 
  Users, 
  GraduationCap,
  Truck,
  Settings,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { FundingApplicationForm } from '@/components/FundingApplicationForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [showFundingForm, setShowFundingForm] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Get Funding",
      description: "Apply for agricultural loans and grants",
      icon: DollarSign,
      action: () => setShowFundingForm(true),
      color: "green",
      featured: true
    },
    {
      title: "Join a Project",
      description: "Collaborate on agricultural projects",
      icon: Users,
      action: () => navigate('/projects'),
      color: "blue",
      featured: true
    },
    {
      title: "Start a Farm",
      description: "Begin your agricultural journey",
      icon: Sprout,
      action: () => navigate('/farm'),
      color: "emerald"
    },
    {
      title: "Get a Farm",
      description: "Find available farmland to lease or buy", 
      icon: Home,
      action: () => navigate('/marketplace'),
      color: "blue"
    },
    {
      title: "Explore Market",
      description: "Browse crops, equipment, and services",
      icon: ShoppingCart,
      action: () => navigate('/marketplace'),
      color: "orange"
    },
    {
      title: "Find Transport",
      description: "Book delivery and logistics services",
      icon: Truck,
      action: () => navigate('/transport'),
      color: "purple"
    },
    {
      title: "Get a Farmer",
      description: "Hire experienced farmers for your land",
      icon: Users,
      action: () => navigate('/marketplace'),
      color: "indigo"
    },
    {
      title: "Find an Expert",
      description: "Connect with agricultural consultants",
      icon: GraduationCap,
      action: () => navigate('/knowledge'),
      color: "teal"
    }
  ];

  return (
    <MainLayout>
<div className="mb-8">
  <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
    <CardHeader>
      <CardTitle className="text-3xl font-extrabold text-green-600">
        Welcome back, {profile?.full_name?.split(' ')[0] || 'Friend'}! 🌱
      </CardTitle>
      <CardDescription className="text-muted-foreground font-bold">
        Let’s build wealth through smart farming.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        You’re in the right place to <span className="font-semibold text-primary">grow wealth</span>, 
        <span className="font-semibold text-green-700"> feed Africa</span>, and 
        <span className="font-semibold text-emerald-700"> boost our economy</span>.  
        Let’s make farming the future together. 🌍✨
      </p>
    </CardContent>
  </Card>
</div>


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                action.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/30`}>
                    <action.icon className={`h-6 w-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Farmers</CardTitle>
            <CardDescription>Tools and resources to optimize your farming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/crops')}>
              <Sprout className="h-4 w-4 mr-2" />
              Manage Your Farm
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/machinery')}>
              <Settings className="h-4 w-4 mr-2" />
              Rent Equipment
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
              <GraduationCap className="h-4 w-4 mr-2" />
              Learn Best Practices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Investors</CardTitle>
            <CardDescription>Discover profitable agricultural opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/marketplace')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Browse Investments
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/marketplace')}>
              <MapPin className="h-4 w-4 mr-2" />
              Find Farms
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/marketplace')}>
              <Users className="h-4 w-4 mr-2" />
              Connect with Farmers
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Everyone</CardTitle>
            <CardDescription>Join the agricultural community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/marketplace')}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shop Fresh Produce
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/transport')}>
              <Truck className="h-4 w-4 mr-2" />
              Logistics Services
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
              <GraduationCap className="h-4 w-4 mr-2" />
              Agricultural Knowledge
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <FundingApplicationForm 
        isOpen={showFundingForm}
        onClose={() => setShowFundingForm(false)}
      />
    </MainLayout>
  );
};

export default Index;
