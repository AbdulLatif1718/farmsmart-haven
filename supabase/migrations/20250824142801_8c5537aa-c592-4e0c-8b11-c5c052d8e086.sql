-- Priority 1: Fix Critical Data Exposure
-- Update profiles RLS policy to restrict access to own profile + admin access
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure function to check if user is admin (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = is_admin.user_id AND profiles.role = 'admin'
  );
$$;

-- Create restricted profile access policy
CREATE POLICY "Users can view own profile and admins can view all" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = user_id OR public.is_admin()
);

-- Priority 3: Enhance Role Security  
-- Prevent users from updating their own role
CREATE POLICY "Users cannot update their own role" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id AND 
  (OLD.role = NEW.role OR public.is_admin())
);

-- Create secure admin function for role management
CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id uuid, new_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only admins can update roles
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only administrators can update user roles';
  END IF;
  
  -- Validate role
  IF new_role NOT IN ('farmer', 'investor', 'admin') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;
  
  UPDATE public.profiles 
  SET role = new_role, updated_at = now()
  WHERE user_id = target_user_id;
  
  -- Log the role change (Priority 5: Audit logging)
  INSERT INTO public.audit_logs (admin_id, action, target_user_id, details)
  VALUES (auth.uid(), 'role_update', target_user_id, 
    jsonb_build_object('new_role', new_role));
END;
$$;

-- Priority 5: Add audit logging for sensitive operations
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES auth.users(id),
  action text NOT NULL,
  target_user_id uuid REFERENCES auth.users(id),
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (public.is_admin());

-- Create trigger to log profile changes
CREATE OR REPLACE FUNCTION public.log_profile_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Log significant changes
  IF OLD.role != NEW.role THEN
    INSERT INTO public.audit_logs (admin_id, action, target_user_id, details)
    VALUES (auth.uid(), 'profile_role_change', NEW.user_id,
      jsonb_build_object('old_role', OLD.role, 'new_role', NEW.role));
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER profile_audit_trigger
AFTER UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.log_profile_changes();