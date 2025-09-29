import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

interface LandMonetizationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const landSchema = z.object({
  landSize: z.string().min(1, 'Land size is required'),
  location: z.string().min(1, 'Location is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  ownerName: z.string().min(1, 'Owner name is required'),
  ownerContact: z.string().min(10, 'Valid contact is required'),
});

export const LandMonetizationForm = ({ isOpen, onClose }: LandMonetizationFormProps) => {
  const [formData, setFormData] = useState({
    landSize: '',
    sizeUnit: 'acres',
    location: '',
    monetizationType: 'lease',
    price: '',
    duration: '',
    description: '',
    hasWaterSource: false,
    hasRoad: false,
    hasPowerSupply: false,
    soilType: '',
    previousCrops: '',
    ownerName: '',
    ownerContact: '',
    landDocuments: null,
    images: []
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit your land application.",
          variant: "destructive",
        });
        return;
      }

      // Validate form data
      landSchema.parse(formData);

      // Submit to database
      const { error } = await supabase
        .from('land_applications')
        .insert({
          user_id: user.id,
          land_size: parseFloat(formData.landSize),
          size_unit: formData.sizeUnit,
          location: formData.location,
          monetization_type: formData.monetizationType,
          price: parseFloat(formData.price),
          duration: formData.duration || null,
          description: formData.description,
          has_water_source: formData.hasWaterSource,
          has_road_access: formData.hasRoad,
          has_power_supply: formData.hasPowerSupply,
          soil_type: formData.soilType || null,
          previous_crops: formData.previousCrops ? [formData.previousCrops] : [],
          owner_name: formData.ownerName,
          owner_contact: formData.ownerContact,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your land application has been submitted for review.",
      });

      // Reset form and close
      setFormData({
        landSize: '',
        sizeUnit: 'acres',
        location: '',
        monetizationType: 'lease',
        price: '',
        duration: '',
        description: '',
        hasWaterSource: false,
        hasRoad: false,
        hasPowerSupply: false,
        soilType: '',
        previousCrops: '',
        ownerName: '',
        ownerContact: '',
        landDocuments: null,
        images: []
      });
      onClose();
    } catch (error: any) {
      console.error('Error submitting land application:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-green-600">Monetize Your Farmland 🌾</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <div className="space-y-6">
            {/* Land Size */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="landSize">Land Size *</Label>
                <Input
                  id="landSize"
                  placeholder="Enter size"
                  value={formData.landSize}
                  onChange={(e) => handleInputChange('landSize', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizeUnit">Unit</Label>
                <Select value={formData.sizeUnit} onValueChange={(value) => handleInputChange('sizeUnit', value)}>
                  <SelectTrigger id="sizeUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                    <SelectItem value="plots">Plots</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="Enter location (e.g., Town, Region)"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            {/* Monetization Type */}
            <div className="space-y-2">
              <Label htmlFor="monetizationType">How do you want to monetize? *</Label>
              <Select 
                value={formData.monetizationType} 
                onValueChange={(value) => handleInputChange('monetizationType', value)}
              >
                <SelectTrigger id="monetizationType">
                  <SelectValue placeholder="Select monetization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lease">Lease the Land</SelectItem>
                  <SelectItem value="partnership">Farm Partnership</SelectItem>
                  <SelectItem value="sell">Sell the Land</SelectItem>
                  <SelectItem value="sharecropping">Sharecropping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (GH₵) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
              <span className="text-xs text-muted-foreground">
                {formData.monetizationType === 'lease' ? 'Per year' : 
                 formData.monetizationType === 'partnership' ? 'Expected investment' : 
                 'Selling price'}
              </span>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <Label>Land Features</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasWaterSource" className="cursor-pointer">Water Source Available</Label>
                  <Switch
                    id="hasWaterSource"
                    checked={formData.hasWaterSource}
                    onCheckedChange={(checked) => handleInputChange('hasWaterSource', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasRoad" className="cursor-pointer">Road Access</Label>
                  <Switch
                    id="hasRoad"
                    checked={formData.hasRoad}
                    onCheckedChange={(checked) => handleInputChange('hasRoad', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hasPowerSupply" className="cursor-pointer">Power Supply</Label>
                  <Switch
                    id="hasPowerSupply"
                    checked={formData.hasPowerSupply}
                    onCheckedChange={(checked) => handleInputChange('hasPowerSupply', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                <SelectTrigger id="soilType">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loam">Loam Soil</SelectItem>
                  <SelectItem value="clay">Clay Soil</SelectItem>
                  <SelectItem value="sandy">Sandy Soil</SelectItem>
                  <SelectItem value="silt">Silt Soil</SelectItem>
                  <SelectItem value="mixed">Mixed Soil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Previous Crops */}
            <div className="space-y-2">
              <Label htmlFor="previousCrops">Previous Crops (if any)</Label>
              <Input
                id="previousCrops"
                placeholder="Enter previous crops grown on this land"
                value={formData.previousCrops}
                onChange={(e) => handleInputChange('previousCrops', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                placeholder="Provide any additional information about your land..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>

            {/* Owner Information */}
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name *</Label>
              <Input
                id="ownerName"
                placeholder="Enter your full name"
                value={formData.ownerName}
                onChange={(e) => handleInputChange('ownerName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerContact">Contact Number *</Label>
              <Input
                id="ownerContact"
                placeholder="Enter contact number"
                value={formData.ownerContact}
                onChange={(e) => handleInputChange('ownerContact', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit for Review'}
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
