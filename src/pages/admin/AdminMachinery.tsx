import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Wrench, Edit, Trash, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MachineryRental {
  id: string;
  title: string;
  description: string;
  type: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  condition: string;
  provider: string;
  location: string;
  daily_rate: number | null;
  weekly_rate: number | null;
  monthly_rate: number | null;
  available: boolean;
  images: string[] | null;
  specifications: any;
  created_at: string;
  updated_at: string;
}

const AdminMachinery = () => {
  const { toast } = useToast();
  const [machinery, setMachinery] = useState<MachineryRental[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    brand: '',
    model: '',
    year: '',
    condition: 'good',
    provider: '',
    location: '',
    daily_rate: '',
    weekly_rate: '',
    monthly_rate: '',
    available: true
  });

  useEffect(() => {
    fetchMachinery();
  }, []);

  const fetchMachinery = async () => {
    try {
      const { data, error } = await supabase
        .from('machinery_rentals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMachinery(data || []);
    } catch (error) {
      console.error('Error fetching machinery:', error);
      toast({
        title: "Error",
        description: "Failed to fetch machinery rentals",
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
      const newMachine = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        brand: formData.brand || null,
        model: formData.model || null,
        year: formData.year ? parseInt(formData.year) : null,
        condition: formData.condition,
        provider: formData.provider,
        location: formData.location,
        daily_rate: formData.daily_rate ? parseFloat(formData.daily_rate) : null,
        weekly_rate: formData.weekly_rate ? parseFloat(formData.weekly_rate) : null,
        monthly_rate: formData.monthly_rate ? parseFloat(formData.monthly_rate) : null,
        available: formData.available
      };

      const { data, error } = await supabase
        .from('machinery_rentals')
        .insert([newMachine])
        .select()
        .single();

      if (error) throw error;

      setMachinery(prev => [data, ...prev]);

      toast({
        title: "Success",
        description: "Machinery rental created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        type: '',
        brand: '',
        model: '',
        year: '',
        condition: 'good',
        provider: '',
        location: '',
        daily_rate: '',
        weekly_rate: '',
        monthly_rate: '',
        available: true
      });
    } catch (error: any) {
      console.error('Error creating machinery:', error);
      toast({
        title: "Error",
        description: "Failed to create machinery listing",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMachinery = async (id: string) => {
    try {
      const { error } = await supabase
        .from('machinery_rentals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMachinery(prev => prev.filter(machine => machine.id !== id));
      
      toast({
        title: "Success",
        description: "Machinery deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting machinery:', error);
      toast({
        title: "Error",
        description: "Failed to delete machinery",
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
                    <Label htmlFor="type">Machine Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({...prev, brand: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({...prev, model: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({...prev, year: e.target.value}))}
                    />
                  </div>
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
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <Label htmlFor="weekly_rate">Weekly Rate (GHS)</Label>
                    <Input
                      id="weekly_rate"
                      type="number"
                      step="0.01"
                      value={formData.weekly_rate}
                      onChange={(e) => setFormData(prev => ({...prev, weekly_rate: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthly_rate">Monthly Rate (GHS)</Label>
                    <Input
                      id="monthly_rate"
                      type="number"
                      step="0.01"
                      value={formData.monthly_rate}
                      onChange={(e) => setFormData(prev => ({...prev, monthly_rate: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData(prev => ({...prev, condition: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="needs_repair">Needs Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    {submitting ? 'Adding...' : 'Add Machinery'}
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
                        <Badge variant="outline">{machine.type}</Badge>
                        <Badge variant={machine.available ? 'default' : 'secondary'}>
                          {machine.available ? 'Available' : 'Unavailable'}
                        </Badge>
                        <Badge variant="outline">{machine.condition}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{machine.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Provider: {machine.provider}</span>
                        <span>{machine.location}</span>
                        {machine.brand && <span>{machine.brand} {machine.model}</span>}
                        {machine.daily_rate && <span>GHS {machine.daily_rate}/day</span>}
                        {machine.weekly_rate && <span>GHS {machine.weekly_rate}/week</span>}
                        {machine.monthly_rate && <span>GHS {machine.monthly_rate}/month</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteMachinery(machine.id)}
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

export default AdminMachinery;