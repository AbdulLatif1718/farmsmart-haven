-- Security fix: Restrict contact information access to authenticated users only
-- This prevents public access to sensitive contact information in market_listings, machinery_rentals, and transport_logistics tables

-- Update market_listings RLS policy
DROP POLICY IF EXISTS "Everyone can view market listings" ON public.market_listings;

CREATE POLICY "Authenticated users can view market listings" 
ON public.market_listings 
FOR SELECT 
TO authenticated
USING (true);

-- Update machinery_rentals RLS policy  
DROP POLICY IF EXISTS "Everyone can view machinery rentals" ON public.machinery_rentals;

CREATE POLICY "Authenticated users can view machinery rentals" 
ON public.machinery_rentals 
FOR SELECT 
TO authenticated
USING (true);

-- Update transport_logistics RLS policy
DROP POLICY IF EXISTS "Everyone can view transport/logistics" ON public.transport_logistics;

CREATE POLICY "Authenticated users can view transport/logistics" 
ON public.transport_logistics 
FOR SELECT 
TO authenticated
USING (true);

-- Add audit log entry for this security improvement
INSERT INTO public.audit_logs (admin_id, action, details)
SELECT 
  p.id,
  'SECURITY_UPDATE',
  jsonb_build_object(
    'type', 'RLS_POLICY_UPDATE',
    'tables_affected', ARRAY['market_listings', 'machinery_rentals', 'transport_logistics'],
    'change_description', 'Restricted contact information access to authenticated users only',
    'security_impact', 'Prevents public harvesting of contact information'
  )
FROM public.profiles p 
WHERE p.role = 'admin' 
LIMIT 1;