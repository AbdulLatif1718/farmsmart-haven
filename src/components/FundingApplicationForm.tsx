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
    funding_amount: '',
    timeline: '',
    expected_roi: '',
    collateral: '',
    business_plan: ''
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
          funding_amount: parseFloat(formData.funding_amount),
          purpose: formData.purpose,
          timeline: formData.timeline,
          expected_roi: formData.expected_roi ? parseFloat(formData.expected_roi) : null,
          collateral: formData.collateral || null,
          business_plan: formData.business_plan || null
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
        funding_amount: '',
        timeline: '',
        expected_roi: '',
        collateral: '',
        business_plan: ''
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
              <Label htmlFor="funding_amount">Funding Amount Requested ($) *</Label>
              <Input
                id="funding_amount"
                name="funding_amount"
                type="number"
                value={formData.funding_amount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline *</Label>
              <Input
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                placeholder="e.g., 6 months, 1 year"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expected_roi">Expected ROI (%)</Label>
              <Input
                id="expected_roi"
                name="expected_roi"
                type="number"
                value={formData.expected_roi}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collateral">Collateral (optional)</Label>
              <Textarea
                id="collateral"
                name="collateral"
                value={formData.collateral}
                onChange={handleInputChange}
                placeholder="Describe any collateral you can offer..."
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_plan">Business Plan (optional)</Label>
            <Textarea
              id="business_plan"
              name="business_plan"
              value={formData.business_plan}
              onChange={handleInputChange}
              placeholder="Attach or describe your business plan..."
              rows={3}
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