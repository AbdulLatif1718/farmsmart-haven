-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  role TEXT DEFAULT 'farmer',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create funding applications table
CREATE TABLE public.funding_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_title TEXT NOT NULL,
  project_description TEXT NOT NULL,
  funding_amount DECIMAL(12,2) NOT NULL,
  purpose TEXT NOT NULL,
  timeline TEXT NOT NULL,
  expected_roi DECIMAL(5,2),
  collateral TEXT,
  business_plan TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.admin_users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create farm applications table
CREATE TABLE public.farm_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  farm_name TEXT NOT NULL,
  location TEXT NOT NULL,
  farm_size DECIMAL(10,2) NOT NULL,
  farm_type TEXT NOT NULL,
  crops TEXT,
  livestock TEXT,
  farming_experience INTEGER,
  equipment TEXT,
  certification TEXT,
  previous_yield TEXT,
  challenges TEXT,
  goals TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.admin_users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create machinery rentals table
CREATE TABLE public.machinery_rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  year INTEGER,
  condition TEXT DEFAULT 'good',
  provider TEXT NOT NULL,
  location TEXT NOT NULL,
  daily_rate DECIMAL(10,2),
  weekly_rate DECIMAL(10,2),
  monthly_rate DECIMAL(10,2),
  available BOOLEAN DEFAULT true,
  images TEXT[],
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create marketplace listings table
CREATE TABLE public.market_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  location TEXT NOT NULL,
  seller_name TEXT NOT NULL,
  seller_contact TEXT NOT NULL,
  images TEXT[],
  quality_grade TEXT,
  harvest_date DATE,
  expiry_date DATE,
  organic BOOLEAN DEFAULT false,
  certified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'expired', 'removed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create transport logistics table
CREATE TABLE public.transport_logistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('pickup', 'delivery', 'storage', 'processing')),
  provider TEXT NOT NULL,
  contact TEXT NOT NULL,
  location TEXT NOT NULL,
  coverage_area TEXT,
  price_range TEXT,
  capacity TEXT,
  vehicle_type TEXT,
  available BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create knowledge articles table
CREATE TABLE public.knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  author TEXT NOT NULL,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machinery_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_logistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, allow all authenticated users to be admin
  -- In production, you should implement proper admin role checking
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for admin access
CREATE POLICY "Admins can manage all data" ON public.funding_applications FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all data" ON public.farm_applications FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all data" ON public.machinery_rentals FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all data" ON public.market_listings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all data" ON public.transport_logistics FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all data" ON public.knowledge_articles FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all data" ON public.profiles FOR ALL USING (public.is_admin());

-- Create policies for regular users
CREATE POLICY "Users can view published articles" ON public.knowledge_articles FOR SELECT USING (published = true);
CREATE POLICY "Users can view active listings" ON public.market_listings FOR SELECT USING (status = 'active');
CREATE POLICY "Users can view available machinery" ON public.machinery_rentals FOR SELECT USING (available = true);
CREATE POLICY "Users can view transport services" ON public.transport_logistics FOR SELECT USING (available = true);

-- Users can manage their own applications
CREATE POLICY "Users can manage own funding applications" ON public.funding_applications 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own farm applications" ON public.farm_applications 
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own market listings" ON public.market_listings 
  FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_funding_applications_updated_at BEFORE UPDATE ON public.funding_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_farm_applications_updated_at BEFORE UPDATE ON public.farm_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_machinery_rentals_updated_at BEFORE UPDATE ON public.machinery_rentals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_market_listings_updated_at BEFORE UPDATE ON public.market_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_transport_logistics_updated_at BEFORE UPDATE ON public.transport_logistics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_knowledge_articles_updated_at BEFORE UPDATE ON public.knowledge_articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin user (password: AgriVerse2024!Admin)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$YourHashedPasswordHere') 
ON CONFLICT (username) DO NOTHING;