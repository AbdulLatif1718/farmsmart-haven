
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Truck, StarIcon, Package } from 'lucide-react';

export const BuyerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-leaf-600" />
              Marketplace
            </CardTitle>
            <CardDescription>
              Browse and purchase directly from verified farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Fresh Organic Maize</h3>
                    <p className="text-sm text-muted-foreground">Farmer: John Doe • Tamale</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <p className="text-muted-foreground">Product Image</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Price per bag</p>
                    <p className="text-lg font-bold">₵120.00</p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-muted" />
                    <span className="text-xs ml-1">(24)</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                  <Button size="sm" className="flex-1">Add to Cart</Button>
                </div>
              </div>
              
              {/* Product 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Fresh Eggs (Crate)</h3>
                    <p className="text-sm text-muted-foreground">Farmer: Sarah K. • Kumasi</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <p className="text-muted-foreground">Product Image</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Price per crate</p>
                    <p className="text-lg font-bold">₵55.00</p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs ml-1">(42)</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                  <Button size="sm" className="flex-1">Add to Cart</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Browse All Products</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Truck className="mr-2 h-5 w-5 text-leaf-600" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Order #GH785432</h3>
                    <p className="text-sm text-muted-foreground">3 items • Placed on April 3, 2023</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">In Transit</span>
                </div>
                <div className="relative pt-4">
                  <div className="absolute top-0 left-0 right-0 flex justify-between">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-leaf-600 text-white z-10 text-xs">1</div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-leaf-600 text-white z-10 text-xs">2</div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground z-10 text-xs">3</div>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground z-10 text-xs">4</div>
                  </div>
                  <div className="absolute top-3 left-0 right-0 h-0.5 bg-muted">
                    <div className="h-full bg-leaf-600 w-[40%]"></div>
                  </div>
                  <div className="pt-8 flex justify-between text-xs text-muted-foreground">
                    <span>Processed</span>
                    <span>Dispatched</span>
                    <span>In Transit</span>
                    <span>Delivered</span>
                  </div>
                </div>
                <div className="mt-6 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                  <Button size="sm" className="flex-1">Track Location</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <Package className="mr-2 h-5 w-5 text-leaf-600" />
              Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 border-b">
                <div>
                  <p className="font-medium">Fresh Eggs (2 crates)</p>
                  <p className="text-xs text-muted-foreground">Sarah K. • Kumasi</p>
                </div>
                <p className="font-medium">₵110.00</p>
              </div>
              <div className="flex items-center justify-between p-2 border-b">
                <div>
                  <p className="font-medium">Cassava (10kg)</p>
                  <p className="text-xs text-muted-foreground">Kwame B. • Eastern Region</p>
                </div>
                <p className="font-medium">₵75.00</p>
              </div>
              <div className="flex items-center justify-between p-2">
                <div>
                  <p className="font-bold">Total</p>
                  <p className="text-xs text-muted-foreground">Including delivery fee</p>
                </div>
                <p className="font-bold text-lg">₵215.00</p>
              </div>
              <Button className="w-full mt-3">Proceed to Checkout</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Saved Farmers</CardTitle>
            <CardDescription>
              Your favorite trusted farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">SK</div>
                <div>
                  <p className="font-medium">Sarah K.</p>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">JD</div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-muted" />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">KB</div>
                <div>
                  <p className="font-medium">Kwame B.</p>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <StarIcon className="h-3 w-3 text-muted" />
                    <StarIcon className="h-3 w-3 text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;
