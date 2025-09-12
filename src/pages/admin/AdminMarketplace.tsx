import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Store, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock marketplace data
const mockListings = [
  {
    id: '1',
    title: 'Fresh Organic Tomatoes',
    description: 'High-quality organic tomatoes harvested this week. Perfect for both local consumption and export.',
    product_type: 'vegetables',
    price: 8.50,
    unit: 'kg',
    quantity_available: 500,
    seller_name: 'Kwame Farms Ltd',
    location: 'Ashanti Region, Ghana',
    contact_info: '+233241234567',
    quality_grade: 'premium',
    harvest_date: '2024-12-01',
    status: 'active',
    created_at: '2024-12-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Premium White Rice',
    description: 'Locally grown premium white rice, processed and ready for distribution.',
    product_type: 'grains',
    price: 12.00,
    unit: 'bag',
    quantity_available: 200,
    seller_name: 'Northern Rice Co-op',
    location: 'Northern Region, Ghana',
    contact_info: '+233207654321',
    quality_grade: 'grade-a',
    harvest_date: '2024-11-15',
    status: 'active',
    created_at: '2024-11-28T08:30:00Z'
  }
];

const AdminMarketplace = () => {
  const { toast } = useToast();
  const [listings, setListings] = useState<any[]>(mockListings);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    product_type: '',
    price: '',
    unit: '',
    quantity_available: '',
    seller_name: '',
    location: '',
    contact_info: '',
    quality_grade: '',
    harvest_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newListing = {
        id: String(Date.now()),
        ...formData,
        price: parseFloat(formData.price) || 0,
        quantity_available: parseFloat(formData.quantity_available) || 0,
        harvest_date: formData.harvest_date || null,
        status: 'active',
        created_at: new Date().toISOString()
      };

      setListings(prev => [newListing, ...prev]);

      toast({
        title: "Success",
        description: "Market listing created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        product_type: '',
        price: '',
        unit: '',
        quantity_available: '',
        seller_name: '',
        location: '',
        contact_info: '',
        quality_grade: '',
        harvest_date: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create listing",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketplace Management</h1>
            <p className="text-muted-foreground">Manage marketplace listings and products</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Listing
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Listing</CardTitle>
              <CardDescription>Add a new product to the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product_type">Product Type *</Label>
                    <Select value={formData.product_type} onValueChange={(value) => setFormData(prev => ({...prev, product_type: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="tools">Tools</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the product"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({...prev, unit: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kg</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                        <SelectItem value="ton">Ton</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="bunch">Bunch</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity_available">Quantity Available</Label>
                    <Input
                      id="quantity_available"
                      type="number"
                      value={formData.quantity_available}
                      onChange={(e) => setFormData(prev => ({...prev, quantity_available: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seller_name">Seller Name *</Label>
                    <Input
                      id="seller_name"
                      value={formData.seller_name}
                      onChange={(e) => setFormData(prev => ({...prev, seller_name: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_info">Contact Information</Label>
                    <Input
                      id="contact_info"
                      placeholder="Phone or email"
                      value={formData.contact_info}
                      onChange={(e) => setFormData(prev => ({...prev, contact_info: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quality_grade">Quality Grade</Label>
                    <Select value={formData.quality_grade} onValueChange={(value) => setFormData(prev => ({...prev, quality_grade: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="grade-a">Grade A</SelectItem>
                        <SelectItem value="grade-b">Grade B</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harvest_date">Harvest Date</Label>
                  <Input
                    id="harvest_date"
                    type="date"
                    value={formData.harvest_date}
                    onChange={(e) => setFormData(prev => ({...prev, harvest_date: e.target.value}))}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Create Listing</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Market Listings</CardTitle>
            <CardDescription>Manage existing marketplace listings</CardDescription>
          </CardHeader>
          <CardContent>
            {listings.length === 0 ? (
              <div className="text-center py-8">
                <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No listings yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Listing
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{listing.title}</h3>
                        <Badge variant="outline">{listing.product_type}</Badge>
                        <Badge variant="outline">{listing.status}</Badge>
                        {listing.quality_grade && (
                          <Badge variant="secondary">{listing.quality_grade}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{listing.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>GHS {listing.price}/{listing.unit}</span>
                        <span>By {listing.seller_name}</span>
                        <span>{listing.location}</span>
                        {listing.quantity_available && <span>{listing.quantity_available} {listing.unit}s available</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMarketplace;