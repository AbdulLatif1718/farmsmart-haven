import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Upload, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const FarmAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    sizeUnit: 'acres',
    farmType: '',
    description: '',
    soilType: '',
    waterSource: '',
    coordinates: { lat: '', lng: '' },
    contactPhone: '',
    contactEmail: profile?.email || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) {
      toast({
        title: "Error",
        description: "Please log in to add a farm.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const applicationData = {
        applicant_id: profile.id,
        name: formData.name,
        location: formData.location,
        size_acres: parseFloat(formData.size) || 0,
        size_unit: formData.sizeUnit,
        farm_type: formData.farmType,
        description: formData.description,
        soil_type: formData.soilType,
        irrigation_type: formData.waterSource,
        coordinates_lat: formData.coordinates.lat,
        coordinates_lng: formData.coordinates.lng,
        contact_phone: formData.contactPhone,
        contact_email: formData.contactEmail,
        status: 'pending'
      };

      const { error } = await supabase
        .from('farm_applications')
        .insert(applicationData);

      if (error) throw error;

      toast({
        title: "Farm Application Submitted!",
        description: `Your application for ${formData.name} has been submitted for review. You'll be contacted once it's reviewed.`,
      });
      navigate('/farm');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/farm')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Farms
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Apply to Start a Farm</h1>
          <p className="text-muted-foreground">
            Submit your farm application for review. Our team will contact you to discuss next steps.
          </p>
        </div>

        {/* Farm Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Farm Application</CardTitle>
            <CardDescription>
              Provide details about your proposed farm. We'll review your application and contact you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Farm Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Sunrise Valley Farm"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmType">Farm Type *</Label>
                  <Select value={formData.farmType} onValueChange={(value) => handleInputChange('farmType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crop">Crop Production</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="mixed">Mixed Farming</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="aquaculture">Aquaculture</SelectItem>
                      <SelectItem value="organic">Organic Farming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Kumasi, Ashanti Region"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Farm Size */}
              <div className="space-y-2">
                <Label>Farm Size *</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Size"
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Select value={formData.sizeUnit} onValueChange={(value) => handleInputChange('sizeUnit', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="plots">Plots</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    placeholder="e.g., 6.6745"
                    value={formData.coordinates.lat}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lat: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    placeholder="e.g., -1.5716"
                    value={formData.coordinates.lng}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      coordinates: { ...prev.coordinates, lng: e.target.value }
                    }))}
                  />
                </div>
              </div>

              {/* Soil and Water */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="rocky">Rocky</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterSource">Primary Water Source</Label>
                  <Select value={formData.waterSource} onValueChange={(value) => handleInputChange('waterSource', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rainfall">Rainfall</SelectItem>
                      <SelectItem value="irrigation">Irrigation System</SelectItem>
                      <SelectItem value="borehole">Borehole</SelectItem>
                      <SelectItem value="river">River/Stream</SelectItem>
                      <SelectItem value="well">Well</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your farm, current crops, goals, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    placeholder="e.g., +233 24 123 4567"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex items-center gap-2" disabled={loading}>
                  <Plus className="h-4 w-4" />
                  {loading ? 'Submitting Application...' : 'Submit Application'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/farm')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FarmAdd;