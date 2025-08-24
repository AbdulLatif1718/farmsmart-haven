-- Fix the admin user creation by properly handling all auth fields
-- First, remove the problematic admin user if it exists
DELETE FROM auth.users WHERE email = 'admin@agriverse.africa';
DELETE FROM public.profiles WHERE email = 'admin@agriverse.africa';

-- Create admin user with proper auth fields
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
  aud,
  confirmation_sent_at,
  recovery_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
) 
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@agriverse.africa',
  crypt('AgriVerse2024!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '', -- empty string instead of NULL for confirmation_token
  '', -- empty string instead of NULL for recovery_token
  '', -- empty string instead of NULL for email_change_token_new
  '', -- empty string instead of NULL for email_change
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"AgriVerse Admin","role":"admin"}'::jsonb,
  false,
  'authenticated',
  'authenticated',
  now(),
  null,
  '',
  0,
  null,
  '',
  null
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