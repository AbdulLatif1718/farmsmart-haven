
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Map, Clock, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Marketplace = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Marketplace</h1>
        <p className="text-muted-foreground">
          Connect with buyers and sellers, find the best prices, and trade your agricultural products.
        </p>
      </div>
      
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="buy">Buy Products</TabsTrigger>
          <TabsTrigger value="sell">Sell Products</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Premium Maize Seeds",
                price: "GH₵ 120.00",
                rating: 4.8,
                reviews: 24,
                distance: "12 km",
                seller: "AgriTech Solutions",
                image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              },
              {
                title: "Organic Fertilizer (50kg)",
                price: "GH₵ 85.00",
                rating: 4.5,
                reviews: 18,
                distance: "8 km",
                seller: "Green Earth Supplies",
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              },
              {
                title: "Irrigation Drip Tape (100m)",
                price: "GH₵ 150.00",
                rating: 4.7,
                reviews: 32,
                distance: "15 km",
                seller: "Water Solutions Ghana",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium">
                      {product.title}
                    </CardTitle>
                    <Badge variant="outline" className="font-medium">
                      {product.price}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      {product.rating} ({product.reviews})
                    </span>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Map className="h-3 w-3 mr-1" />
                      {product.distance}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Seller: {product.seller}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>List Your Products</CardTitle>
              <CardDescription>
                Create listings for the agricultural products you want to sell
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                Product listing form will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>
                Track and manage your purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((order) => (
                  <div key={order} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Order #{(Math.random() * 10000).toFixed(0)}</h4>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Placed on May {10 + order}, 2023
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>
                Manage your product listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                Your listed products will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Marketplace;
