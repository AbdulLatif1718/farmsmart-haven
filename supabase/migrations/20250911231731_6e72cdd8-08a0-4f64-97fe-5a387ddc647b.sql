-- Drop all existing tables and related objects
DROP TABLE IF EXISTS public.investment_opportunities CASCADE;
DROP TABLE IF EXISTS public.investments CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.funding_applications CASCADE;
DROP TABLE IF EXISTS public.farms CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.machinery_rentals CASCADE;
DROP TABLE IF EXISTS public.market_listings CASCADE;
DROP TABLE IF EXISTS public.knowledge_articles CASCADE;
DROP TABLE IF EXISTS public.transport_logistics CASCADE;
DROP TABLE IF EXISTS public.farm_applications CASCADE;

-- Drop all functions
DROP FUNCTION IF EXISTS public.create_admin_user(text, text) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Drop all triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;