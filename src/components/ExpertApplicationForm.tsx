import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

interface ExpertApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const expertSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  title: z.string().min(1, 'Professional title is required'),
  experienceYears: z.string().min(1, 'Experience is required'),
  location: z.string().min(1, 'Location is required'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
});

export const ExpertApplicationForm = ({ isOpen, onClose }: ExpertApplicationFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: 'crop-production',
    title: '',
    experienceYears: '',
    certifications: '',
    education: '',
    languages: 'English',
    servicesOffered: '',
    hourlyRate: '',
    location: '',
    bio: '',
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
          description: "Please log in to submit your expert application.",
          variant: "destructive",
        });
        return;
      }

      // Validate form data
      expertSchema.parse(formData);

      // Submit to database
      const { error } = await supabase
        .from('expert_applications')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialization: formData.specialization,
          title: formData.title,
          experience_years: parseInt(formData.experienceYears),
          certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()) : [],
          education: formData.education || null,
          languages: formData.languages.split(',').map(l => l.trim()),
          services_offered: formData.servicesOffered ? formData.servicesOffered.split(',').map(s => s.trim()) : [],
          hourly_rate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
          location: formData.location,
          bio: formData.bio,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your expert application has been submitted for review.",
      });

      // Reset form and close
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        specialization: 'crop-production',
        title: '',
        experienceYears: '',
        certifications: '',
        education: '',
        languages: 'English',
        servicesOffered: '',
        hourlyRate: '',
        location: '',
        bio: '',
      });
      onClose();
    } catch (error: any) {
      console.error('Error submitting expert application:', error);
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
          <h2 className="text-2xl font-bold text-primary">Become an Agricultural Expert 🌾</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+233 XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="City, Region"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Professional Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Agricultural Consultant, Agronomist"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Select 
                    value={formData.specialization} 
                    onValueChange={(value) => handleInputChange('specialization', value)}
                  >
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crop-production">Crop Production</SelectItem>
                      <SelectItem value="livestock">Livestock & Animal Husbandry</SelectItem>
                      <SelectItem value="irrigation">Irrigation & Water Management</SelectItem>
                      <SelectItem value="soil-science">Soil Science</SelectItem>
                      <SelectItem value="pest-management">Pest Management</SelectItem>
                      <SelectItem value="farm-management">Farm Management</SelectItem>
                      <SelectItem value="agricultural-engineering">Agricultural Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceYears">Years of Experience *</Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    placeholder="10"
                    value={formData.experienceYears}
                    onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications (comma-separated)</Label>
                <Input
                  id="certifications"
                  placeholder="e.g., PhD in Agronomy, Certified Crop Advisor"
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Background</Label>
                <Textarea
                  id="education"
                  placeholder="List your educational qualifications..."
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servicesOffered">Services Offered (comma-separated)</Label>
                <Input
                  id="servicesOffered"
                  placeholder="e.g., Farm Planning, Soil Testing, Crop Selection"
                  value={formData.servicesOffered}
                  onChange={(e) => handleInputChange('servicesOffered', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (GH₵)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="200"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    placeholder="English, Twi, Ga"
                    value={formData.languages}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your experience, expertise, and what you can offer to farmers..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={5}
                  required
                />
                <span className="text-xs text-muted-foreground">Minimum 50 characters</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
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