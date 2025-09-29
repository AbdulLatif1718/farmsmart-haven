import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { LandMonetizationForm } from '@/components/LandMonetizationForm';
import { ExpertApplicationForm } from '@/components/ExpertApplicationForm';
import { toast } from '@/hooks/use-toast';
import { 
  Home, 
  MapPin, 
  Users, 
  Star, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  Search,
  ChevronRight,
  Wheat,
  TreePine,
  Fish,
  Heart,
  Share2,
  MessageCircle,
  Award,
  CheckCircle,
  Clock,
  DollarSign,
  Ruler,
  Plus
} from 'lucide-react';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('farms');
  const [searchQuery, setSearchQuery] = useState('');
  const [lands, setLands] = useState<any[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLandForm, setShowLandForm] = useState(false);
  const [showExpertForm, setShowExpertForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch approved land applications
      const { data: landData, error: landError } = await supabase
        .from('land_applications')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (landError) throw landError;

      // Fetch approved expert applications
      const { data: expertData, error: expertError } = await supabase
        .from('expert_applications')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (expertError) throw expertError;

      setLands(landData || []);
      setExperts(expertData || []);
    } catch (error: any) {
      console.error('Error fetching services data:', error);
      toast({
        title: "Error",
        description: "Failed to load services data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Tabs component for service categories
  const Tabs = ({ value, onValueChange, tabs }) => {
    return (
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={value === tab.id ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => onValueChange(tab.id)}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>
    );
  };

  // Mock farms data
  const mockFarms = [
    {
      id: 1,
      title: "Green Valley Farm",
      location: "Greater Accra, Ghana",
      type: "Mixed Farming",
      size: "50 acres",
      price: "₵85,000/year lease",
      image: "🌾",
      features: ["Irrigation System", "Storage Facilities", "Worker Quarters"],
      rating: 4.8,
      reviews: 24,
      owner: "Samuel Mensah",
      verified: true,
      description: "Fertile farmland perfect for crop cultivation and livestock rearing.",
      crops: ["Maize", "Cassava", "Yam"]
    },
  ];

  // Mock experts data (removed - will come from database)
  const mockExperts = [
    {
      id: 1,
      name: "Dr. Kwame Asante",
      title: "Agricultural Consultant",
      specialization: "Crop Production & Soil Management",
      experience: "15+ years",
      rating: 4.9,
      reviews: 127,
      image: "👨‍🌾",
      location: "Greater Accra",
      rate: "₵200/hour",
      verified: true,
      services: ["Farm Planning", "Soil Testing", "Crop Selection"],
      languages: ["English", "Twi", "Ga"],
      phone: "+233 24 123 4567",
      email: "kwame.asante@agriexpert.com"
    },
    {
      id: 2,
      name: "Maame Akosua Owusu",
      title: "Livestock Specialist",
      specialization: "Animal Husbandry & Veterinary Care",
      experience: "12+ years",
      rating: 4.8,
      reviews: 89,
      image: "👩‍⚕️",
      location: "Ashanti Region",
      rate: "₵180/hour",
      verified: true,
      services: ["Animal Health", "Breeding Programs", "Feed Formulation"],
      languages: ["English", "Twi"],
      phone: "+233 24 987 6543",
      email: "akosua.owusu@vetcare.com"
    },
    {
      id: 3,
      name: "Ibrahim Mohammed",
      title: "Irrigation Engineer",
      specialization: "Water Management & Irrigation Systems",
      experience: "10+ years",
      rating: 4.7,
      reviews: 65,
      image: "👨‍💼",
      location: "Northern Region",
      rate: "₵250/hour",
      verified: true,
      services: ["Irrigation Design", "Water Testing", "System Installation"],
      languages: ["English", "Hausa", "Dagbani"],
      phone: "+233 24 555 7890",
      email: "ibrahim.mohammed@watertech.com"
    }
  ];

  const tabs = [
    { id: 'farms', label: 'Get a Farm', icon: Home },
    { id: 'land', label: 'Get Land', icon: MapPin },
    { id: 'experts', label: 'Find Experts', icon: Users }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'farms': return mockFarms;
      case 'land': return lands;
      case 'experts': return experts;
      default: return [];
    }
  };

  const renderFarmCard = (farm) => (
    <Card key={farm.id} className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 text-center">
            <span className="text-4xl">{farm.image}</span>
          </div>
          {farm.verified && (
            <Badge className="absolute top-2 right-2 bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{farm.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {farm.location}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline">{farm.type}</Badge>
            <div className="text-right">
              <div className="font-semibold text-green-600">{farm.price}</div>
              <div className="text-sm text-gray-500">{farm.size}</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{farm.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {farm.crops.map((crop, i) => (
              <span key={i} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                {crop}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{farm.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({farm.reviews} reviews)</span>
            </div>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Contact Owner
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderLandCard = (land) => {
    const features = [];
    if (land.has_water_source) features.push('Water Source');
    if (land.has_road_access) features.push('Road Access');
    if (land.has_power_supply) features.push('Power Supply');

    return (
      <Card key={land.id} className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-8 text-center">
              <span className="text-4xl">🏞️</span>
            </div>
            <Badge className="absolute top-2 right-2 bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{land.land_size} {land.size_unit}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {land.location}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Size:</span>
                <div className="font-medium">{land.land_size} {land.size_unit}</div>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <div className="font-medium text-green-600">GH₵ {land.price}</div>
              </div>
              <div>
                <span className="text-gray-500">Soil Type:</span>
                <div className="font-medium capitalize">{land.soil_type || 'Not specified'}</div>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <div className="font-medium capitalize">{land.monetization_type}</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2">{land.description}</p>
            
            <div className="flex flex-wrap gap-1">
              {features.map((feature, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="text-sm text-gray-600">
                Owner: <span className="font-medium">{land.owner_name}</span>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderExpertCard = (expert) => (
    <Card key={expert.id} className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center text-2xl">
            👨‍🌾
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{expert.full_name}</h3>
                <p className="text-sm text-gray-600">{expert.title}</p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{expert.location}</span>
                </div>
              </div>
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
            
            <div className="mt-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Specialization:</span> {expert.specialization.replace('-', ' ')}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Experience:</span> {expert.experience_years}+ years
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-green-600">
                  GH₵ {expert.hourly_rate || 'Contact'}/hour
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {expert.services_offered?.slice(0, 3).map((service, i) => (
                <span key={i} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                  {service}
                </span>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                <MessageCircle className="h-4 w-4 mr-1" />
                Contact
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    const data = getCurrentData();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          if (activeTab === 'farms') return renderFarmCard(item);
          if (activeTab === 'land') return renderLandCard(item);
          if (activeTab === 'experts') return renderExpertCard(item);
        })}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agricultural Services
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find farms, land, and agricultural experts to grow your business
          </p>
        </div>

        {/* Service Categories */}
        <div className="border-b border-gray-200 pb-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            tabs={[
              { id: 'farms', label: 'Lease a Farm', icon: Home },
              { id: 'land', label: 'Buy Land', icon: MapPin },
              { id: 'experts', label: 'Find Experts', icon: Users }
            ]}
          />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort by: Newest
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Home className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold">248</p>
                  <p className="text-sm text-gray-600">Available Farms</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold">156</p>
                  <p className="text-sm text-gray-600">Land Plots</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold">89</p>
                  <p className="text-sm text-gray-600">Verified Experts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Content Sections */}
        {activeTab === 'farms' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Available Farm Properties</h2>
              <p className="text-muted-foreground">Ready-to-use farms for immediate lease</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFarms.map(farm => renderFarmCard(farm))}
            </div>
          </div>
        )}

        {activeTab === 'land' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Agricultural Land</h2>
                <p className="text-muted-foreground">Prime farming land for purchase or lease</p>
              </div>
              {isAuthenticated && (
                <Button onClick={() => setShowLandForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your Land
                </Button>
              )}
            </div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading land listings...</p>
              </div>
            ) : lands.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No land listings available yet</p>
                  {isAuthenticated && (
                    <Button onClick={() => setShowLandForm(true)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Your Land
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lands.map(land => renderLandCard(land))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'experts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-1">Agricultural Experts</h2>
                <p className="text-muted-foreground">Connect with verified farming professionals</p>
              </div>
              {isAuthenticated && (
                <Button onClick={() => setShowExpertForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Become an Expert
                </Button>
              )}
            </div>
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading experts...</p>
              </div>
            ) : experts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No experts available yet</p>
                  {isAuthenticated && (
                    <Button onClick={() => setShowExpertForm(true)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Become an Expert
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map(expert => renderExpertCard(expert))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Forms */}
      <LandMonetizationForm 
        isOpen={showLandForm} 
        onClose={() => {
          setShowLandForm(false);
          fetchData(); // Refresh data after submission
        }} 
      />
      <ExpertApplicationForm 
        isOpen={showExpertForm} 
        onClose={() => {
          setShowExpertForm(false);
          fetchData(); // Refresh data after submission
        }} 
      />
    </MainLayout>
  );
};

export default ServicesPage;