-- Create admin user using auth.admin_* functions (safe approach)
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- First, try to find if admin user already exists
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@agriverse.africa';
  
  -- If user doesn't exist, we need to manually insert
  IF admin_user_id IS NULL THEN
    admin_user_id := gen_random_uuid();
    
    -- Insert into auth.users with required fields
    INSERT INTO auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      confirmation_token,
      email_change_token_current,
      email_change_token_new,
      recovery_token
    ) VALUES (
      admin_user_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'admin@agriverse.africa',
      crypt('AgriVerse2024!', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin User","role":"admin"}',
      false,
      '',
      '',
      '',
      ''
    );
  END IF;
  
  -- Ensure profile exists for admin user
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (admin_user_id, 'admin@agriverse.africa', 'Admin User', 'admin')
  ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
  
END $$;