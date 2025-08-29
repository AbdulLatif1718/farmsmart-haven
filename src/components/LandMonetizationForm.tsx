import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';

interface LandMonetizationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    landDocuments: null,
    images: []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
    onClose();
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

            {/* Documents Upload */}
            <div className="space-y-2">
              <Label htmlFor="landDocuments">Land Documents</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                <Input
                  id="landDocuments"
                  type="file"
                  onChange={(e) => handleInputChange('landDocuments', e.target.files?.[0])}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <label
                  htmlFor="landDocuments"
                  className="flex flex-col items-center justify-center cursor-pointer text-sm text-muted-foreground"
                >
                  <span>Click to upload land documents</span>
                  <span className="text-xs">(PDF, DOC, DOCX)</span>
                </label>
              </div>
            </div>

            {/* Images Upload */}
            <div className="space-y-2">
              <Label htmlFor="images">Land Images</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                <Input
                  id="images"
                  type="file"
                  multiple
                  onChange={(e) => handleInputChange('images', Array.from(e.target.files || []))}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center cursor-pointer text-sm text-muted-foreground"
                >
                  <span>Click to upload land images</span>
                  <span className="text-xs">(JPG, PNG)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Submit
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
