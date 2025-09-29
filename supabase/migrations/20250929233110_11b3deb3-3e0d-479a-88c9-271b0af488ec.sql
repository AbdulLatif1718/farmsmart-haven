-- Create land_applications table
CREATE TABLE public.land_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  land_size NUMERIC NOT NULL,
  size_unit TEXT NOT NULL DEFAULT 'acres',
  location TEXT NOT NULL,
  monetization_type TEXT NOT NULL, -- lease, partnership, sell, sharecropping
  price NUMERIC NOT NULL,
  duration TEXT,
  description TEXT NOT NULL,
  has_water_source BOOLEAN DEFAULT false,
  has_road_access BOOLEAN DEFAULT false,
  has_power_supply BOOLEAN DEFAULT false,
  soil_type TEXT,
  previous_crops TEXT[],
  land_documents TEXT[],
  images TEXT[],
  owner_name TEXT NOT NULL,
  owner_contact TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create expert_applications table
CREATE TABLE public.expert_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialization TEXT NOT NULL,
  title TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  certifications TEXT[],
  education TEXT,
  languages TEXT[],
  services_offered TEXT[],
  hourly_rate NUMERIC,
  location TEXT NOT NULL,
  bio TEXT,
  profile_image TEXT,
  documents TEXT[],
  availability TEXT DEFAULT 'available',
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.land_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for land_applications
CREATE POLICY "Users can create own land applications"
  ON public.land_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own land applications"
  ON public.land_applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all land applications"
  ON public.land_applications
  FOR ALL
  USING (is_admin());

CREATE POLICY "Anyone can view approved land applications"
  ON public.land_applications
  FOR SELECT
  USING (status = 'approved');

-- RLS Policies for expert_applications
CREATE POLICY "Users can create own expert applications"
  ON public.expert_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own expert applications"
  ON public.expert_applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all expert applications"
  ON public.expert_applications
  FOR ALL
  USING (is_admin());

CREATE POLICY "Anyone can view approved expert applications"
  ON public.expert_applications
  FOR SELECT
  USING (status = 'approved');

-- Create updated_at triggers
CREATE TRIGGER update_land_applications_updated_at
  BEFORE UPDATE ON public.land_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_applications_updated_at
  BEFORE UPDATE ON public.expert_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_land_applications_status ON public.land_applications(status);
CREATE INDEX idx_land_applications_user_id ON public.land_applications(user_id);
CREATE INDEX idx_expert_applications_status ON public.expert_applications(status);
CREATE INDEX idx_expert_applications_user_id ON public.expert_applications(user_id);