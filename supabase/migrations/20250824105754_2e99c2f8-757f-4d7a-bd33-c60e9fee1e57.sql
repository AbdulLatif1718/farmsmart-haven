-- Create admin user function and ensure admin profile exists
DO $$
DECLARE
    user_exists boolean;
    admin_email text := 'tva@agriverse.africa';
BEGIN
    -- Check if the admin profile already exists
    SELECT EXISTS(
        SELECT 1 FROM public.profiles 
        WHERE email = admin_email AND role = 'admin'
    ) INTO user_exists;
    
    -- If admin profile doesn't exist, create a placeholder
    IF NOT user_exists THEN
        -- Create a placeholder profile for the admin user
        -- The actual user_id will be updated when they first log in
        INSERT INTO public.profiles (
            user_id, 
            email, 
            full_name, 
            role
        ) VALUES (
            gen_random_uuid(), -- Temporary UUID, will be updated on first login
            admin_email,
            'TVA Admin',
            'admin'
        )
        ON CONFLICT (email) DO UPDATE SET
            role = 'admin',
            full_name = 'TVA Admin';
    END IF;
END $$;