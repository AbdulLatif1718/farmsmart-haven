-- Create farm applications table for review process
CREATE TABLE public.farm_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_id UUID NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  size_acres NUMERIC NOT NULL,
  size_unit TEXT NOT NULL DEFAULT 'acres',
  farm_type TEXT NOT NULL,
  description TEXT,
  soil_type TEXT,
  irrigation_type TEXT,
  coordinates_lat TEXT,
  coordinates_lng TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID
);

-- Enable Row Level Security
ALTER TABLE public.farm_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for farm applications
CREATE POLICY "Users can create their own applications" 
ON public.farm_applications 
FOR INSERT 
WITH CHECK (applicant_id IN (
  SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Users can view their own applications" 
ON public.farm_applications 
FOR SELECT 
USING (applicant_id IN (
  SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Admins can view all applications" 
ON public.farm_applications 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can update applications" 
ON public.farm_applications 
FOR UPDATE 
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_farm_applications_updated_at
BEFORE UPDATE ON public.farm_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();