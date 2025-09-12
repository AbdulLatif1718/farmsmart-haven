import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Truck, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock transport data
const mockTransports = [
  {
    id: '1',
    title: 'Produce Transportation Service',
    description: 'Reliable transport service for fresh produce with refrigerated trucks. Covers Accra to Kumasi route with scheduled deliveries.',
    service_type: 'cold-storage',
    provider_name: 'Ghana Fresh Transport Ltd',
    location: 'Accra to Kumasi Corridor',
    contact_info: '+233244123456',
    price_range: 'GHS 150-400 per trip',
    availability_status: 'available',
    created_at: '2024-11-25T09:00:00Z'
  },
  {
    id: '2',
    title: 'Bulk Grain Transport',
    description: 'Specialized in transporting bulk grains and cereals. Large capacity trucks available for major harvest seasons.',
    service_type: 'bulk-transport',
    provider_name: 'Northern Logistics Co-op',
    location: 'Northern Region Coverage',
    contact_info: '+233201987654',
    price_range: 'GHS 200-600 per load',
    availability_status: 'busy',
    created_at: '2024-11-20T15:30:00Z'
  }
];

const AdminTransport = () => {
  const { toast } = useToast();
  const [transports, setTransports] = useState<any[]>(mockTransports);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service_type: '',
    provider_name: '',
    location: '',
    contact_info: '',
    price_range: '',
    availability_status: 'available'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTransport = {
        id: String(Date.now()),
        ...formData,
        created_at: new Date().toISOString()
      };

      setTransports(prev => [newTransport, ...prev]);

      toast({
        title: "Success",
        description: "Transport service created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        service_type: '',
        provider_name: '',
        location: '',
        contact_info: '',
        price_range: '',
        availability_status: 'available'
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create transport service",
        variant: "destructive",
      });
    }
  };

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
                    <Select value={formData.service_type} onValueChange={(value) => setFormData(prev => ({...prev, service_type: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck-transport">Truck Transport</SelectItem>
                        <SelectItem value="pickup-delivery">Pickup & Delivery</SelectItem>
                        <SelectItem value="cold-storage">Cold Storage Transport</SelectItem>
                        <SelectItem value="bulk-transport">Bulk Transport</SelectItem>
                        <SelectItem value="logistics">Logistics Services</SelectItem>
                        <SelectItem value="warehouse">Warehousing</SelectItem>
                        <SelectItem value="last-mile">Last Mile Delivery</SelectItem>
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
                    <Label htmlFor="provider_name">Provider Name *</Label>
                    <Input
                      id="provider_name"
                      value={formData.provider_name}
                      onChange={(e) => setFormData(prev => ({...prev, provider_name: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Service Location *</Label>
                    <Input
                      id="location"
                      placeholder="Coverage area or base location"
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
                      placeholder="Phone number or email"
                      value={formData.contact_info}
                      onChange={(e) => setFormData(prev => ({...prev, contact_info: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_range">Price Range</Label>
                    <Input
                      id="price_range"
                      placeholder="e.g., GHS 50-200 per trip"
                      value={formData.price_range}
                      onChange={(e) => setFormData(prev => ({...prev, price_range: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability_status">Availability Status</Label>
                  <Select value={formData.availability_status} onValueChange={(value) => setFormData(prev => ({...prev, availability_status: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Currently Busy</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Add Service</Button>
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
                        <Badge variant={transport.availability_status === 'available' ? 'default' : 'secondary'}>
                          {transport.availability_status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{transport.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Provider: {transport.provider_name}</span>
                        <span>{transport.location}</span>
                        {transport.price_range && <span>{transport.price_range}</span>}
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

export default AdminTransport;