-- Create admin user profile
-- Note: You'll need to sign up with this email through the auth page first, then run this to upgrade to admin

-- Function to create admin user (run this after signing up with admin@farmconnect.com)
CREATE OR REPLACE FUNCTION create_admin_user(_email text, _full_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_record auth.users%ROWTYPE;
BEGIN
  -- Update existing profile to admin role
  UPDATE profiles 
  SET role = 'admin', full_name = _full_name
  WHERE email = _email;
  
  -- If no profile exists, insert one (this should be handled by trigger)
  IF NOT FOUND THEN
    -- Find the auth user by email
    SELECT * INTO user_record FROM auth.users WHERE email = _email LIMIT 1;
    
    IF FOUND THEN
      INSERT INTO profiles (user_id, email, full_name, role)
      VALUES (user_record.id, _email, _full_name, 'admin');
    END IF;
  END IF;
END;
$$;