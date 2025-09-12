import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Wrench, Edit, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock machinery data
const mockMachinery = [
  {
    id: '1',
    title: 'John Deere 5055E Tractor',
    description: '55HP utility tractor with 4WD, perfect for small to medium farm operations. Includes loader attachment and implements.',
    machine_type: 'tractor',
    provider_name: 'Farm Equipment Ghana Ltd',
    location: 'Kumasi, Ashanti Region',
    contact_info: '+233244567890',
    hourly_rate: 45.00,
    daily_rate: 300.00,
    availability_status: 'available',
    created_at: '2024-11-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Rice Combine Harvester',
    description: 'Modern combine harvester specifically designed for rice harvesting. High efficiency with minimal grain loss.',
    machine_type: 'harvester',
    provider_name: 'Northern Mechanization Co-op',
    location: 'Tamale, Northern Region',
    contact_info: '+233201234567',
    hourly_rate: null,
    daily_rate: 800.00,
    availability_status: 'rented',
    created_at: '2024-11-15T14:30:00Z'
  }
];

const AdminMachinery = () => {
  const { toast } = useToast();
  const [machinery, setMachinery] = useState<any[]>(mockMachinery);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    machine_type: '',
    provider_name: '',
    location: '',
    contact_info: '',
    hourly_rate: '',
    daily_rate: '',
    availability_status: 'available'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newMachine = {
        id: String(Date.now()),
        ...formData,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        daily_rate: formData.daily_rate ? parseFloat(formData.daily_rate) : null,
        created_at: new Date().toISOString()
      };

      setMachinery(prev => [newMachine, ...prev]);

      toast({
        title: "Success",
        description: "Machinery rental created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        machine_type: '',
        provider_name: '',
        location: '',
        contact_info: '',
        hourly_rate: '',
        daily_rate: '',
        availability_status: 'available'
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create machinery listing",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Machinery Rental Management</h1>
            <p className="text-muted-foreground">Manage machinery and equipment rentals</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Machinery
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Machinery</CardTitle>
              <CardDescription>Add machinery or equipment for rental</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Machinery Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="machine_type">Machine Type *</Label>
                    <Select value={formData.machine_type} onValueChange={(value) => setFormData(prev => ({...prev, machine_type: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select machine type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tractor">Tractor</SelectItem>
                        <SelectItem value="harvester">Harvester</SelectItem>
                        <SelectItem value="planter">Planter</SelectItem>
                        <SelectItem value="cultivator">Cultivator</SelectItem>
                        <SelectItem value="sprayer">Sprayer</SelectItem>
                        <SelectItem value="thresher">Thresher</SelectItem>
                        <SelectItem value="pump">Water Pump</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the machinery specifications and features"
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
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_info">Contact Information</Label>
                  <Input
                    id="contact_info"
                    placeholder="Phone number or email"
                    value={formData.contact_info}
                    onChange={(e) => setFormData(prev => ({...prev, contact_info: e.target.value}))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate (GHS)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      step="0.01"
                      value={formData.hourly_rate}
                      onChange={(e) => setFormData(prev => ({...prev, hourly_rate: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="daily_rate">Daily Rate (GHS)</Label>
                    <Input
                      id="daily_rate"
                      type="number"
                      step="0.01"
                      value={formData.daily_rate}
                      onChange={(e) => setFormData(prev => ({...prev, daily_rate: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability_status">Availability Status</Label>
                    <Select value={formData.availability_status} onValueChange={(value) => setFormData(prev => ({...prev, availability_status: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="rented">Currently Rented</SelectItem>
                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Add Machinery</Button>
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
            <CardTitle>Machinery Rentals</CardTitle>
            <CardDescription>Manage existing machinery and equipment listings</CardDescription>
          </CardHeader>
          <CardContent>
            {machinery.length === 0 ? (
              <div className="text-center py-8">
                <Wrench className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No machinery listed yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Machinery
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {machinery.map((machine) => (
                  <div key={machine.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{machine.title}</h3>
                        <Badge variant="outline">{machine.machine_type}</Badge>
                        <Badge variant={machine.availability_status === 'available' ? 'default' : 'secondary'}>
                          {machine.availability_status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{machine.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Provider: {machine.provider_name}</span>
                        <span>{machine.location}</span>
                        {machine.hourly_rate && <span>GHS {machine.hourly_rate}/hour</span>}
                        {machine.daily_rate && <span>GHS {machine.daily_rate}/day</span>}
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

export default AdminMachinery;