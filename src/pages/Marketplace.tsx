import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Map, Clock, ChevronRight, Package, TrendingUp, Eye, Edit, Trash2, Plus, Users, Building2, Globe, Store, Truck, Factory, AlertCircle, Phone, MessageCircle, Zap, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Marketplace = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBuyerType, setSelectedBuyerType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [marketListings, setMarketListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showPriceAlerts, setShowPriceAlerts] = useState(true);
  
  // Form states for listing products
  const [listingForm, setListingForm] = useState({
    title: '',
    description: '',
    product_type: '',
    price: '',
    unit: 'kg',
    quantity_available: '',
    seller_name: '',
    location: '',
    contact_info: '',
    quality_grade: '',
    harvest_date: ''
  });

  useEffect(() => {
    fetchMarketListings();
  }, []);

  const fetchMarketListings = async () => {
    try {
      const { data, error } = await supabase
        .from('market_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMarketListings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load market listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const buyingRequests = [
    {
      id: "REQ-001",
      buyer: "Nestlé Ghana Ltd",
      buyerType: "manufacturer",
      product: "Premium Cocoa Beans",
      quantity: "500 tonnes",
      priceRange: "GH₵ 8.00 - GH₵ 9.50 per kg",
      deadline: "2024-09-15",
      location: "Tema, Greater Accra",
      specifications: "Grade 1, moisture content <7%, fermented",
      verified: true,
      responses: 45
    },
    {
      id: "REQ-002",
      buyer: "Golden Harvest Export",
      buyerType: "exporter",
      product: "Dried Cashew Nuts",
      quantity: "200 tonnes",
      priceRange: "GH₵ 25.00 - GH₵ 30.00 per kg",
      deadline: "2024-09-30",
      location: "Accra Port",
      specifications: "Raw cashew nuts, size 180-210 nuts/kg",
      verified: true,
      responses: 23
    },
    {
      id: "REQ-003",
      buyer: "Farm Fresh Supermarkets",
      buyerType: "retailer",
      product: "Fresh Tomatoes",
      quantity: "2 tonnes weekly",
      priceRange: "GH₵ 1.80 - GH₵ 2.20 per kg",
      deadline: "Ongoing",
      location: "Kumasi, Ashanti Region",
      specifications: "Fresh, firm tomatoes, consistent supply needed",
      verified: false,
      responses: 12
    },
    {
      id: "REQ-004",
      buyer: "Olam Ghana",
      buyerType: "processor",
      product: "Rice (Local Varieties)",
      quantity: "1000 tonnes",
      priceRange: "GH₵ 3.50 - GH₵ 4.20 per kg",
      deadline: "2024-10-20",
      location: "Tamale, Northern Region",
      specifications: "Jasmine or Perfume rice, 14% moisture max",
      verified: true,
      responses: 67
    },
    {
      id: "REQ-005",
      buyer: "AgriTech Solutions",
      buyerType: "distributor",
      product: "Maize Seeds",
      quantity: "50 tonnes",
      priceRange: "GH₵ 8.00 - GH₵ 12.00 per kg",
      deadline: "2024-09-10",
      location: "Ho, Volta Region",
      specifications: "Certified seeds, 85%+ germination rate",
      verified: true,
      responses: 34
    },
    {
      id: "REQ-006",
      buyer: "Continental Foods EU",
      buyerType: "international",
      product: "Organic Shea Nuts",
      quantity: "300 tonnes",
      priceRange: "GH₵ 4.50 - GH₵ 6.00 per kg",
      deadline: "2024-11-01",
      location: "Any region (Export)",
      specifications: "Organic certified, moisture <8%, clean sorting",
      verified: true,
      responses: 89
    }
  ];

  const products = [
    {
      id: 1,
      title: "Premium Maize Seeds (Obatanpa Variety)",
      price: "GH₵ 120.00",
      rating: 4.8,
      reviews: 24,
      distance: "12 km",
      seller: "Kwame Asante Farm",
      sellerType: "farmer",
      category: "seeds",
      stock: 50,
      description: "High-yield drought-resistant maize seeds perfect for Ghana's climate",
      image: "https://images.unsplash.com/photo-1551515038-6baaf893b661?w=400",
      certification: "PPRSD Certified"
    },
    {
      id: 2,
      title: "Grade 1 Cocoa Beans (Fermented)",
      price: "GH₵ 8.50",
      rating: 4.9,
      reviews: 156,
      distance: "45 km",
      seller: "Ashanti Cocoa Cooperative",
      sellerType: "cooperative",
      category: "produce",
      stock: 5000,
      description: "Premium fermented cocoa beans ready for export",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      certification: "COCOBOD Certified"
    },
    {
      id: 3,
      title: "Fresh Organic Tomatoes",
      price: "GH₵ 2.00",
      rating: 4.6,
      reviews: 78,
      distance: "8 km",
      seller: "Valley Fresh Farms Ltd",
      sellerType: "commercial_farm",
      category: "produce",
      stock: 2500,
      description: "Freshly harvested organic tomatoes, perfect for retail",
      image: "https://images.unsplash.com/photo-1546470427-227a6b1f9847?w=400",
      certification: "Organic Certified"
    },
    {
      id: 4,
      title: "Raw Cashew Nuts (Premium Grade)",
      price: "GH₵ 28.00",
      rating: 4.7,
      reviews: 92,
      distance: "67 km",
      seller: "Northern Cashew Farmers Union",
      sellerType: "cooperative",
      category: "produce",
      stock: 15000,
      description: "High-quality raw cashew nuts, export grade",
      image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400",
      certification: "Export Grade"
    },
    {
      id: 5,
      title: "Local Rice (Jasmine Variety)",
      price: "GH₵ 4.00",
      rating: 4.5,
      reviews: 134,
      distance: "123 km",
      seller: "Tamale Rice Millers Association",
      sellerType: "processor",
      category: "produce",
      stock: 50000,
      description: "Locally produced jasmine rice, milled and packaged",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400",
      certification: "GSA Certified"
    },
    {
      id: 6,
      title: "Organic Shea Nuts",
      price: "GH₵ 5.50",
      rating: 4.8,
      reviews: 67,
      distance: "234 km",
      seller: "Women's Shea Collective",
      sellerType: "cooperative",
      category: "produce",
      stock: 8000,
      description: "Organic certified shea nuts from Northern Ghana",
      image: "https://images.unsplash.com/photo-1609501676725-7186f734b52d?w=400",
      certification: "Organic & Fair Trade"
    }
  ];

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-08-20",
      status: "Delivered",
      total: "GH₵ 42,500.00",
      items: ["Cocoa Beans (5 tonnes)"],
      seller: "Ashanti Cocoa Cooperative",
      buyer: "Nestlé Ghana Ltd",
      buyerType: "manufacturer"
    },
    {
      id: "ORD-2024-002",
      date: "2024-08-18",
      status: "In Transit",
      total: "GH₵ 5,600.00",
      items: ["Cashew Nuts (200kg)"],
      seller: "Northern Cashew Farmers Union",
      buyer: "Golden Harvest Export",
      buyerType: "exporter"
    },
    {
      id: "ORD-2024-003",
      date: "2024-08-15",
      status: "Processing",
      total: "GH₵ 2,000.00",
      items: ["Fresh Tomatoes (1 tonne)"],
      seller: "Valley Fresh Farms Ltd",
      buyer: "Farm Fresh Supermarkets",
      buyerType: "retailer"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'produce', label: 'Fresh Produce' },
    { value: 'processed', label: 'Processed Goods' }
  ];

  const buyerTypes = [
    { value: 'all', label: 'All Buyers' },
    { value: 'manufacturer', label: 'Manufacturers', icon: Factory },
    { value: 'exporter', label: 'Exporters', icon: Globe },
    { value: 'retailer', label: 'Retailers', icon: Store },
    { value: 'processor', label: 'Processors', icon: Building2 },
    { value: 'distributor', label: 'Distributors', icon: Truck },
    { value: 'international', label: 'International', icon: Globe }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const filteredBuyingRequests = selectedBuyerType === 'all'
    ? buyingRequests
    : buyingRequests.filter(request => request.buyerType === selectedBuyerType);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBuyerTypeIcon = (type) => {
    const buyerType = buyerTypes.find(bt => bt.value === type);
    return buyerType?.icon || Building2;
  };

  const getBuyerTypeColor = (type) => {
    switch (type) {
      case 'manufacturer': return 'bg-blue-100 text-blue-800';
      case 'exporter': return 'bg-purple-100 text-purple-800';
      case 'retailer': return 'bg-green-100 text-green-800';
      case 'processor': return 'bg-orange-100 text-orange-800';
      case 'distributor': return 'bg-indigo-100 text-indigo-800';
      case 'international': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('market_listings')
        .insert({
          ...listingForm,
          price: parseFloat(listingForm.price) || 0,
          quantity_available: parseFloat(listingForm.quantity_available) || 0,
          harvest_date: listingForm.harvest_date || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your product listing has been published!",
      });
      
      setListingForm({
        title: '',
        description: '',
        product_type: '',
        price: '',
        unit: 'kg',
        quantity_available: '',
        seller_name: '',
        location: '',
        contact_info: '',
        quality_grade: '',
        harvest_date: ''
      });
      
      fetchMarketListings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter listings based on search, category, location, and price
  const filteredListings = marketListings.filter(listing => {
    const matchesSearch = listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         listing.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.product_type === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || listing.location?.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesPriceMin = !priceRange.min || listing.price >= parseFloat(priceRange.min);
    const matchesPriceMax = !priceRange.max || listing.price <= parseFloat(priceRange.max);
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPriceMin && matchesPriceMax;
  });

  const averagePrice = filteredListings.length > 0 
    ? (filteredListings.reduce((sum, item) => sum + item.price, 0) / filteredListings.length).toFixed(2)
    : '0.00';

  const priceAlerts = [
    { product: 'Cocoa Beans', currentPrice: '8.50', trend: 'up', change: '+5%', recommendation: 'Good time to sell' },
    { product: 'Maize', currentPrice: '3.20', trend: 'down', change: '-2%', recommendation: 'Consider waiting' },
    { product: 'Cashew Nuts', currentPrice: '28.00', trend: 'up', change: '+8%', recommendation: 'Excellent prices now' }
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">🌾 Fair Price Marketplace</h1>
        <p className="text-muted-foreground">
          Connect directly with verified buyers • Get fair prices • Build lasting partnerships
        </p>
        
        {showPriceAlerts && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <BarChart3 className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <strong>Market Insights:</strong> Average price in marketplace: <span className="text-green-600 font-semibold">GH₵ {averagePrice}/kg</span>
                  <span className="text-sm ml-2">• {filteredListings.length} active listings</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowPriceAlerts(false)}>✕</Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <Tabs defaultValue="buying-requests" className="w-full">
        <div className="overflow-x-auto mb-6">
        <TabsList className="inline-flex w-max min-w-full">
          <TabsTrigger value="buying-requests">Buying Requests</TabsTrigger>
          <TabsTrigger value="products">Products for Sale</TabsTrigger>
          <TabsTrigger value="sell">List Product</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
        </TabsList>
        </div>

        <TabsContent value="buying-requests">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
              <Select value={selectedBuyerType} onValueChange={setSelectedBuyerType}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Filter by buyer type" />
                </SelectTrigger>
                <SelectContent>
                  {buyerTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        {type.icon && <type.icon className="h-4 w-4 mr-2" />}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                {filteredBuyingRequests.length} active buying requests
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Users className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Ready Buyers Waiting</h3>
                  <p className="text-sm text-blue-800">
                    These are verified buyers with immediate purchasing needs. 
                    Respond quickly to secure contracts and guaranteed sales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBuyingRequests.map((request) => {
              const IconComponent = getBuyerTypeIcon(request.buyerType);
              return (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-6 w-6 text-gray-600" />
                        <div>
                          <CardTitle className="text-lg">{request.buyer}</CardTitle>
                          <Badge className={getBuyerTypeColor(request.buyerType)}>
                            {buyerTypes.find(t => t.value === request.buyerType)?.label}
                          </Badge>
                        </div>
                      </div>
                      {request.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 text-lg">{request.product}</h4>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <div className="font-medium">{request.quantity}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price Range:</span>
                          <div className="font-medium text-green-600">{request.priceRange}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline:</span>
                          <div className="font-medium">{new Date(request.deadline).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Location:</span>
                          <div className="font-medium">{request.location}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Specifications:</span>
                      <p className="text-sm mt-1">{request.specifications}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        {request.responses} farmers responded
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm">Submit Offer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="mb-6 space-y-4">
            {/* Enhanced Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-2"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="seeds">Seeds</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Location filter"
                value={selectedLocation === 'all' ? '' : selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value || 'all')}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex gap-2 items-center">
                <Label className="text-sm">Price Range (GH₵):</Label>
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-20"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-20"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredListings.length} products • Avg: GH₵ {averagePrice}/kg
              </div>
            </div>
            
            {/* Price Alerts for Popular Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {priceAlerts.map((alert, index) => (
                <Card key={index} className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-l-green-500">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{alert.product}</div>
                        <div className="text-lg font-bold text-green-600">GH₵ {alert.currentPrice}/kg</div>
                      </div>
                      <div className={`text-sm font-medium ${alert.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {alert.change}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{alert.recommendation}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="space-y-2 p-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button>List Your Product</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                <div className="h-48 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-green-600 opacity-50" />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {product.title}
                    </CardTitle>
                    <div className="text-right">
                      <Badge variant="secondary" className="font-bold text-green-700 mb-1">
                        GH₵ {product.price}/{product.unit}
                      </Badge>
                      {product.quality_grade && (
                        <Badge variant="outline" className="text-xs block">
                          {product.quality_grade}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-xs line-clamp-2 mb-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seller:</span>
                      <span className="font-medium">{product.seller_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium text-green-600">
                        {product.quantity_available ? `${product.quantity_available} ${product.unit}` : 'Contact seller'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{product.location}</span>
                    </div>
                    {product.harvest_date && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Harvest:</span>
                        <span className="font-medium">{new Date(product.harvest_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="space-x-2">
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          )}
        </TabsContent>
        
        <TabsContent value="sell">
          {/* Fair Price Guidance */}
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">💡 Get Fair Prices - Pricing Guidance</div>
                <div className="text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <strong>Cocoa Beans:</strong> GH₵ 7.50 - 9.50/kg
                    <div className="text-xs text-muted-foreground">Grade 1 fermented</div>
                  </div>
                  <div>
                    <strong>Maize:</strong> GH₵ 2.80 - 4.20/kg
                    <div className="text-xs text-muted-foreground">Dry, clean grain</div>
                  </div>
                  <div>
                    <strong>Cashews:</strong> GH₵ 25.00 - 30.00/kg
                    <div className="text-xs text-muted-foreground">Raw, export grade</div>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                List Your Product - Get Fair Prices
              </CardTitle>
              <CardDescription>
                Connect with verified buyers who are ready to purchase your produce at fair market prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitListing} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Premium Grade 1 Cocoa Beans"
                      value={listingForm.title}
                      onChange={(e) => setListingForm(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product_type">Product Type *</Label>
                    <Select 
                      value={listingForm.product_type} 
                      onValueChange={(value) => setListingForm(prev => ({...prev, product_type: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grains">Grains (Maize, Rice, Millet)</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="cash_crops">Cash Crops (Cocoa, Cashew)</SelectItem>
                        <SelectItem value="seeds">Seeds & Seedlings</SelectItem>
                        <SelectItem value="spices">Spices & Herbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your product quality, variety, growing conditions, certifications..."
                    rows={3}
                    value={listingForm.description}
                    onChange={(e) => setListingForm(prev => ({...prev, description: e.target.value}))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per unit (GH₵) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="e.g., 8.50"
                      step="0.01"
                      value={listingForm.price}
                      onChange={(e) => setListingForm(prev => ({...prev, price: e.target.value}))}
                      required
                    />
                    <div className="text-xs text-muted-foreground">
                      Check market rates above for guidance
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select 
                      value={listingForm.unit} 
                      onValueChange={(value) => setListingForm(prev => ({...prev, unit: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="bag">Bags</SelectItem>
                        <SelectItem value="ton">Tonnes</SelectItem>
                        <SelectItem value="piece">Pieces</SelectItem>
                        <SelectItem value="bunch">Bunches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Available Quantity *</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      placeholder="e.g., 5000"
                      value={listingForm.quantity_available}
                      onChange={(e) => setListingForm(prev => ({...prev, quantity_available: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="seller_name">Your Name/Farm Name *</Label>
                    <Input 
                      id="seller_name" 
                      placeholder="e.g., Kwame Asante Farms"
                      value={listingForm.seller_name}
                      onChange={(e) => setListingForm(prev => ({...prev, seller_name: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location *</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Kumasi, Ashanti Region"
                      value={listingForm.location}
                      onChange={(e) => setListingForm(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact_info">Contact Information *</Label>
                    <Input 
                      id="contact_info" 
                      placeholder="Phone number or WhatsApp"
                      value={listingForm.contact_info}
                      onChange={(e) => setListingForm(prev => ({...prev, contact_info: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvest_date">Harvest/Availability Date</Label>
                    <Input 
                      id="harvest_date" 
                      type="date"
                      value={listingForm.harvest_date}
                      onChange={(e) => setListingForm(prev => ({...prev, harvest_date: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality_grade">Quality Grade (Optional)</Label>
                  <Select 
                    value={listingForm.quality_grade} 
                    onValueChange={(value) => setListingForm(prev => ({...prev, quality_grade: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium Grade</SelectItem>
                      <SelectItem value="grade-a">Grade A</SelectItem>
                      <SelectItem value="grade-b">Grade B</SelectItem>
                      <SelectItem value="export">Export Quality</SelectItem>
                      <SelectItem value="organic">Organic Certified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Zap className="h-5 w-5 text-green-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-green-900 mb-1">Fair Trade Tips</h3>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Research current market prices before setting your price</li>
                        <li>• Highlight quality certifications and growing practices</li>
                        <li>• Provide accurate quantity and availability information</li>
                        <li>• Respond quickly to buyer inquiries to build trust</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">Save as Draft</Button>
                  <Button type="submit">🚀 Publish & Find Buyers</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                My Orders & Sales
              </CardTitle>
              <CardDescription>
                Track orders from buyers and your sales to different customer types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => {
                  const IconComponent = getBuyerTypeIcon(order.buyerType);
                  return (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{order.id}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center mb-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Ordered on {new Date(order.date).toLocaleDateString('en-GB')}
                            </div>
                            <div className="flex items-center">
                              <IconComponent className="h-3 w-3 mr-1" />
                              Buyer: {order.buyer}
                            </div>
                            <div>Seller: {order.seller}</div>
                            <div>Items: {order.items.join(', ')}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold text-green-600 text-lg">{order.total}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  My Product Listings
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Listing
                </Button>
              </CardTitle>
              <CardDescription>
                Manage your listings and track interest from different buyer types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>You haven't created any listings yet.</p>
                <p className="text-sm">Start selling by creating your first product listing!</p>
                <Button className="mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Marketplace;