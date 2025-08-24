-- Clean up any existing admin records first
DELETE FROM public.profiles WHERE user_id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid;
DELETE FROM auth.users WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid;

-- Also clean up by email in case there are other records
DELETE FROM public.profiles WHERE email = 'admin@agriverse.africa';
DELETE FROM auth.users WHERE email = 'admin@agriverse.africa';

-- Now create the admin user with all required fields properly set
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) 
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@agriverse.africa',
  crypt('AgriVerse2024!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  '',
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"AgriVerse Admin","role":"admin"}'::jsonb,
  false,
  'authenticated',
  'authenticated'
);

-- Create the admin profile
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) 
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid,
  'admin@agriverse.africa',
  'AgriVerse Admin',
  'admin',
  now(),
  now()
);