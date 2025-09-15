import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface FundingApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FundingApplicationForm = ({ isOpen, onClose }: FundingApplicationFormProps) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    project_title: '',
    project_description: '',
    purpose: '',
    funding_amount_requested: '',
    project_duration_months: '',
    expected_roi_percentage: '',
    farm_location: '',
    farm_size_acres: '',
    farming_experience_years: '',
    crop_type: '',
    business_plan_url: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      toast({
        title: "Error",
        description: "You must be logged in to apply for funding.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('funding_applications')
        .insert({
          user_id: profile.id,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          project_title: formData.project_title,
          project_description: formData.project_description,
          funding_amount: parseFloat(formData.funding_amount_requested),
          purpose: formData.purpose,
          timeline: formData.project_duration_months + ' months',
          expected_roi: formData.expected_roi_percentage ? parseFloat(formData.expected_roi_percentage) : null,
          farm_location: formData.farm_location,
          farm_size_acres: formData.farm_size_acres ? parseFloat(formData.farm_size_acres) : null,
          farming_experience_years: formData.farming_experience_years ? parseInt(formData.farming_experience_years) : null,
          crop_type: formData.crop_type,
          business_plan_url: formData.business_plan_url || null
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Your funding application has been submitted successfully. We'll review it and get back to you soon.",
      });

      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        project_title: '',
        project_description: '',
        purpose: '',
        funding_amount_requested: '',
        project_duration_months: '',
        expected_roi_percentage: '',
        farm_location: '',
        farm_size_acres: '',
        farming_experience_years: '',
        crop_type: '',
        business_plan_url: ''
      });
      onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Funding</DialogTitle>
          <DialogDescription>
            Fill out this form to apply for farming project funding. Our team will review your application and contact you within 5-7 business days.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_title">Project Title *</Label>
              <Input
                id="project_title"
                name="project_title"
                value={formData.project_title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop_type">Crop Type *</Label>
              <Input
                id="crop_type"
                name="crop_type"
                value={formData.crop_type}
                onChange={handleInputChange}
                placeholder="e.g., Maize, Rice, Vegetables"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_description">Project Description *</Label>
            <Textarea
              id="project_description"
              name="project_description"
              value={formData.project_description}
              onChange={handleInputChange}
              placeholder="Describe your farming project in detail..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Funding *</Label>
            <Textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              placeholder="What will you use the funding for?"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funding_amount_requested">Funding Amount Requested ($) *</Label>
              <Input
                id="funding_amount_requested"
                name="funding_amount_requested"
                type="number"
                value={formData.funding_amount_requested}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_duration_months">Project Duration (months) *</Label>
              <Input
                id="project_duration_months"
                name="project_duration_months"
                type="number"
                value={formData.project_duration_months}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expected_roi_percentage">Expected ROI (%)</Label>
              <Input
                id="expected_roi_percentage"
                name="expected_roi_percentage"
                type="number"
                value={formData.expected_roi_percentage}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm_location">Farm Location *</Label>
              <Input
                id="farm_location"
                name="farm_location"
                value={formData.farm_location}
                onChange={handleInputChange}
                placeholder="City, Region, Country"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farm_size_acres">Farm Size (acres)</Label>
              <Input
                id="farm_size_acres"
                name="farm_size_acres"
                type="number"
                value={formData.farm_size_acres}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farming_experience_years">Farming Experience (years)</Label>
              <Input
                id="farming_experience_years"
                name="farming_experience_years"
                type="number"
                value={formData.farming_experience_years}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_plan_url">Business Plan URL (optional)</Label>
            <Input
              id="business_plan_url"
              name="business_plan_url"
              type="url"
              value={formData.business_plan_url}
              onChange={handleInputChange}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};