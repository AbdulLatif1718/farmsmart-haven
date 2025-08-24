-- Create admin user with hardcoded credentials
-- Email: admin@agriverse.africa
-- Password: AgriVerse2024!

-- First, insert the admin user into auth.users if it doesn't exist
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) 
SELECT 
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@agriverse.africa',
  crypt('AgriVerse2024!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"AgriVerse Admin","role":"admin"}'::jsonb,
  false,
  'authenticated',
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@agriverse.africa'
);

-- Create or update the admin profile
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
)
ON CONFLICT (user_id) 
DO UPDATE SET 
  role = 'admin',
  full_name = 'AgriVerse Admin',
  updated_at = now();