import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Store, Edit, Trash, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MarketListing {
  id: string;
  user_id: string | null;
  title: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  seller_name: string;
  seller_contact: string;
  images: string[] | null;
  quality_grade: string | null;
  harvest_date: string | null;
  expiry_date: string | null;
  organic: boolean;
  certified: boolean;
  status: 'active' | 'sold' | 'expired' | 'removed';
  created_at: string;
  updated_at: string;
}

const AdminMarketplace = () => {
  const { toast } = useToast();
  const [listings, setListings] = useState<MarketListing[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    unit: '',
    quantity: '',
    seller_name: '',
    seller_contact: '',
    location: '',
    quality_grade: '',
    harvest_date: '',
    expiry_date: '',
    organic: false,
    certified: false
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('market_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch marketplace listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newListing = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        unit: formData.unit,
        quantity: parseInt(formData.quantity) || 1,
        seller_name: formData.seller_name,
        seller_contact: formData.seller_contact,
        location: formData.location,
        quality_grade: formData.quality_grade || null,
        harvest_date: formData.harvest_date || null,
        expiry_date: formData.expiry_date || null,
        organic: formData.organic,
        certified: formData.certified,
        status: 'active' as const
      };

      const { data, error } = await supabase
        .from('market_listings')
        .insert([newListing])
        .select()
        .single();

      if (error) throw error;

      setListings(prev => [data, ...prev]);

      toast({
        title: "Success",
        description: "Market listing created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        unit: '',
        quantity: '',
        seller_name: '',
        seller_contact: '',
        location: '',
        quality_grade: '',
        harvest_date: '',
        expiry_date: '',
        organic: false,
        certified: false
      });
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: "Failed to create listing",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('market_listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setListings(prev => prev.filter(listing => listing.id !== id));
      
      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

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
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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
                    <Label htmlFor="price">Price (GHS) *</Label>
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
                    <Label htmlFor="quantity">Quantity Available</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
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
                    <Label htmlFor="seller_contact">Seller Contact *</Label>
                    <Input
                      id="seller_contact"
                      value={formData.seller_contact}
                      onChange={(e) => setFormData(prev => ({...prev, seller_contact: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      required
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harvest_date">Harvest Date</Label>
                    <Input
                      id="harvest_date"
                      type="date"
                      value={formData.harvest_date}
                      onChange={(e) => setFormData(prev => ({...prev, harvest_date: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input
                      id="expiry_date"
                      type="date"
                      value={formData.expiry_date}
                      onChange={(e) => setFormData(prev => ({...prev, expiry_date: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    {submitting ? 'Creating...' : 'Create Listing'}
                  </Button>
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
                        <Badge variant="outline">{listing.category}</Badge>
                        <Badge variant="outline">{listing.status}</Badge>
                        {listing.quality_grade && (
                          <Badge variant="secondary">{listing.quality_grade}</Badge>
                        )}
                        {listing.organic && <Badge variant="outline">Organic</Badge>}
                        {listing.certified && <Badge variant="outline">Certified</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{listing.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>GHS {listing.price}/{listing.unit}</span>
                        <span>By {listing.seller_name}</span>
                        <span>{listing.location}</span>
                        <span>{listing.quantity} {listing.unit}s available</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteListing(listing.id)}
                      >
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