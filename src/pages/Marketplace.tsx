import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Star, Map, Clock, ChevronRight, Package, TrendingUp, Eye, Edit, Trash2, Plus, Users, Building2, Globe, Store, Truck, Factory } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBuyerType, setSelectedBuyerType] = useState('all');
  
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

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Agricultural Marketplace</h1>
        <p className="text-muted-foreground">
          Connect farmers with manufacturers, exporters, retailers, and international buyers. 
          Trade directly with verified buyers ready to purchase in bulk.
        </p>
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
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products from farmers
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {product.title}
                    </CardTitle>
                    <Badge variant="secondary" className="font-bold text-green-700">
                      {product.price}/kg
                    </Badge>
                  </div>
                  <CardDescription className="text-xs line-clamp-2 mb-2">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      {product.rating} ({product.reviews})
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {product.certification}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seller:</span>
                      <span className="font-medium">{product.seller}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{product.stock.toLocaleString()} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">{product.distance}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="space-x-2">
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Seller
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                List Your Agricultural Product
              </CardTitle>
              <CardDescription>
                Sell directly to manufacturers, exporters, retailers, and international buyers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Premium Maize Seeds (Obatanpa Variety)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="produce">Fresh Produce</SelectItem>
                        <SelectItem value="processed">Processed Goods</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per kg (GH₵) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Total Quantity (kg) *</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      placeholder="e.g., 5000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-order">Minimum Order (kg)</Label>
                    <Input 
                      id="min-order" 
                      type="number" 
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Buyers *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {buyerTypes.slice(1).map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <input type="checkbox" id={type.value} className="rounded" />
                        <Label htmlFor={type.value} className="text-sm flex items-center">
                          <type.icon className="h-4 w-4 mr-1" />
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe quality, variety, growing conditions, certifications, etc."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location *</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Tarkwa, Western Region"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvest-date">Harvest/Availability Date *</Label>
                    <Input 
                      id="harvest-date" 
                      type="date"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select applicable certifications" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organic">Organic Certified</SelectItem>
                      <SelectItem value="fair-trade">Fair Trade</SelectItem>
                      <SelectItem value="gsa">GSA Certified</SelectItem>
                      <SelectItem value="cocobod">COCOBOD Certified</SelectItem>
                      <SelectItem value="pprsd">PPRSD Certified</SelectItem>
                      <SelectItem value="export">Export Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Save as Draft</Button>
                  <Button type="submit">Publish Listing</Button>
                </div>
              </div>
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