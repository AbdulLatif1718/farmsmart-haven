-- Create farms table for farmers to manage their farm data
CREATE TABLE public.farms (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id uuid NOT NULL,
  name text NOT NULL,
  location text NOT NULL,
  size_acres numeric NOT NULL,
  crop_types text[] DEFAULT '{}',
  soil_type text,
  irrigation_type text,
  established_date date,
  description text,
  farm_image_url text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT farms_farmer_id_fkey FOREIGN KEY (farmer_id) REFERENCES profiles(id)
);

-- Enable RLS
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- Create policies for farms
CREATE POLICY "Farmers can view their own farms" 
ON public.farms 
FOR SELECT 
USING (farmer_id IN (
  SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Farmers can create their own farms" 
ON public.farms 
FOR INSERT 
WITH CHECK (farmer_id IN (
  SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Farmers can update their own farms" 
ON public.farms 
FOR UPDATE 
USING (farmer_id IN (
  SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Farmers can delete their own farms" 
ON public.farms 
FOR DELETE 
USING (farmer_id IN (
  SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all farms" 
ON public.farms 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_farms_updated_at
BEFORE UPDATE ON public.farms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();