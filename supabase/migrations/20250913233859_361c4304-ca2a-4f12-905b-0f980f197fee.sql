-- Fix function search path security issues
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, allow all authenticated users to be admin
  -- In production, you should implement proper admin role checking
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add RLS policy for admin_users table
CREATE POLICY "Only authenticated users can access admin table" ON public.admin_users 
  FOR ALL USING (auth.uid() IS NOT NULL);