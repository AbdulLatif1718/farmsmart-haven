import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Truck, Edit, Trash, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TransportService {
  id: string;
  title: string;
  description: string;
  service_type: 'pickup' | 'delivery' | 'storage' | 'processing';
  provider: string;
  contact: string;
  location: string;
  coverage_area: string | null;
  price_range: string | null;
  capacity: string | null;
  vehicle_type: string | null;
  available: boolean;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

const AdminTransport = () => {
  const { toast } = useToast();
  const [transports, setTransports] = useState<TransportService[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service_type: 'pickup' as 'pickup' | 'delivery' | 'storage' | 'processing',
    provider: '',
    contact: '',
    location: '',
    coverage_area: '',
    price_range: '',
    capacity: '',
    vehicle_type: '',
    available: true
  });

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const { data, error } = await supabase
        .from('transport_logistics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransports(data || []);
    } catch (error) {
      console.error('Error fetching transport services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transport services",
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
      const newTransport = {
        title: formData.title,
        description: formData.description,
        service_type: formData.service_type,
        provider: formData.provider,
        contact: formData.contact,
        location: formData.location,
        coverage_area: formData.coverage_area || null,
        price_range: formData.price_range || null,
        capacity: formData.capacity || null,
        vehicle_type: formData.vehicle_type || null,
        available: formData.available,
        rating: 0
      };

      const { data, error } = await supabase
        .from('transport_logistics')
        .insert([newTransport])
        .select()
        .single();

      if (error) throw error;

      setTransports(prev => [data, ...prev]);

      toast({
        title: "Success",
        description: "Transport service created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        service_type: 'pickup',
        provider: '',
        contact: '',
        location: '',
        coverage_area: '',
        price_range: '',
        capacity: '',
        vehicle_type: '',
        available: true
      });
    } catch (error: any) {
      console.error('Error creating transport service:', error);
      toast({
        title: "Error",
        description: "Failed to create transport service",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTransport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transport_logistics')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTransports(prev => prev.filter(transport => transport.id !== id));
      
      toast({
        title: "Success",
        description: "Transport service deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting transport service:', error);
      toast({
        title: "Error",
        description: "Failed to delete transport service",
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
            <h1 className="text-3xl font-bold">Transport & Logistics Management</h1>
            <p className="text-muted-foreground">Manage transport and logistics services</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Transport Service</CardTitle>
              <CardDescription>Add a transport or logistics service provider</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Service Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service_type">Service Type *</Label>
                    <Select value={formData.service_type} onValueChange={(value: 'pickup' | 'delivery' | 'storage' | 'processing') => setFormData(prev => ({...prev, service_type: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup">Pickup</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="storage">Storage</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the transport service, capacity, and coverage areas"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider Name *</Label>
                    <Input
                      id="provider"
                      value={formData.provider}
                      onChange={(e) => setFormData(prev => ({...prev, provider: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Information *</Label>
                    <Input
                      id="contact"
                      placeholder="Phone number or email"
                      value={formData.contact}
                      onChange={(e) => setFormData(prev => ({...prev, contact: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Base Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverage_area">Coverage Area</Label>
                    <Input
                      id="coverage_area"
                      placeholder="Service coverage area"
                      value={formData.coverage_area}
                      onChange={(e) => setFormData(prev => ({...prev, coverage_area: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_range">Price Range</Label>
                    <Input
                      id="price_range"
                      placeholder="e.g., GHS 50-200 per trip"
                      value={formData.price_range}
                      onChange={(e) => setFormData(prev => ({...prev, price_range: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      placeholder="e.g., 5 tons, 20 bags"
                      value={formData.capacity}
                      onChange={(e) => setFormData(prev => ({...prev, capacity: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle_type">Vehicle Type</Label>
                    <Input
                      id="vehicle_type"
                      placeholder="e.g., Truck, Van, Refrigerated"
                      value={formData.vehicle_type}
                      onChange={(e) => setFormData(prev => ({...prev, vehicle_type: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    {submitting ? 'Adding...' : 'Add Service'}
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
            <CardTitle>Transport Services</CardTitle>
            <CardDescription>Manage existing transport and logistics providers</CardDescription>
          </CardHeader>
          <CardContent>
            {transports.length === 0 ? (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No transport services yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Service
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {transports.map((transport) => (
                  <div key={transport.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{transport.title}</h3>
                        <Badge variant="outline">{transport.service_type}</Badge>
                        <Badge variant={transport.available ? 'default' : 'secondary'}>
                          {transport.available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{transport.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Provider: {transport.provider}</span>
                        <span>{transport.location}</span>
                        <span>Contact: {transport.contact}</span>
                        {transport.capacity && <span>Capacity: {transport.capacity}</span>}
                        {transport.price_range && <span>{transport.price_range}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteTransport(transport.id)}
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

export default AdminTransport;