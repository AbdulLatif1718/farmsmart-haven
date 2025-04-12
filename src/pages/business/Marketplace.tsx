
import React from 'react';
import { BusinessLayout } from '@/components/layout/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BusinessMarketplace = () => {
  return (
    <BusinessLayout activeRole="buyer">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Marketplace</h1>
        <p className="text-muted-foreground">
          Browse and purchase agricultural products directly from verified farmers
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for products, farmers or regions..." 
              className="pl-10 pr-4"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex gap-2">
          <Button variant="outline" className="flex-1">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button variant="outline" className="flex-1">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Product 1 */}
        <Card>
          <CardHeader className="pb-2">
            <div className="h-48 bg-muted rounded-md flex items-center justify-center mb-2">
              <p className="text-muted-foreground">Product Image</p>
            </div>
            <CardTitle className="text-lg">Organic Maize</CardTitle>
            <CardDescription>Farmer: John Doe • Northern Region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-bold">₵120.00</p>
                <p className="text-xs text-muted-foreground">per 50kg bag</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-lg font-bold">500kg</p>
                <p className="text-xs text-muted-foreground">10 bags</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Button variant="outline" className="flex-1 w-full sm:w-auto">View Details</Button>
            <Button className="flex-1 w-full sm:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Add to Cart</span>
            </Button>
          </CardFooter>
        </Card>

        {/* Product 2 */}
        <Card>
          <CardHeader className="pb-2">
            <div className="h-48 bg-muted rounded-md flex items-center justify-center mb-2">
              <p className="text-muted-foreground">Product Image</p>
            </div>
            <CardTitle className="text-lg">Fresh Eggs</CardTitle>
            <CardDescription>Farmer: Sarah K. • Greater Accra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-bold">₵55.00</p>
                <p className="text-xs text-muted-foreground">per crate (30 eggs)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-lg font-bold">25</p>
                <p className="text-xs text-muted-foreground">crates</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Button variant="outline" className="flex-1 w-full sm:w-auto">View Details</Button>
            <Button className="flex-1 w-full sm:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Add to Cart</span>
            </Button>
          </CardFooter>
        </Card>

        {/* Product 3 */}
        <Card>
          <CardHeader className="pb-2">
            <div className="h-48 bg-muted rounded-md flex items-center justify-center mb-2">
              <p className="text-muted-foreground">Product Image</p>
            </div>
            <CardTitle className="text-lg">Cassava</CardTitle>
            <CardDescription>Farmer: Kwame B. • Eastern Region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="text-lg font-bold">₵75.00</p>
                <p className="text-xs text-muted-foreground">per 10kg</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-lg font-bold">200kg</p>
                <p className="text-xs text-muted-foreground">20 units</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Button variant="outline" className="flex-1 w-full sm:w-auto">View Details</Button>
            <Button className="flex-1 w-full sm:w-auto">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Add to Cart</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Products</Button>
      </div>
    </BusinessLayout>
  );
};

export default BusinessMarketplace;
