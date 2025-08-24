-- Create admin user with a different UUID to avoid conflicts
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
  gen_random_uuid(),
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
) 
ON CONFLICT (email) DO UPDATE SET
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  updated_at = EXCLUDED.updated_at,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- The profile will be created automatically by the handle_new_user trigger
-- or we can ensure it exists with an upsert
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) 
SELECT 
  u.id,
  u.email,
  'AgriVerse Admin',
  'admin',
  now(),
  now()
FROM auth.users u 
WHERE u.email = 'admin@agriverse.africa'
ON CONFLICT (user_id) DO UPDATE SET
  role = EXCLUDED.role,
  full_name = EXCLUDED.full_name,
  updated_at = EXCLUDED.updated_at;