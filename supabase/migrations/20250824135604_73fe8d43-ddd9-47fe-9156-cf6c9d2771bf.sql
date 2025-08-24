-- Simple approach: Create admin user if it doesn't exist
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Check if admin user exists
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@agriverse.africa';
    
    IF admin_user_id IS NULL THEN
        -- Generate a new UUID for the admin user
        admin_user_id := gen_random_uuid();
        
        -- Create the admin user in auth.users
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
        ) VALUES (
            admin_user_id,
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
        ) VALUES (
            admin_user_id,
            'admin@agriverse.africa',
            'AgriVerse Admin',
            'admin',
            now(),
            now()
        );
        
        RAISE NOTICE 'Admin user created successfully';
    ELSE
        -- Update existing user's password and profile
        UPDATE auth.users 
        SET 
            encrypted_password = crypt('AgriVerse2024!', gen_salt('bf')),
            updated_at = now(),
            email_confirmed_at = now()
        WHERE id = admin_user_id;
        
        -- Ensure profile exists with admin role
        INSERT INTO public.profiles (user_id, email, full_name, role, created_at, updated_at)
        VALUES (admin_user_id, 'admin@agriverse.africa', 'AgriVerse Admin', 'admin', now(), now())
        ON CONFLICT (user_id) DO UPDATE SET
            role = 'admin',
            full_name = 'AgriVerse Admin',
            updated_at = now();
            
        RAISE NOTICE 'Admin user updated successfully';
    END IF;
END $$;