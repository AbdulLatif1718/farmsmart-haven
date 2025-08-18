-- Create content management tables for admin dashboard

-- Create transport/logistics table
CREATE TABLE public.transport_logistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  contact_info TEXT,
  service_type TEXT NOT NULL, -- 'transport', 'logistics', 'storage'
  location TEXT NOT NULL,
  price_range TEXT,
  availability_status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create machinery rentals table
CREATE TABLE public.machinery_rentals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  machine_type TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  contact_info TEXT,
  location TEXT NOT NULL,
  hourly_rate NUMERIC,
  daily_rate NUMERIC,
  availability_status TEXT NOT NULL DEFAULT 'available',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market listings table
CREATE TABLE public.market_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  product_type TEXT NOT NULL,
  seller_name TEXT NOT NULL,
  contact_info TEXT,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  unit TEXT NOT NULL, -- 'kg', 'ton', 'bag', etc.
  quantity_available NUMERIC,
  harvest_date DATE,
  quality_grade TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create knowledge hub articles table
CREATE TABLE public.knowledge_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL, -- 'crop-management', 'pest-control', 'irrigation', 'harvesting', etc.
  author_name TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  reading_time_minutes INTEGER,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transport_logistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machinery_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for transport_logistics
CREATE POLICY "Everyone can view transport/logistics" 
ON public.transport_logistics 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage transport/logistics" 
ON public.transport_logistics 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create policies for machinery_rentals
CREATE POLICY "Everyone can view machinery rentals" 
ON public.machinery_rentals 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage machinery rentals" 
ON public.machinery_rentals 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create policies for market_listings
CREATE POLICY "Everyone can view market listings" 
ON public.market_listings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage market listings" 
ON public.market_listings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create policies for knowledge_articles
CREATE POLICY "Everyone can view published articles" 
ON public.knowledge_articles 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can manage all articles" 
ON public.knowledge_articles 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create triggers for updated_at columns
CREATE TRIGGER update_transport_logistics_updated_at
  BEFORE UPDATE ON public.transport_logistics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_machinery_rentals_updated_at
  BEFORE UPDATE ON public.machinery_rentals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_market_listings_updated_at
  BEFORE UPDATE ON public.market_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_articles_updated_at
  BEFORE UPDATE ON public.knowledge_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();